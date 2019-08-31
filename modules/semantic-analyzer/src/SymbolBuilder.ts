import * as AST from 'ast';
import { BaseSymbolScope, LocalSymbolScope, SymbolScope, ProgramSymbol } from 'symbol';
import * as PSISymbol from 'symbol';
import * as Types from 'data-types';

export default class SymbolBuilder extends AST.ASTVisitor {
  private currentScope: SymbolScope;

  constructor(protected readonly ast: AST.AST, private readonly baseScope: BaseSymbolScope) {
    super();
    this.currentScope = baseScope;
  }

  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
  }

  public visitVariable(node: AST.VariableAST): PSISymbol.PSISymbol {
    const variableValue = this.currentScope.resolve(node.name, PSISymbol.VariableSymbol);

    if(!variableValue) {
      throw new Error(`Variable ${node.name} used without being declared`);
    } else {
      return variableValue;
    }
  }

  public visitProgram(node: AST.ProgramAST): void {
    this.currentScope = new LocalSymbolScope(node.name, this.currentScope);
    this.currentScope.insert(new ProgramSymbol(node.name));
    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
  }

  public visitBlock(node: AST.BlockAST) {
    node.declarations.forEach(this.visit.bind(this));
    this.visit(node.compoundStatement);
  }

  public visitVariableDeclaration(node: AST.VariableDeclarationAST): PSISymbol.VariableSymbol {
    let symbol: PSISymbol.VariableSymbol;

    if(node.type instanceof AST.IntegerAST) {
      symbol = new PSISymbol.VariableSymbol(node.variable.name, Types.Integer);
    } else if(node.type instanceof AST.RealAST) {
      symbol = new PSISymbol.VariableSymbol(node.variable.name, Types.Real);
    } else if(node.type instanceof AST.BooleanAST) {
      symbol = new PSISymbol.VariableSymbol(node.variable.name, Types.Boolean);
    } else if(node.type instanceof AST.CharAST) {
      symbol = new PSISymbol.VariableSymbol(node.variable.name, Types.Char);
    } else throw new Error('Unknown data type');

    this.currentScope.insert(symbol);
    return symbol;
  }

  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST): void {
    this.currentScope = new LocalSymbolScope(node.name, this.currentScope);
    const argSymbols = node.args.map(arg => this.visitVariableDeclaration(arg));

    this.currentScope.getParent()!.insert(new PSISymbol.ProcedureSymbol(
      node.name,
      argSymbols
    ));

    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
  }

  public visitCall(node: AST.CallAST) {
    const procedure = this.currentScope.resolve(node.name, PSISymbol.ProcedureSymbol);
    if(!procedure) {
      throw new Error('Could not find procedure');
    } else if(node.args.length != procedure.args.length) {
      throw new Error('Invalid procedure arguments length');
    }
  }

  public visitAssignment(node: AST.AssignmentAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitEmpty(node: AST.EmptyAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitInteger(node: AST.IntegerAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitIntegerConstant(node: AST.IntegerConstantAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitIntegerDivision(node: AST.IntegerDivisionAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitMinus(node: AST.MinusAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitMultiplication(node: AST.MultiplicationAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitPlus(node: AST.PlusAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitReal(node: AST.RealAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitRealConstant(node: AST.RealConstantAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitRealDivision(node: AST.RealDivisionAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitType(node: AST.TypeAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitUnaryMinus(node: AST.UnaryMinusAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitUnaryPlus(node: AST.UnaryPlusAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitMod(node: AST.ModAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitBoolean(node: AST.BooleanAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitTrue(node: AST.TrueAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitFalse(node: AST.FalseAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitEquals(node: AST.EqualsAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitNotEquals(node: AST.NotEqualsAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitGreaterThan(node: AST.GreaterThanAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitLessThan(node: AST.LessThanAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitLessEquals(node: AST.LessEqualsAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitIf(node: AST.IfAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitChar(node: AST.CharAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitCharConstant(node: AST.CharConstantAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitAnd(node: AST.AndAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitOr(node: AST.OrAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitNot(node: AST.NotAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitFor(node: AST.ForAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitWhile(node: AST.WhileAST): void {
    node.children.forEach(this.visit.bind(this));
  }
  public visitRepeat(node: AST.RepeatAST): void {
    node.children.forEach(this.visit.bind(this));
  }
}
