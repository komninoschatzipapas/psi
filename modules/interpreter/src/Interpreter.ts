import * as Types from '@pascal-psi/data-types';
import * as AST from '@pascal-psi/ast';
import {
  SymbolScope,
  BaseSymbolScope,
  LocalSymbolScope,
  SymbolScopeType,
} from '@pascal-psi/symbol';
import { IntegerConstantAST } from '@pascal-psi/ast';
import PSIError from '@pascal-psi/error';

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
    const left = node.left;
    const newValue = this.visit(node.right);

    if (left instanceof AST.VariableAST) {
      if (
        this.scope.type === SymbolScopeType.Function && // Is in function
        left.name === this.scope.name // Variable name matches function name
      ) {
        this.scope.changeFunctionReturnType(left.name, newValue);
      } else this.scope.changeValue(left.name, newValue);
    } else if (left instanceof AST.ArrayAccessAST) {
      this.scope.changeArrayValue(
        left.array.name,
        left.accessors.map(accessor => this.visit(accessor)),
        newValue,
      );
    }

    return new Types.PSIVoid();
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
    return new Types.PSIBoolean(
      this.visit(node.left).equals(this.visit(node.right)),
    );
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).notEquals(this.visit(node.right)),
    );
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).greaterThan(this.visit(node.right)),
    );
  }
  public visitLessThan(node: AST.LessThanAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).lessThan(this.visit(node.right)),
    );
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).greaterEqualsThan(this.visit(node.right)),
    );
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).lessEqualsThan(this.visit(node.right)),
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

  public visitTrue(node: AST.TrueConstantAST) {
    return new Types.PSIBoolean(true);
  }

  public visitFalse(node: AST.FalseConstantAST) {
    return new Types.PSIBoolean(false);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    return this.visit(node.target).unaryPlus();
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    return this.visit(node.target).unaryMinus();
  }

  public visitCompound(node: AST.CompoundAST) {
    node.children.forEach(this.visit.bind(this));
    return new Types.PSIVoid();
  }

  public visitVariable(node: AST.VariableAST) {
    const variableValue = this.scope.resolveValue(node.name);

    if (!variableValue) {
      throw new PSIError(
        node,
        `Variable '${node.name}' used without first being initialized`,
      );
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
    if (condition.equals(Types.PSIBoolean.true)) {
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
      this.visit(node.left).equals(Types.PSIBoolean.true) &&
        this.visit(node.right).equals(Types.PSIBoolean.true),
    );
  }
  public visitOr(node: AST.OrAST) {
    return new Types.PSIBoolean(
      this.visit(node.left).equals(Types.PSIBoolean.true) ||
        this.visit(node.right).equals(Types.PSIBoolean.true),
    );
  }
  public visitNot(node: AST.NotAST) {
    const target = this.visit(node.target);
    return target.equals(Types.PSIBoolean.true)
      ? Types.PSIBoolean.false
      : Types.PSIBoolean.true;
  }

  public visitCall(node: AST.CallAST) {
    const args = node.args.map(arg => this.visit(arg));
    const procedureOrFunction = this.scope.resolveValue<
      Types.PSIProcedure | Types.PSIFunction
    >(node.name)!;

    procedureOrFunction.call(args);

    if (procedureOrFunction instanceof Types.PSIFunction) {
      const returnValue = this.scope.resolveValue<Types.PSIFunction>(node.name)!
        .returnValue;

      if (!returnValue) {
        throw new PSIError(node, 'Function does not return any value');
      }

      return returnValue;
    } else {
      return new Types.PSIVoid();
    }
  }

  public visitFor(node: AST.ForAST) {
    const variable = node.assignment.left;
    this.visitAssignment(node.assignment);
    this.visit(node.statement);
    if (node.increment) {
      while (this.visit(variable).lessThan(this.visit(node.finalValue))) {
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
      while (this.visit(variable).greaterThan(this.visit(node.finalValue))) {
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
    while (this.visit(node.condition).equals(Types.PSIBoolean.true)) {
      this.visit(node.statement);
    }
    return new Types.PSIVoid();
  }

  public visitRepeat(node: AST.RepeatAST) {
    do {
      node.statements.forEach(this.visit.bind(this));
    } while (this.visit(node.condition).equals(Types.PSIBoolean.false));
    return new Types.PSIVoid();
  }

  public visitSubrange(node: AST.SubrangeAST) {
    return new (Types.createPSISubrange(
      this.visitConstant(node.left),
      this.visitConstant(node.right),
    ))();
  }

  public visitArray(node: AST.ArrayAST) {
    return new (Types.createPSIArray(
      node.indexTypes.map(
        node =>
          (this.visit(node).constructor as unknown) as typeof Types.PSIType,
      ),
      (this.visit(node.componentType)
        .constructor as unknown) as typeof Types.PSIDataType,
    ))();
  }

  public visitArrayAccess(node: AST.ArrayAccessAST) {
    const variableValue = this.scope.resolveValue(node.array.name);

    if (!variableValue) {
      throw new PSIError(
        node,
        `Program error: Array accessed without being initialized`,
      );
    }

    if (!Types.isPSIArray(variableValue)) {
      throw new PSIError(
        node,
        `Program error: Expected array access variable to be array`,
      );
    }
    const value = variableValue.getValue(
      node.accessors.map(node => this.visit(node)),
    );

    if (!value) {
      throw new PSIError(
        node,
        `Array '${node.array.name}' index used without first being initialized`,
      );
    }

    return value!;
  }

  public visitFunctionDeclaration(node: AST.FunctionDeclarationAST) {
    this.scope.changeValue(
      node.name,
      new Types.PSIFunction(args => {
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

    return new Types.PSIFunctionType();
  }
}
