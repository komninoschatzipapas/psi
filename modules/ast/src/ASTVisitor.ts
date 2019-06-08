import * as AST from './AST';
import Runnable from './Runnable';

export default abstract class ASTVisitor<T=unknown> implements Runnable<T> {
  protected readonly abstract ast: AST.AST;
  public abstract visitAssignment(node: AST.AssignmentAST): T;
  public abstract visitBlock(node: AST.BlockAST): T;
  public abstract visitCompound(node: AST.CompoundAST): T;
  public abstract visitEmpty(node: AST.EmptyAST): T;
  public abstract visitInteger(node: AST.IntegerAST): T;
  public abstract visitIntegerConstant(node: AST.IntegerConstantAST): T;
  public abstract visitIntegerDivision(node: AST.IntegerDivisionAST): T;
  public abstract visitMinus(node: AST.MinusAST): T;
  public abstract visitMultiplication(node: AST.MultiplicationAST): T;
  public abstract visitPlus(node: AST.PlusAST): T;
  public abstract visitProcedureDeclaration(node: AST.ProcedureDeclarationAST): T;
  public abstract visitProgram(node: AST.ProgramAST): T;
  public abstract visitReal(node: AST.RealAST): T;
  public abstract visitRealConstant(node: AST.RealConstantAST): T;
  public abstract visitRealDivision(node: AST.RealDivisionAST): T;
  public abstract visitUnaryMinus(node: AST.UnaryMinusAST): T;
  public abstract visitUnaryPlus(node: AST.UnaryPlusAST): T;
  public abstract visitVariable(node: AST.VariableAST): T;
  public abstract visitVariableDeclaration(node: AST.VariableDeclarationAST): T;
  public abstract visitMod(node: AST.ModAST): T;
  public abstract visitTrue(node: AST.TrueAST): T;
  public abstract visitFalse(node: AST.FalseAST): T;

  public visit(node: AST.AST): T {
    if(node instanceof AST.AssignmentAST) {
      return this.visitAssignment(node);
    } else if(node instanceof AST.BlockAST) {
      return this.visitBlock(node);
    } else if(node instanceof AST.CompoundAST) {
      return this.visitCompound(node);
    } else if(node instanceof AST.EmptyAST) {
      return this.visitEmpty(node);
    } else if(node instanceof AST.IntegerAST) {
      return this.visitInteger(node);
    } else if(node instanceof AST.IntegerConstantAST) {
      return this.visitIntegerConstant(node);
    } else if(node instanceof AST.IntegerDivisionAST) {
      return this.visitIntegerDivision(node);
    } else if(node instanceof AST.MinusAST) {
      return this.visitMinus(node);
    } else if(node instanceof AST.MultiplicationAST) {
      return this.visitMultiplication(node);
    } else if(node instanceof AST.PlusAST) {
      return this.visitPlus(node);
    } else if(node instanceof AST.ProcedureDeclarationAST) {
      return this.visitProcedureDeclaration(node);
    } else if(node instanceof AST.ProgramAST) {
      return this.visitProgram(node);
    } else if(node instanceof AST.RealAST) {
      return this.visitReal(node);
    } else if(node instanceof AST.RealConstantAST) {
      return this.visitRealConstant(node);
    } else if(node instanceof AST.RealDivisionAST) {
      return this.visitRealDivision(node);
    } else if(node instanceof AST.UnaryMinusAST) {
      return this.visitUnaryMinus(node);
    } else if(node instanceof AST.UnaryPlusAST) {
      return this.visitUnaryPlus(node);
    } else if(node instanceof AST.VariableAST) {
      return this.visitVariable(node);
    } else if(node instanceof AST.VariableDeclarationAST) {
      return this.visitVariableDeclaration(node);
    } else if(node instanceof AST.ModAST) {
      return this.visitMod(node);
    } else if(node instanceof AST.TrueAST) {
      return this.visitTrue(node);
    } else if(node instanceof AST.FalseAST) {
      return this.visitFalse(node);
    } else {
      throw new Error('Unknown node type on visitor');
    }
  }

  public run() {
    return this.visit(this.ast);
  }
}
