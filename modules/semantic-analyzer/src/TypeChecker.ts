import * as AST from 'ast';
import * as Types from 'data-types';
import {BaseSymbolScope, LocalSymbolScope, SymbolScope, VariableSymbol, ProcedureSymbol} from 'symbol';
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

  public visitCharConstant(node: AST.CharConstantAST) {
    return Types.Char;
  }

  public visitTrue(node: AST.TrueAST) {
    return Types.Boolean;
  }

  public visitFalse(node: AST.FalseAST) {
    return Types.Boolean;
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

  public visitEquals(node: AST.EqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitLessThan(node: AST.LessThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitAnd(node: AST.AndAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }
  public visitOr(node: AST.OrAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    expect(left).to.be.eql(right);
    return Types.Boolean;
  }

  public visitNot(node: AST.NotAST) {
    return Types.Boolean;
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
    return Types.Void;
  }
  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST) {
    this.currentScope = this.currentScope.children.get(node.name)!;
    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
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
  public visitIf(node: AST.IfAST) {
    node.children.forEach(this.visit.bind(this));
    return Types.Void;
  }


  public visitEmpty(node: AST.EmptyAST) {
    return Types.Void;
  }

  public visitInteger(node: AST.IntegerAST) {
    return Types.IntegerType;
  }

  public visitReal(node: AST.RealAST) {
    return Types.RealType;
  }

  public visitBoolean(node: AST.BooleanAST) {
    return Types.BooleanType;
  }

  public visitChar(node: AST.CharAST) {
    return Types.CharType;
  }

  public visitVariableDeclaration(node: AST.VariableDeclarationAST) {
    return Types.Void;
  }

  public visitCall(node: AST.CallAST) {
    this.currentScope.resolve(node.name, ProcedureSymbol)!.args.forEach((arg, i) => {
      expect(arg.type).to.be.eql(this.visit(node.args[i]));
    })
    return Types.Void;
  }
}