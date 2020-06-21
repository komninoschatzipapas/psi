import * as Lexer from 'lexer';
import * as AST from 'ast';
import * as Types from 'data-types';

export class Parser implements AST.Runnable<AST.AST> {
  private currentToken: Lexer.Token;
  private lexer: Lexer.Lexer;

  constructor(lexer: Lexer.Lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  private eat(type: any) {
    if (this.currentToken instanceof type) {
      return this.lexer.getNextToken();
    } else {
      throw new Error(
        `Expected type ${this.currentToken.constructor.name} to be ${type}`,
      );
    }
  }

  private peek() {
    return this.lexer.peekNextToken();
  }

  private repeat() {
    this.currentToken = this.eat(Lexer.RepeatToken);
    const statements = this.statementList();
    this.currentToken = this.eat(Lexer.UntilToken);
    const condition = this.expression();
    return new AST.RepeatAST(condition, statements);
  }

  private while() {
    this.currentToken = this.eat(Lexer.WhileToken);
    const condition = this.expression();
    this.currentToken = this.eat(Lexer.DoToken);
    const statement = this.statement();
    return new AST.WhileAST(condition, statement);
  }

  private for() {
    this.currentToken = this.eat(Lexer.ForToken);
    const assignment = this.assignmentExpression();
    let increment: Types.PSIBoolean;
    if (this.currentToken instanceof Lexer.ToToken) {
      increment = new Types.PSIBoolean(true);
      this.currentToken = this.eat(Lexer.ToToken);
    } else if (this.currentToken instanceof Lexer.DownToToken) {
      increment = new Types.PSIBoolean(false);
      this.currentToken = this.eat(Lexer.DownToToken);
    } else {
      throw new Error('Expected To/DownTo token after for');
    }
    const finalValue = this.expression();
    this.currentToken = this.eat(Lexer.DoToken);
    const statement = this.statement();
    return new AST.ForAST(assignment, increment, finalValue, statement);
  }

  private if() {
    this.currentToken = this.eat(Lexer.IfToken);
    const expr = this.expression();
    this.currentToken = this.eat(Lexer.ThenToken);
    const statement = this.statement();
    return new AST.IfAST(expr, statement);
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
    )[] = [];

    while (
      this.currentToken instanceof Lexer.VariableToken ||
      this.currentToken instanceof Lexer.ProcedureToken
    ) {
      if (this.currentToken instanceof Lexer.VariableToken) {
        this.currentToken = this.eat(Lexer.VariableToken);

        do {
          this.variableDeclaration().forEach(d => declarations.push(d));
          this.currentToken = this.eat(Lexer.SemiToken);
        } while (this.currentToken instanceof Lexer.IdToken);
      } else if (this.currentToken instanceof Lexer.ProcedureToken) {
        declarations.push(this.procedureDeclaration());
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

    this.currentToken = this.eat(Lexer.ColonToken);

    const type = this.type();

    return ids.map(id => new AST.VariableDeclarationAST(id, type));
  }

  private procedureDeclaration() {
    this.currentToken = this.eat(Lexer.ProcedureToken);
    const name = this.variable().name;
    let args: AST.VariableDeclarationAST[] = [];
    if (this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
      args = this.procedureParameters();
      this.currentToken = this.eat(Lexer.ClosingParenthesisToken);
    }
    this.currentToken = this.eat(Lexer.SemiToken);
    const block = this.block();
    this.currentToken = this.eat(Lexer.SemiToken);
    return new AST.ProcedureDeclarationAST(name, args, block);
  }

  private procedureParameters() {
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

  private type() {
    if (this.currentToken instanceof Lexer.IntegerToken) {
      this.currentToken = this.eat(Lexer.IntegerToken);
      return new AST.IntegerAST();
    } else if (this.currentToken instanceof Lexer.RealToken) {
      this.currentToken = this.eat(Lexer.RealToken);
      return new AST.RealAST();
    } else if (this.currentToken instanceof Lexer.BooleanToken) {
      this.currentToken = this.eat(Lexer.BooleanToken);
      return new AST.BooleanAST();
    } else if (this.currentToken instanceof Lexer.CharToken) {
      this.currentToken = this.eat(Lexer.CharToken);
      return new AST.CharAST();
    } else {
      throw new Error(`Unknown data type ${this.currentToken}`);
    }
  }

  private program() {
    this.currentToken = this.eat(Lexer.ProgramToken);
    const programName = this.variable().name;
    this.currentToken = this.eat(Lexer.SemiToken);
    const blockNode = this.block();
    this.currentToken = this.eat(Lexer.DotToken);
    return new AST.ProgramAST(programName, blockNode);
  }

  private compoundStatement() {
    this.currentToken = this.eat(Lexer.BeginToken);
    const statements = this.statementList();
    this.currentToken = this.eat(Lexer.EndToken);
    return new AST.CompoundAST(statements);
  }

  private statementList() {
    const statements = [this.statement()];

    while (this.currentToken instanceof Lexer.SemiToken) {
      this.currentToken = this.eat(Lexer.SemiToken);
      statements.push(this.statement());
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
    const left = this.variable();
    this.currentToken = this.eat(Lexer.AssignToken);
    return new AST.AssignmentAST(left, this.expression());
  }

  private expression() {
    let node = this.term();

    if (this.currentToken instanceof Lexer.PlusToken) {
      this.currentToken = this.eat(Lexer.PlusToken);
      node = new AST.PlusAST(node, this.expression());
    } else if (this.currentToken instanceof Lexer.MinusToken) {
      this.currentToken = this.eat(Lexer.MinusToken);
      node = new AST.MinusAST(node, this.expression());
    } else if (this.currentToken instanceof Lexer.OrToken) {
      this.currentToken = this.eat(Lexer.OrToken);
      node = new AST.OrAST(node, this.expression());
    }

    return node;
  }

  private variable() {
    const node = new AST.VariableAST(this.currentToken.value);
    this.currentToken = this.eat(Lexer.IdToken);
    return node;
  }

  private empty() {
    return new AST.EmptyAST();
  }

  private term() {
    let node = this.comparison();

    if (this.currentToken instanceof Lexer.MultiplicationToken) {
      this.currentToken = this.eat(Lexer.MultiplicationToken);
      node = new AST.MultiplicationAST(node, this.term());
    } else if (this.currentToken instanceof Lexer.IntegerDivisionToken) {
      this.currentToken = this.eat(Lexer.IntegerDivisionToken);
      node = new AST.IntegerDivisionAST(node, this.term());
    } else if (this.currentToken instanceof Lexer.RealDivisionToken) {
      this.currentToken = this.eat(Lexer.RealDivisionToken);
      node = new AST.RealDivisionAST(node, this.term());
    } else if (this.currentToken instanceof Lexer.ModToken) {
      this.currentToken = this.eat(Lexer.ModToken);
      node = new AST.ModAST(node, this.term());
    } else if (this.currentToken instanceof Lexer.AndToken) {
      this.currentToken = this.eat(Lexer.AndToken);
      node = new AST.AndAST(node, this.term());
    }

    return node;
  }

  private comparison() {
    let node = this.factor();

    if (this.currentToken instanceof Lexer.EqualsToken) {
      this.currentToken = this.eat(Lexer.EqualsToken);
      node = new AST.EqualsAST(node, this.comparison());
    } else if (this.currentToken instanceof Lexer.NotEqualsToken) {
      this.currentToken = this.eat(Lexer.NotEqualsToken);
      node = new AST.NotEqualsAST(node, this.comparison());
    } else if (this.currentToken instanceof Lexer.GreaterThanToken) {
      this.currentToken = this.eat(Lexer.GreaterThanToken);
      node = new AST.GreaterThanAST(node, this.comparison());
    } else if (this.currentToken instanceof Lexer.LessThanToken) {
      this.currentToken = this.eat(Lexer.LessThanToken);
      node = new AST.LessThanAST(node, this.comparison());
    } else if (this.currentToken instanceof Lexer.GreaterEqualsToken) {
      this.currentToken = this.eat(Lexer.GreaterEqualsToken);
      node = new AST.GreaterEqualsAST(node, this.comparison());
    } else if (this.currentToken instanceof Lexer.LessEqualsToken) {
      this.currentToken = this.eat(Lexer.LessEqualsToken);
      node = new AST.LessEqualsAST(node, this.comparison());
    }

    return node;
  }

  private factor(): AST.AST {
    if (this.currentToken instanceof Lexer.PlusToken) {
      this.currentToken = this.eat(Lexer.PlusToken);
      return new AST.UnaryPlusAST(this.factor());
    } else if (this.currentToken instanceof Lexer.MinusToken) {
      this.currentToken = this.eat(Lexer.MinusToken);
      return new AST.UnaryMinusAST(this.factor());
    } else if (this.currentToken instanceof Lexer.IntegerConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.IntegerConstToken);
      return new AST.IntegerConstantAST(value);
    } else if (this.currentToken instanceof Lexer.RealConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.RealConstToken);
      return new AST.RealConstantAST(value);
    } else if (this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
      const result = this.expression();
      this.currentToken = this.eat(Lexer.ClosingParenthesisToken);
      return result;
    } else if (this.currentToken instanceof Lexer.TrueToken) {
      this.currentToken = this.eat(Lexer.TrueToken);
      return new AST.TrueAST();
    } else if (this.currentToken instanceof Lexer.FalseToken) {
      this.currentToken = this.eat(Lexer.FalseToken);
      return new AST.FalseAST();
    } else if (this.currentToken instanceof Lexer.CharConstantToken) {
      const character = this.currentToken.value;
      this.currentToken = this.eat(Lexer.CharConstantToken);
      return new AST.CharConstantAST(character);
    } else if (this.currentToken instanceof Lexer.NotToken) {
      this.currentToken = this.eat(Lexer.NotToken);
      return new AST.NotAST(this.factor());
    } else {
      return this.variable();
    }
  }

  private call() {
    const name = this.variable().name;
    this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
    const args: AST.AST[] = [];
    if (!(this.currentToken instanceof Lexer.ClosingParenthesisToken)) {
      args.push(this.expression());
      while (this.currentToken instanceof Lexer.CommaToken) {
        this.currentToken = this.eat(Lexer.CommaToken);
        args.push(this.expression());
      }
    }
    this.currentToken = this.eat(Lexer.ClosingParenthesisToken);
    return new AST.CallAST(name, args);
  }

  public run() {
    const node = this.program();
    this.currentToken = this.eat(Lexer.EofToken);
    return node;
  }
}
