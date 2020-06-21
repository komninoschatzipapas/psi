import * as AST from 'ast';
import * as Types from 'data-types';
import {
  BaseSymbolScope,
  LocalSymbolScope,
  SymbolScope,
  VariableSymbol,
  ProcedureSymbol,
} from 'symbol';
import { expect } from 'chai';

export default class TypeChecker extends AST.ASTVisitor<
  new (...a: any[]) => Types.PSIDataType
> {
  private currentScope: SymbolScope;

  constructor(protected readonly ast: AST.AST, baseScope: BaseSymbolScope) {
    super();
    this.currentScope = baseScope;
  }

  public visitIntegerConstant(node: AST.IntegerConstantAST) {
    return Types.PSIInteger;
  }

  public visitRealConstant(node: AST.RealConstantAST) {
    return Types.PSIReal;
  }

  public visitCharConstant(node: AST.CharConstantAST) {
    return Types.PSIChar;
  }

  public visitTrue(node: AST.TrueAST) {
    return Types.PSIBoolean;
  }

  public visitFalse(node: AST.FalseAST) {
    return Types.PSIBoolean;
  }

  public visitVariable(node: AST.VariableAST) {
    return this.currentScope.resolve(node.name, VariableSymbol)!.type;
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

    expect(left).to.be.eql(Types.PSIInteger);
    expect(right).to.be.eql(Types.PSIInteger);
    return Types.PSIInteger;
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    expect(left).to.be.eql(Types.PSIReal);
    expect(right).to.be.eql(Types.PSIReal);
    return Types.PSIReal;
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

  public visitEquals(node: AST.EqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitLessThan(node: AST.LessThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitAnd(node: AST.AndAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }
  public visitOr(node: AST.OrAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.PSIBoolean;
  }

  public visitNot(node: AST.NotAST) {
    return Types.PSIBoolean;
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    return this.visit(node.target);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    return this.visit(node.target);
  }

  public visitProgram(node: AST.ProgramAST) {
    this.currentScope = this.currentScope.children.get(node.name)!;
    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
    return Types.PSIVoid;
  }
  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST) {
    this.currentScope = this.currentScope.children.get(node.name)!;
    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
    return Types.PSIVoid;
  }
  public visitBlock(node: AST.BlockAST) {
    this.visit(node.compoundStatement);
    return Types.PSIVoid;
  }
  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
    return Types.PSIVoid;
  }
  public visitIf(node: AST.IfAST) {
    node.children.forEach(this.visit.bind(this));
    return Types.PSIVoid;
  }

  public visitEmpty(node: AST.EmptyAST) {
    return Types.PSIVoid;
  }

  public visitInteger(node: AST.IntegerAST) {
    return Types.PSIIntegerType;
  }

  public visitReal(node: AST.RealAST) {
    return Types.PSIRealType;
  }

  public visitBoolean(node: AST.BooleanAST) {
    return Types.PSIBooleanType;
  }

  public visitChar(node: AST.CharAST) {
    return Types.PSICharType;
  }

  public visitVariableDeclaration(node: AST.VariableDeclarationAST) {
    return Types.PSIVoid;
  }

  public visitCall(node: AST.CallAST) {
    this.currentScope
      .resolve(node.name, ProcedureSymbol)!
      .args.forEach((arg, i) => {
        expect(arg.type).to.be.eql(this.visit(node.args[i]));
      });
    return Types.PSIVoid;
  }

  public visitFor(node: AST.ForAST) {
    return Types.PSIVoid;
  }
  public visitWhile(node: AST.WhileAST) {
    return Types.PSIVoid;
  }
  public visitRepeat(node: AST.RepeatAST) {
    return Types.PSIVoid;
  }
}
