import * as Types from 'data-types';
import * as AST from 'ast';

export class Interpreter extends AST.ASTVisitor<Types.DataType> {
  public globalScope: Map<string, Types.DataType>;

  constructor(protected readonly ast: AST.AST) {
    super();
    this.globalScope = new Map();
  }

  public visitAssignment(node: AST.AssignmentAST) {
    const variableNode = node.left as AST.VariableAST;
    const variableValue = this.visit(node.right);
    this.globalScope.set(variableNode.name, variableValue);
    return new Types.Void();
  }

  public visitPlus(node: AST.PlusAST) {
    return this.visit(node.left).add(this.visit(node.right));
  }

  public visitMinus(node: AST.MinusAST) {
    return this.visit(node.left).subtract(this.visit(node.right));
  }

  public visitIntegerDivision(node: AST.IntegerDivisionAST) {
    return this.visit(node.left).integerDivide(this.visit(node.right));
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    return this.visit(node.left).divide(this.visit(node.right));
  }

  public visitMultiplication(node: AST.MultiplicationAST) {
    return this.visit(node.left).multiply(this.visit(node.right));
  }

  public visitMod(node: AST.ModAST) {
    return this.visit(node.left).mod(this.visit(node.right));
  }

  public visitEquals(node: AST.EqualsAST) {
    return new Types.Boolean(this.visit(node.left).equals(this.visit(node.right)));
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    return new Types.Boolean(this.visit(node.left).notEquals(this.visit(node.right)));
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    return new Types.Boolean(this.visit(node.left).greatherThan(this.visit(node.right)));
  }
  public visitLessThan(node: AST.LessThanAST) {
    return new Types.Boolean(this.visit(node.left).lessThan(this.visit(node.right)));
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    return new Types.Boolean(this.visit(node.left).greaterEqualsThan(this.visit(node.right)));
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    return new Types.Boolean(this.visit(node.left).lessEqualsThan(this.visit(node.right)));
  }

  public visitIntegerConstant(node: AST.IntegerConstantAST) {
    return node.value;
  }

  public visitRealConstant(node: AST.RealConstantAST) {
    return node.value;
  }

  public visitCharConstant(node: AST.CharConstantAST) {
    return node.value;
  }

  public visitTrue(node: AST.TrueAST) {
    return new Types.Boolean(true);
  }

  public visitFalse(node: AST.FalseAST) {
    return new Types.Boolean(false);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    return this.visit(node.target).unaryPlus();
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    return this.visit(node.target).unaryMinus();
  }

  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
    return new Types.Void();
  }

  public visitVariable(node: AST.VariableAST) {
    const variableValue = this.globalScope.get(node.name);

    if(variableValue === undefined) {
      throw new Error(`Variable '${node.name}' is not in scope`);
    }

    return variableValue;
  }

  public visitEmpty(node: AST.EmptyAST) {
    return new Types.Void();
  }

  public visitProgram(node: AST.ProgramAST) {
    return this.visit(node.block);
  }

  public visitBlock(node: AST.BlockAST) {
    node.declarations.forEach(this.visit.bind(this));
    this.visit(node.compoundStatement);
    return new Types.Void();
  }

  public visitVariableDeclaration(node: AST.VariableDeclarationAST) {
    return new Types.Void();
  }

  public visitReal(node: AST.RealAST) {
    return new Types.RealType();
  }

  public visitInteger(node: AST.IntegerAST) {
    return new Types.IntegerType();
  }

  public visitBoolean(node: AST.BooleanAST) {
    return new Types.BooleanType();
  }

  public visitChar(node: AST.CharAST) {
    return new Types.CharType();
  }

  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST) {
    return new Types.Void();
  }

  public visitIf(node: AST.IfAST) {
    if(this.visit(node.condition).toBoolean()) {
      this.visit(node.statement);
    } else {
      if(node.next) {
        this.visit(node.next);
      }
    }
    return new Types.Void();
  }

  public visitAnd(node: AST.AndAST) {
    return new Types.Boolean(this.visit(node.left).toBoolean() && this.visit(node.right).toBoolean());
  }
  public visitOr(node: AST.OrAST) {
    return new Types.Boolean(this.visit(node.left).toBoolean() || this.visit(node.right).toBoolean());
  }
  public visitNot(node: AST.NotAST) {
    return new Types.Boolean(!this.visit(node.target).toBoolean());
  }
}
