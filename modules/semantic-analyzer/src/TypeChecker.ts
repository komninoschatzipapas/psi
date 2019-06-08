import * as AST from 'ast';
import * as Types from 'data-types';
import {BaseSymbolScope, LocalSymbolScope, SymbolScope, VariableSymbol} from 'symbol'; 
import {expect} from 'chai';

export default class TypeChecker extends AST.ASTVisitor<new (...a: any[]) => Types.DataType> {
  private currentScope: SymbolScope;

  constructor(protected readonly ast: AST.AST, baseScope: BaseSymbolScope) {
    super();
    this.currentScope = baseScope;
  }

  public visitIntegerConstant(node: AST.IntegerConstantAST) {
    return Types.Integer;
  }

  public visitRealConstant(node: AST.RealConstantAST) {
    return Types.Real;
  }

  public visitVariable(node: AST.VariableAST) {
    return this.currentScope.resolveThrow(node.name, VariableSymbol).type;
  }

  public visitAssignment(node: AST.AssignmentAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    expect(left).to.be.eql(right);
    return left;
  }

  public visitIntegerDivision(node: AST.IntegerDivisionAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    expect(left).to.be.eql(Types.Integer);
    expect(right).to.be.eql(Types.Integer);
    return Types.Integer;
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    expect(left).to.be.eql(Types.Real);
    expect(right).to.be.eql(Types.Real);
    return Types.Real;
  }

  public visitMinus(node: AST.MinusAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return left;
  }

  public visitMultiplication(node: AST.MultiplicationAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return left;
  }

  public visitMod(node: AST.ModAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return left;
  }

  public visitPlus(node: AST.PlusAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return left;
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    return this.visit(node.target);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    return this.visit(node.target);
  }

  public visitProgram(node: AST.ProgramAST) {
    this.currentScope = this.currentScope.children.getThrow(node.name);
    this.visit(node.block);
    this.currentScope = this.currentScope.getParentThrow();
    return Types.Void;
  }
  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST) {
    this.currentScope = this.currentScope.children.getThrow(node.name);
    this.visit(node.block);
    this.currentScope = this.currentScope.getParentThrow();
    return Types.Void;
  }
  public visitBlock(node: AST.BlockAST) {
    this.visit(node.compoundStatement);
    return Types.Void;
  }
  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
    return Types.Void;
  }

  
  public visitEmpty(node: AST.EmptyAST) {
    return Types.Void;
  }
  public visitInteger(node: AST.IntegerAST) {
    return Types.Void;
  }
  
  public visitReal(node: AST.RealAST) {
    return Types.Void;
  }
  
  public visitVariableDeclaration(node: AST.VariableDeclarationAST) {
    return Types.Void;
  }
}