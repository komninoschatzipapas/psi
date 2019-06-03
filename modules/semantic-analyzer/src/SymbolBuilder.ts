import * as AST from 'ast';
import { BaseSymbolScope, LocalSymbolScope, SymbolScope } from 'symbol';
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
    const variableValue = this.currentScope.resolve(node.name, AST.VariableAST);

    if(!variableValue) {
      throw new Error(`Variable ${node.name} used without being declared`);
    } else {
      return variableValue;
    }
  }
  
  public visitProgram(node: AST.ProgramAST): void {
    this.currentScope = new LocalSymbolScope(node.name, this.currentScope);
    this.visit(node.block);
    this.currentScope = (this.currentScope as LocalSymbolScope).parent;
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
    } else throw new Error('Unknown data type');

    this.currentScope.insert(symbol);
    return symbol;
  }

  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST): void {
    this.currentScope = new LocalSymbolScope(node.name, this.currentScope);
    const argSymbols = node.args.map(arg => this.visitVariableDeclaration(arg));

    (this.currentScope as LocalSymbolScope).parent.insert(new PSISymbol.ProcedureSymbol(
      node.name,
      argSymbols
    ));

    this.visit(node.block);
    this.currentScope = (this.currentScope as LocalSymbolScope).parent;
  }

  public visitAssignment(node: AST.AssignmentAST): void {

  }
  public visitEmpty(node: AST.EmptyAST): void {

  }
  public visitInteger(node: AST.IntegerAST): void {

  }
  public visitIntegerConstant(node: AST.IntegerConstantAST): void {

  }
  public visitIntegerDivision(node: AST.IntegerDivisionAST): void {

  }
  public visitMinus(node: AST.MinusAST): void {

  }
  public visitMultiplication(node: AST.MultiplicationAST): void {

  }
  public visitPlus(node: AST.PlusAST): void {

  }
  public visitReal(node: AST.RealAST): void {

  }
  public visitRealConstant(node: AST.RealConstantAST): void {

  }
  public visitRealDivision(node: AST.RealDivisionAST): void {

  }
  public visitType(node: AST.TypeAST): void {

  }
  public visitUnaryMinus(node: AST.UnaryMinusAST): void {

  }
  public visitUnaryPlus(node: AST.UnaryPlusAST): void {

  }
}
