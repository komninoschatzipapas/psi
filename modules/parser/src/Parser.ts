import * as Lexer from 'lexer';
import * as AST from 'ast';

export class Parser {
  private currentToken: Lexer.IToken;
  private lexer: Lexer.Lexer;

  constructor(lexer: Lexer.Lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  private eat(type: any) {
    if(this.currentToken instanceof type) {
       return this.lexer.getNextToken();
    } else {
      throw new Error(`Expected type ${this.currentToken.constructor.name} to be ${type}`);
    }
  }

  private block() {
    let declarations = this.declarations();
    let compoundStatement = this.compoundStatement();
    return new AST.BlockAST(declarations, compoundStatement);
  }

  private declarations() {
    let declarations: (AST.VariableDeclarationAST|AST.ProcedureDeclarationAST)[] = [];

    while(
      this.currentToken instanceof Lexer.VariableToken ||
      this.currentToken instanceof Lexer.ProcedureToken
    ) {
      if(this.currentToken instanceof Lexer.VariableToken) {     
        this.currentToken = this.eat(Lexer.VariableToken);
  
        do {
          this.variableDeclaration().forEach((d) => declarations.push(d));
          this.currentToken = this.eat(Lexer.SemiToken);
        } while(this.currentToken instanceof Lexer.IdToken);
      } else if(this.currentToken instanceof Lexer.ProcedureToken) {
        declarations.push(this.procedureDeclaration());
      }
    }

    return declarations;
  }

  private variableDeclaration() {
    let ids = [this.variable()];
    
    while(this.currentToken instanceof Lexer.CommaToken) {
      this.currentToken = this.eat(Lexer.CommaToken);
      ids.push(this.variable());
    }

    this.currentToken = this.eat(Lexer.ColonToken);
    
    const type = this.type();

    return ids.map((id) => new AST.VariableDeclarationAST(id, type));
  }

  private procedureDeclaration() {
    this.currentToken = this.eat(Lexer.ProcedureToken);
    const name = this.variable().name;
    let args: AST.VariableDeclarationAST[] = [];
    if(this.currentToken instanceof Lexer.OpeningParenthesisToken) {
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
    if(!(this.currentToken instanceof Lexer.IdToken)) {
      return []; // no arguments
    }

    let args = this.variableDeclaration();

    while(this.currentToken instanceof Lexer.SemiToken) {
      this.currentToken = this.eat(Lexer.SemiToken);
      this.variableDeclaration().forEach((d) => args.push(d));
    }

    return args;
  }

  private type() {
    if(this.currentToken instanceof Lexer.IntegerToken) {
      this.currentToken = this.eat(Lexer.IntegerToken);
      return new AST.IntegerAST();
    } else if(this.currentToken instanceof Lexer.RealToken) {
      this.currentToken = this.eat(Lexer.RealToken);
      return new AST.RealAST();
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
    let statements = this.statementList();
    this.currentToken = this.eat(Lexer.EndToken);
    return new AST.CompoundAST(statements);
  }

  private statementList() {
    let statements = [this.statement()];

    while(this.currentToken instanceof Lexer.SemiToken) {
      this.currentToken = this.eat(Lexer.SemiToken);
      statements.push(this.statement());
    }
    return statements;
  }

  private statement(): AST.AST {
    if(this.currentToken instanceof Lexer.BeginToken) {
      return this.compoundStatement();
    } else if(this.currentToken instanceof Lexer.IdToken) {
      return this.assignmentExpression();
    } else {
      return this.empty();
    }
  }

  private assignmentExpression() {
    const left = this.variable();
    this.currentToken = this.eat(Lexer.AssignToken);
    return new AST.AssignmentAST(left, this.expression())
  }

  private expression() {
    let node = this.term();

    while(
      this.currentToken instanceof Lexer.PlusToken ||
      this.currentToken instanceof Lexer.MinusToken
    ) {
      if(this.currentToken instanceof Lexer.PlusToken) {
        this.currentToken = this.eat(Lexer.PlusToken);
        node = new AST.PlusAST(node, this.term())
      } else {
        this.currentToken = this.eat(Lexer.MinusToken);
        node = new AST.MinusAST(node, this.term())
      }
    }

    return node;
  }

  private variable() {
    let node = new AST.VariableAST(this.currentToken.value);
    this.currentToken = this.eat(Lexer.IdToken);
    return node;
  }

  private empty() {
    return new AST.EmptyAST();
  }

  private term() {
    let node = this.factor();

    if(this.currentToken instanceof Lexer.MultiplicationToken) {
      this.currentToken = this.eat(Lexer.MultiplicationToken);
      node = new AST.MultiplicationAST(node, this.term())
    } else if(this.currentToken instanceof Lexer.IntegerDivisionToken) {
      this.currentToken = this.eat(Lexer.IntegerDivisionToken);
      node = new AST.IntegerDivisionAST(node, this.term())
    } else if(this.currentToken instanceof Lexer.RealDivisionToken) {
      this.currentToken = this.eat(Lexer.RealDivisionToken);
      node = new AST.RealDivisionAST(node, this.term())
    }

    return node;
  }

  private factor(): AST.AST {
    if(this.currentToken instanceof Lexer.PlusToken) {
      this.currentToken = this.eat(Lexer.PlusToken);
      return new AST.UnaryPlusAST(this.factor());
    } else if(this.currentToken instanceof Lexer.MinusToken) {
      this.currentToken = this.eat(Lexer.MinusToken);
      return new AST.UnaryMinusAST(this.factor());
    } else if(this.currentToken instanceof Lexer.IntegerConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.IntegerConstToken);
      return new AST.IntegerConstantAST(value);
    } else if(this.currentToken instanceof Lexer.RealConstToken) {
      const value = this.currentToken.value;
      this.currentToken = this.eat(Lexer.RealConstToken);
      return new AST.RealConstantAST(value);
    } else if(this.currentToken instanceof Lexer.OpeningParenthesisToken) {
      this.currentToken = this.eat(Lexer.OpeningParenthesisToken);
      const result = this.expression();
      this.currentToken = this.eat(Lexer.ClosingParenthesisToken);
      return result;
    } else {
      return this.variable();
    }
  }

  public run() {
    let node = this.program();
    this.currentToken = this.eat(Lexer.EofToken);
    return node;
  }
}
