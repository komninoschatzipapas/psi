import * as Lexer from '@pascal-psi/lexer';
import * as AST from '@pascal-psi/ast';
import PSIError from '@pascal-psi/error';

export class Parser implements AST.Runnable<AST.AST> {
  private currentToken: Lexer.Token; // Only change through this.eat
  private previousToken: Lexer.Token | null = null; // Needed for better errors
  private lexer: Lexer.Lexer;

  constructor(lexer: Lexer.Lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  get previousTokenEndLocationProvider() {
    return {
      start: {
        linePosition: this.previousToken!.end.linePosition,
        characterPosition: this.previousToken!.end.characterPosition - 1,
      },
      end: {
        linePosition: this.previousToken!.end.linePosition,
        characterPosition: this.previousToken!.end.characterPosition - 1,
      },
    };
  }

  private eat(type: any, message?: string, previousTokenThrow = false) {
    if (this.currentToken instanceof type) {
      this.previousToken = this.currentToken;
      return this.lexer.getNextToken();
    } else {
      throw new PSIError(
        previousTokenThrow
          ? this.previousTokenEndLocationProvider
          : this.currentToken,
        message ||
          `Expected type ${this.currentToken.constructor.name} to be ${type.name}`,
      );
    }
  }

  private peek() {
    return this.lexer.peekNextToken();
  }

  private repeat() {
    const repeatToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.RepeatToken);
    const statements = this.statementList(Lexer.UntilToken);
    this.currentToken = this.eat(
      Lexer.UntilToken,
      'Expected until at the end of a repeat loop',
      true,
    );
    const condition = this.expression();
    return new AST.RepeatAST(condition, statements).inheritPositionFrom(
      repeatToken,
    );
  }

  private while() {
    const whileToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.WhileToken);
    const condition = this.expression();
    this.currentToken = this.eat(
      Lexer.DoToken,
      'Expected do after while condition',
      true,
    );
    const statement = this.statement();
    return new AST.WhileAST(condition, statement).inheritPositionFrom(
      whileToken,
    );
  }

  private for() {
    const forToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.ForToken);
    const assignment = this.assignmentExpression();
    let increment: boolean;
    if (this.currentToken instanceof Lexer.ToToken) {
      increment = true;
      this.currentToken = this.eat(Lexer.ToToken);
    } else if (this.currentToken instanceof Lexer.DownToToken) {
      increment = false;
      this.currentToken = this.eat(Lexer.DownToToken);
    } else {
      throw new PSIError(
        this.previousTokenEndLocationProvider,
        'Expected to/down to after for',
      );
    }
    const finalValue = this.expression();
    this.currentToken = this.eat(
      Lexer.DoToken,
      'Expected do after for header',
      true,
    );
    const statement = this.statement();
    return new AST.ForAST(
      assignment,
      increment,
      finalValue,
      statement,
    ).inheritPositionFrom(forToken);
  }

  private if() {
    const ifToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.IfToken);
    const expr = this.expression();
    this.currentToken = this.eat(
      Lexer.ThenToken,
      'Expected then after if condition',
      true,
    );
    const statement = this.statement();
    return new AST.IfAST(expr, statement).inheritPositionFrom(ifToken);
  }

  private ifStatement() {
    const firstIf = this.if();
    let currentIf = firstIf;

    while (this.currentToken instanceof Lexer.ElseToken) {
      this.currentToken = this.eat(Lexer.ElseToken);
      if (this.currentToken instanceof Lexer.IfToken) {
        const newIf = this.if();
        currentIf.addNext(newIf);
        currentIf = newIf;
      } else {
        currentIf.addNext(this.statement());
      }
    }

    return firstIf;
  }

  private block() {
    const declarations = this.declarations();
    const compoundStatement = this.compoundStatement();
    return new AST.BlockAST(declarations, compoundStatement);
  }

  private declarations() {
    const declarations: (
      | AST.VariableDeclarationAST
      | AST.ProcedureDeclarationAST
      | AST.FunctionDeclarationAST
    )[] = [];

    while (
      this.currentToken instanceof Lexer.VariableToken ||
      this.currentToken instanceof Lexer.ProcedureToken ||
      this.currentToken instanceof Lexer.FunctionToken
    ) {
      if (this.currentToken instanceof Lexer.VariableToken) {
        this.currentToken = this.eat(Lexer.VariableToken);

        do {
          this.variableDeclaration().forEach(d => declarations.push(d));
          this.currentToken = this.eat(
            Lexer.SemiToken,
            'Expected semi color at the end of a variable declaration',
            true,
          );
        } while (this.currentToken instanceof Lexer.IdToken);
      } else if (this.currentToken instanceof Lexer.ProcedureToken) {
        declarations.push(this.procedureDeclaration());
      } else if (this.currentToken instanceof Lexer.FunctionToken) {
        declarations.push(this.functionDeclaration());
      }
    }

    return declarations;
  }

  private variableDeclaration() {
    const ids = [this.variable()];

    while (this.currentToken instanceof Lexer.CommaToken) {
      this.currentToken = this.eat(Lexer.CommaToken);
      ids.push(this.variable());
    }

    this.currentToken = this.eat(
      Lexer.ColonToken,
      'Expected colon after variable name declaration',
      true,
    );

    const type = this.type();

    return ids.map(id =>
      new AST.VariableDeclarationAST(id, type).inheritPositionFrom(id),
    );
  }

  private procedureDeclaration() {
    const procedureToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.ProcedureToken);
    const name = this.variable().name;
    let args: AST.VariableDeclarationAST[] = [];
    if (this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(
        Lexer.OpeningParenthesisToken,
        'Expected opening parenthesis after procedure name',
      );
      args = this.procedureOrFunctionParameters();
      this.currentToken = this.eat(
        Lexer.ClosingParenthesisToken,
        'Expected closing parenthesis after procedure arguments',
        true,
      );
    }
    this.currentToken = this.eat(
      Lexer.SemiToken,
      'Expected semi colon after procedure type declaration',
      true,
    );
    const block = this.block();
    this.currentToken = this.eat(
      Lexer.SemiToken,
      'Expected semi colon after procedure declaration',
      true,
    );
    return new AST.ProcedureDeclarationAST(
      name,
      args,
      block,
    ).inheritPositionFrom(procedureToken);
  }

  private functionDeclaration() {
    const functionToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.FunctionToken);
    const name = this.variable().name;
    let args: AST.VariableDeclarationAST[] = [];
    if (this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(
        Lexer.OpeningParenthesisToken,
        'Expected opening parenthesis after function name',
      );
      args = this.procedureOrFunctionParameters();
      this.currentToken = this.eat(
        Lexer.ClosingParenthesisToken,
        'Expected closing parenthesis after function arguments',
        true,
      );
    }

    this.currentToken = this.eat(
      Lexer.ColonToken,
      'Expected colon after function arguments',
      true,
    );

    const returnType = this.type();

    this.currentToken = this.eat(
      Lexer.SemiToken,
      'Expected semi colon after function type declaration',
      true,
    );
    const block = this.block();
    this.currentToken = this.eat(
      Lexer.SemiToken,
      'Expected semi colon after function declaration',
      true,
    );

    return new AST.FunctionDeclarationAST(
      name,
      args,
      returnType,
      block,
    ).inheritPositionFrom(functionToken);
  }

  private procedureOrFunctionParameters() {
    if (!(this.currentToken instanceof Lexer.IdToken)) {
      return []; // no arguments
    }

    const args = this.variableDeclaration();

    while (this.currentToken instanceof Lexer.SemiToken) {
      this.currentToken = this.eat(Lexer.SemiToken);
      this.variableDeclaration().forEach(d => args.push(d));
    }

    return args;
  }

  private array(): AST.ArrayAST {
    const arrayToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.ArrayToken);

    this.currentToken = this.eat(
      Lexer.OpeningBracketToken,
      'Expected opening bracket after array',
    );

    const indexTypes: ReturnType<Parser['indexType']>[] = [];

    try {
      indexTypes.push(this.indexType());
    } catch {
      throw new PSIError(this.previousToken!, 'Invalid array index type');
    }

    while (this.currentToken instanceof Lexer.CommaToken) {
      this.currentToken = this.eat(Lexer.CommaToken);
      try {
        indexTypes.push(this.indexType());
      } catch {
        throw new PSIError(
          this.currentToken,
          'Expected index type after comma',
        );
      }
    }

    this.currentToken = this.eat(
      Lexer.ClosingBracketToken,
      'Expected closing bracket after array index type',
      true,
    );

    this.currentToken = this.eat(
      Lexer.OfToken,
      'Expected of after array index type',
    );

    const componentType = this.type();

    const ast = new AST.ArrayAST(indexTypes, componentType)
      .inheritStartPositionFrom(arrayToken.start)
      .inheritEndPositionFrom(componentType.end);

    while (ast.componentType instanceof AST.ArrayAST) {
      ast.indexTypes.push(...ast.componentType.indexTypes);
      ast.componentType = ast.componentType.componentType;
    }

    return ast;
  }

  private indexType() {
    try {
      return this.primitiveType();
    } catch {
      try {
        return this.subrange();
      } catch {
        throw new PSIError(this.currentToken, `Unknown data type`);
      }
    }
  }

  private subrange() {
    let start;
    try {
      start = this.constant();
    } catch {
      throw new PSIError(this.currentToken, `Invalid subrange`);
    }

    this.currentToken = this.eat(Lexer.DoubleDotToken);

    let end;
    try {
      end = this.constant();
    } catch {
      throw new PSIError(
        this.currentToken,
        `Right side of subrange must be a constant value`,
      );
    }

    return new AST.SubrangeAST(start, end)
      .inheritStartPositionFrom(start.start)
      .inheritEndPositionFrom(end.end);
  }

  private primitiveType() {
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.IntegerToken) {
      this.currentToken = this.eat(Lexer.IntegerToken);
      return new AST.IntegerAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.RealToken) {
      this.currentToken = this.eat(Lexer.RealToken);
      return new AST.RealAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.BooleanToken) {
      this.currentToken = this.eat(Lexer.BooleanToken);
      return new AST.BooleanAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.CharToken) {
      this.currentToken = this.eat(Lexer.CharToken);
      return new AST.CharAST().inheritPositionFrom(savedToken);
    } else {
      throw new PSIError(this.currentToken, 'Invalid primitive type');
    }
  }

  private type() {
    try {
      return this.primitiveType();
    } catch {
      if (this.currentToken instanceof Lexer.ArrayToken) {
        return this.array();
      } else {
        try {
          return this.subrange();
        } catch {
          throw new PSIError(this.currentToken, `Unknown data type`);
        }
      }
    }
  }

  private program() {
    const programToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(
      Lexer.ProgramToken,
      'Expected program to begin with a program statement',
    );
    const programName = this.variable().name;
    this.currentToken = this.eat(
      Lexer.SemiToken,
      'Expected semi colon after program name',
      true,
    );
    const blockNode = this.block();
    this.currentToken = this.eat(
      Lexer.DotToken,
      'Expected dot at the end of a program',
      true,
    );
    return new AST.ProgramAST(programName, blockNode).inheritPositionFrom(
      programToken,
    );
  }

  private compoundStatement() {
    const beginToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.BeginToken);
    const statements = this.statementList(Lexer.EndToken);
    this.currentToken = this.eat(
      Lexer.EndToken,
      'Expected compound statement to end with end',
    );
    return new AST.CompoundAST(statements).inheritPositionFrom(beginToken);
  }

  private statementList(terminatorToken: any) {
    const statements = [this.statement()];

    while (this.currentToken instanceof Lexer.SemiToken) {
      this.currentToken = this.eat(Lexer.SemiToken);
      statements.push(this.statement());
    }

    if (
      !(this.currentToken instanceof terminatorToken) &&
      !(this.previousToken instanceof Lexer.SemiToken)
    ) {
      throw new PSIError(
        this.previousTokenEndLocationProvider,
        'Expected statement to end with a semi colon',
      );
    }

    return statements;
  }

  private statement(): AST.AST {
    if (this.currentToken instanceof Lexer.BeginToken) {
      return this.compoundStatement();
    } else if (
      this.currentToken instanceof Lexer.IdToken &&
      this.peek() instanceof Lexer.OpeningParenthesisToken
    ) {
      return this.call();
    } else if (this.currentToken instanceof Lexer.IdToken) {
      return this.assignmentExpression();
    } else if (this.currentToken instanceof Lexer.IfToken) {
      return this.ifStatement();
    } else if (this.currentToken instanceof Lexer.ForToken) {
      return this.for();
    } else if (this.currentToken instanceof Lexer.WhileToken) {
      return this.while();
    } else if (this.currentToken instanceof Lexer.RepeatToken) {
      return this.repeat();
    } else {
      return this.empty();
    }
  }

  private assignmentExpression() {
    let left: AST.VariableAST | AST.ArrayAccessAST;
    if (this.peek() instanceof Lexer.OpeningBracketToken) {
      left = this.arrayAccess();
    } else {
      left = this.variable();
    }

    const assignmentToken = Object.assign({}, this.currentToken);
    this.currentToken = this.eat(Lexer.AssignToken, 'Invalid statement', true); // Not enough information to determine whether user actually wanted an assignment statement
    return new AST.AssignmentAST(left, this.expression()).inheritPositionFrom(
      assignmentToken,
    );
  }

  private expression() {
    let node = this.term();
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.PlusToken) {
      this.currentToken = this.eat(Lexer.PlusToken);
      node = new AST.PlusAST(node, this.expression()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.MinusToken) {
      this.currentToken = this.eat(Lexer.MinusToken);
      node = new AST.MinusAST(node, this.expression()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.OrToken) {
      this.currentToken = this.eat(Lexer.OrToken);
      node = new AST.OrAST(node, this.expression()).inheritPositionFrom(
        savedToken,
      );
    }

    return node;
  }

  private variable() {
    const node = new AST.VariableAST(
      this.currentToken.value,
    ).inheritPositionFrom(this.currentToken);
    this.currentToken = this.eat(Lexer.IdToken);

    return node;
  }

  private arrayAccess() {
    const array = this.variable();

    this.currentToken = this.eat(Lexer.OpeningBracketToken);

    const accessors = [this.expression()];

    while (this.currentToken instanceof Lexer.CommaToken) {
      this.currentToken = this.eat(Lexer.CommaToken);
      accessors.push(this.expression());
    }

    this.currentToken = this.eat(
      Lexer.ClosingBracketToken,
      'Expected closing bracket after array accessor(s)',
      true,
    );

    return new AST.ArrayAccessAST(array, accessors)
      .inheritStartPositionFrom(array.start)
      .inheritEndPositionFrom(accessors[accessors.length - 1].end);
  }

  private empty() {
    return new AST.EmptyAST().inheritPositionFrom(this.currentToken);
  }

  private term() {
    let node = this.comparison();
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.MultiplicationToken) {
      this.currentToken = this.eat(Lexer.MultiplicationToken);
      node = new AST.MultiplicationAST(node, this.term()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.IntegerDivisionToken) {
      this.currentToken = this.eat(Lexer.IntegerDivisionToken);
      node = new AST.IntegerDivisionAST(node, this.term()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.RealDivisionToken) {
      this.currentToken = this.eat(Lexer.RealDivisionToken);
      node = new AST.RealDivisionAST(node, this.term()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.ModToken) {
      this.currentToken = this.eat(Lexer.ModToken);
      node = new AST.ModAST(node, this.term()).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.AndToken) {
      this.currentToken = this.eat(Lexer.AndToken);
      node = new AST.AndAST(node, this.term()).inheritPositionFrom(savedToken);
    }

    return node;
  }

  private comparison() {
    let node = this.factor();
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.EqualsToken) {
      this.currentToken = this.eat(Lexer.EqualsToken);
      node = new AST.EqualsAST(node, this.comparison()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.NotEqualsToken) {
      this.currentToken = this.eat(Lexer.NotEqualsToken);
      node = new AST.NotEqualsAST(node, this.comparison()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.GreaterThanToken) {
      this.currentToken = this.eat(Lexer.GreaterThanToken);
      node = new AST.GreaterThanAST(
        node,
        this.comparison(),
      ).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.LessThanToken) {
      this.currentToken = this.eat(Lexer.LessThanToken);
      node = new AST.LessThanAST(node, this.comparison()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.GreaterEqualsToken) {
      this.currentToken = this.eat(Lexer.GreaterEqualsToken);
      node = new AST.GreaterEqualsAST(
        node,
        this.comparison(),
      ).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.LessEqualsToken) {
      this.currentToken = this.eat(Lexer.LessEqualsToken);
      node = new AST.LessEqualsAST(node, this.comparison()).inheritPositionFrom(
        savedToken,
      );
    }

    return node;
  }

  private factor(): AST.AST {
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.PlusToken) {
      this.currentToken = this.eat(Lexer.PlusToken);
      return new AST.UnaryPlusAST(this.factor()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.MinusToken) {
      this.currentToken = this.eat(Lexer.MinusToken);
      return new AST.UnaryMinusAST(this.factor()).inheritPositionFrom(
        savedToken,
      );
    } else if (this.currentToken instanceof Lexer.IntegerConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.IntegerConstToken);
      return new AST.IntegerConstantAST(value).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.RealConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.RealConstToken);
      return new AST.RealConstantAST(value).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
      const result = this.expression();
      this.currentToken = this.eat(Lexer.ClosingParenthesisToken);
      return result;
    } else if (this.currentToken instanceof Lexer.TrueToken) {
      this.currentToken = this.eat(Lexer.TrueToken);
      return new AST.TrueConstantAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.FalseToken) {
      this.currentToken = this.eat(Lexer.FalseToken);
      return new AST.FalseConstantAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.CharConstantToken) {
      const character = this.currentToken.value;
      this.currentToken = this.eat(Lexer.CharConstantToken);
      return new AST.CharConstantAST(character).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.NotToken) {
      this.currentToken = this.eat(Lexer.NotToken);
      return new AST.NotAST(this.factor()).inheritPositionFrom(savedToken);
    } else if (
      this.currentToken instanceof Lexer.IdToken &&
      this.peek() instanceof Lexer.OpeningBracketToken
    ) {
      return this.arrayAccess();
    } else if (
      this.currentToken instanceof Lexer.IdToken &&
      this.peek() instanceof Lexer.OpeningParenthesisToken
    ) {
      return this.call();
    } else if (this.currentToken instanceof Lexer.IdToken) {
      return this.variable();
    } else {
      throw new PSIError(savedToken, 'Invalid expression factor');
    }
  }

  private constant() {
    const savedToken = Object.assign({}, this.currentToken);

    if (this.currentToken instanceof Lexer.TrueToken) {
      this.currentToken = this.eat(Lexer.TrueToken);
      return new AST.TrueConstantAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.FalseToken) {
      this.currentToken = this.eat(Lexer.FalseToken);
      return new AST.FalseConstantAST().inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.CharConstantToken) {
      const character = this.currentToken.value;
      this.currentToken = this.eat(Lexer.CharConstantToken);
      return new AST.CharConstantAST(character).inheritPositionFrom(savedToken);
    } else if (this.currentToken instanceof Lexer.IntegerConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.IntegerConstToken);
      return new AST.IntegerConstantAST(value).inheritPositionFrom(savedToken);
    } else {
      throw new PSIError(savedToken, 'Invalid constant read');
    }
  }

  private call() {
    const nameAST = this.variable();
    const name = nameAST.name;
    this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
    const args: AST.AST[] = [];
    if (!(this.currentToken instanceof Lexer.ClosingParenthesisToken)) {
      args.push(this.expression());
      while (this.currentToken instanceof Lexer.CommaToken) {
        this.currentToken = this.eat(Lexer.CommaToken);
        args.push(this.expression());
      }
    }
    this.currentToken = this.eat(
      Lexer.ClosingParenthesisToken,
      'Expected closing parenthesis after procedure/function call',
      true,
    );
    return new AST.CallAST(name, args).inheritPositionFrom(nameAST);
  }

  public run() {
    const node = this.program();
    this.currentToken = this.eat(Lexer.EofToken);
    return node;
  }
}
