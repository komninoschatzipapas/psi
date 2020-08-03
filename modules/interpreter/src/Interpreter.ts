import * as Types from 'data-types';
import * as AST from 'ast';
import { SymbolScope, BaseSymbolScope, LocalSymbolScope } from 'symbol';
import { IntegerConstantAST } from 'ast';
import PSIError from 'error';

export class Interpreter extends AST.ASTVisitor<Types.PSIDataType> {
  public scope: SymbolScope;

  constructor(protected readonly ast: AST.AST, baseScope: BaseSymbolScope) {
    super();
    this.scope = baseScope;
  }

  private withNewScope<T>(name: string, fn: (scope: LocalSymbolScope) => T) {
    const scope = (this.scope = this.scope.children.get(name)!);
    const result = fn(scope);
    this.scope = this.scope.getParent()!;
    return result;
  }

  public visitAssignment(node: AST.AssignmentAST) {
    const variableNode = node.left as AST.VariableAST;
    const variableValue = this.visit(node.right);
    this.scope.changeValue(variableNode.name, variableValue); // FIX: go to higher scopes
    return new Types.PSIVoid();
  }

  public visitPlus(node: AST.PlusAST) {
    return this.visit(node.left).add(node, this.visit(node.right));
  }

  public visitMinus(node: AST.MinusAST) {
    return this.visit(node.left).subtract(node, this.visit(node.right));
  }

  public visitIntegerDivision(node: AST.IntegerDivisionAST) {
    return this.visit(node.left).integerDivide(node, this.visit(node.right));
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    return this.visit(node.left).divide(node, this.visit(node.right));
  }

  public visitMultiplication(node: AST.MultiplicationAST) {
    return this.visit(node.left).multiply(node, this.visit(node.right));
  }

  public visitMod(node: AST.ModAST) {
    return this.visit(node.left).mod(node, this.visit(node.right));
  }

  public visitEquals(node: AST.EqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).equals(node, this.visit(node.right)),
    );
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).notEquals(node, this.visit(node.right)),
    );
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).greaterThan(node, this.visit(node.right)),
    );
  }
  public visitLessThan(node: AST.LessThanAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).lessThan(node, this.visit(node.right)),
    );
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).greaterEqualsThan(node, this.visit(node.right)),
    );
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).lessEqualsThan(node, this.visit(node.right)),
    );
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
    return new Types.PSIBoolean(true);
  }

  public visitFalse(node: AST.FalseAST) {
    return new Types.PSIBoolean(false);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    return this.visit(node.target).unaryPlus(node);
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    return this.visit(node.target).unaryMinus(node);
  }

  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
    return new Types.PSIVoid();
  }

  public visitVariable(node: AST.VariableAST) {
    const variableValue = this.scope.resolveValue(node.name);

    if (!variableValue) {
      throw new PSIError(node, `Variable '${node.name}' is not in scope`);
    }

    return variableValue;
  }

  public visitEmpty(node: AST.EmptyAST) {
    return new Types.PSIVoid();
  }

  public visitProgram(node: AST.ProgramAST) {
    return this.withNewScope(node.name, () => {
      return this.visit(node.block);
    });
  }

  public visitBlock(node: AST.BlockAST) {
    node.declarations.forEach(this.visit.bind(this));
    this.visit(node.compoundStatement);
    return new Types.PSIVoid();
  }

  public visitVariableDeclaration(node: AST.VariableDeclarationAST) {
    return new Types.PSIVoid();
  }

  public visitReal(node: AST.RealAST) {
    return new Types.PSIRealType();
  }

  public visitInteger(node: AST.IntegerAST) {
    return new Types.PSIIntegerType();
  }

  public visitBoolean(node: AST.BooleanAST) {
    return new Types.PSIBooleanType();
  }

  public visitChar(node: AST.CharAST) {
    return new Types.PSICharType();
  }

  public visitProcedureDeclaration(node: AST.ProcedureDeclarationAST) {
    this.scope.changeValue(
      node.name,
      new Types.PSIProcedure(args => {
        this.withNewScope(node.name, scope => {
          node.args
            .map(arg => arg.variable.name)
            .forEach((argName, i) => {
              scope.changeValue(argName, args[i]);
            });
          this.visit(node.block);
        });
      }),
    );
    return new Types.PSIVoid();
  }

  public visitIf(node: AST.IfAST) {
    const condition = this.visit(node.condition);
    if (condition.equals(node, Types.PSIBoolean.true)) {
      this.visit(node.statement);
    } else {
      if (node.next) {
        this.visit(node.next);
      }
    }
    return new Types.PSIVoid();
  }

  public visitAnd(node: AST.AndAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).equals(node, Types.PSIBoolean.true) &&
        this.visit(node.right).equals(node, Types.PSIBoolean.true),
    );
  }
  public visitOr(node: AST.OrAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).equals(node, Types.PSIBoolean.true) ||
        this.visit(node.right).equals(node, Types.PSIBoolean.true),
    );
  }
  public visitNot(node: AST.NotAST) {
    const target = this.visit(node.target);
    return target.equals(node, Types.PSIBoolean.true)
      ? Types.PSIBoolean.false
      : Types.PSIBoolean.true;
  }

  public visitCall(node: AST.CallAST) {
    const args = node.args.map(arg => this.visit(arg));
    this.scope.resolveValue(node.name, Types.PSIProcedure)!.call(args);

    return new Types.PSIVoid();
  }

  public visitFor(node: AST.ForAST) {
    const variable = node.assignment.left;
    this.visitAssignment(node.assignment);
    this.visit(node.statement);
    if (node.increment) {
      while (this.visit(variable).lessThan(node, this.visit(node.finalValue))) {
        this.visit(
          new AST.AssignmentAST(
            variable,
            new AST.PlusAST(
              variable,
              new IntegerConstantAST(new Types.PSIInteger(1)),
            ),
          ),
        );
        this.visit(node.statement);
      }
    } else {
      while (
        this.visit(variable).greaterThan(node, this.visit(node.finalValue))
      ) {
        this.visit(
          new AST.AssignmentAST(
            variable,
            new AST.MinusAST(
              variable,
              new IntegerConstantAST(new Types.PSIInteger(1)),
            ),
          ),
        );
        this.visit(node.statement);
      }
    }
    return new Types.PSIVoid();
  }

  public visitWhile(node: AST.WhileAST) {
    while (this.visit(node.condition).equals(node, Types.PSIBoolean.true)) {
      this.visit(node.statement);
    }
    return new Types.PSIVoid();
  }

  public visitRepeat(node: AST.RepeatAST) {
    do {
      node.statements.forEach(this.visit.bind(this));
    } while (this.visit(node.condition).equals(node, Types.PSIBoolean.false));
    return new Types.PSIVoid();
  }
}
