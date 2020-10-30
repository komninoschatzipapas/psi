import * as AST from '@pascal-psi/ast';
import * as Types from '@pascal-psi/data-types';
import {
  BaseSymbolScope,
  SymbolScope,
  VariableSymbol,
  ProcedureSymbol,
  PSISymbol,
  FunctionSymbol,
  SymbolScopeType,
} from '@pascal-psi/symbol';
import PSIError, {
  assert,
  assertEquality,
  DebugInfoProvider,
} from '@pascal-psi/error';

function assertTypeEquality({
  node,
  left,
  right,
  allowPromoteLeft = true,
  allowPromoteRight = true,
  message, // Replaces LEFT_TYPE and RIGHT_TYPE with types
}: {
  node: DebugInfoProvider;
  left: typeof Types.PSIDataType;
  right: typeof Types.PSIDataType;
  allowPromoteLeft?: boolean;
  allowPromoteRight?: boolean;
  message?: string;
}) {
  const leftPrint = Types.printType(left);
  const rightPrint = Types.printType(right);

  if (left.treatAs) {
    left = left.treatAs;
  }

  if (right.treatAs) {
    right = right.treatAs;
  }

  let promoteLeft: typeof Types.PSIDataType | null = null;
  let promoteRight: typeof Types.PSIDataType | null = null;

  if (left !== right) {
    if (
      allowPromoteLeft &&
      left.promotable &&
      left.promotable.includes(right)
    ) {
      promoteLeft = left = right;
    } else if (
      allowPromoteRight &&
      right.promotable &&
      right.promotable.includes(left)
    ) {
      promoteRight = right = left;
    } else if (
      allowPromoteLeft &&
      allowPromoteRight &&
      left.promotable &&
      right.promotable
    ) {
      for (const sharedPromotableCandidate of left.promotable!) {
        if (right.promotable!.includes(sharedPromotableCandidate)) {
          promoteLeft = promoteRight = left = right = sharedPromotableCandidate;
        }
      }
    }
  }

  if (left.multitype && left.multitype.includes(right)) {
    left = right;
  } else if (right.multitype && right.multitype.includes(left)) {
    right = left;
  } else if (left.multitype && right.multitype) {
    for (const sharedMultitypeCandidate of left.multitype!) {
      if (right.multitype!.includes(sharedMultitypeCandidate)) {
        left = right = sharedMultitypeCandidate;
      }
    }
  }

  assertEquality(
    node,
    left,
    right,
    message
      ? message
          .replace(/LEFT_TYPE/g, leftPrint)
          .replace(/RIGHT_TYPE/g, rightPrint)
      : `Expected operands to be of same type but instead got incompatible types ${leftPrint} and ${rightPrint}`,
  );

  return {
    promoteLeft,
    promoteRight,
  };
}

export default class TypeChecker extends AST.ASTVisitor<
  typeof Types.PSIDataType
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

  public visitTrue(node: AST.TrueConstantAST) {
    return Types.PSIBoolean;
  }

  public visitFalse(node: AST.FalseConstantAST) {
    return Types.PSIBoolean;
  }

  public visitVariable(node: AST.VariableAST) {
    const symbol = this.currentScope.resolve(node.name)!;
    if (symbol instanceof VariableSymbol) {
      return symbol.type;
    } else if (
      symbol instanceof FunctionSymbol &&
      this.currentScope.type === SymbolScopeType.Function && // Is inside function
      this.currentScope.name === node.name // Variable name matches function name
    ) {
      return symbol.returnType;
    } else
      throw new PSIError(
        node,
        'Attempted to type check non variable or function',
      );
  }

  public visitAssignment(node: AST.AssignmentAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality({ node, left, right, allowPromoteLeft: false });
    return left;
  }

  public visitIntegerDivision(node: AST.IntegerDivisionAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.integerDivide,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIInteger;
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.divide,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIReal;
  }

  public visitMinus(node: AST.MinusAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.subtract,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return left;
  }

  public visitMultiplication(node: AST.MultiplicationAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.multiply,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return left;
  }

  public visitMod(node: AST.ModAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.mod,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return left;
  }

  public visitPlus(node: AST.PlusAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (node.left.promote && promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote.get(promoteLeft)!();
    }

    if (node.right.promote && promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.add,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return left;
  }

  public visitEquals(node: AST.EqualsAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.equals,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.notEquals,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.greaterThan,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitLessThan(node: AST.LessThanAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.lessThan,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.greaterEqualsThan,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    let left = this.visit(node.left);
    let right = this.visit(node.right);

    const { promoteLeft, promoteRight } = assertTypeEquality({
      node,
      left,
      right,
    });

    if (promoteLeft && left !== promoteLeft) {
      left = promoteLeft;
      node.left = node.left.promote!.get(promoteLeft)!();
    }

    if (promoteRight && right !== promoteRight) {
      right = promoteRight;
      node.right = node.right.promote!.get(promoteRight)!();
    }

    assert(
      node,
      left.prototype.lessEqualsThan,
      `Cannot perform operation with type ${Types.printType(left)}`,
    );

    return Types.PSIBoolean;
  }
  public visitAnd(node: AST.AndAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertEquality(
      node,
      left,
      Types.PSIBoolean,
      `Expected left side of operation to be of type ${Types.printType(
        Types.PSIBoolean,
      )} but instead got incompatible type ${Types.printType(left)}`,
    );
    assertEquality(
      node,
      right,
      Types.PSIBoolean,
      `Expected right side of operation to be of type ${Types.printType(
        Types.PSIBoolean,
      )} but instead got incompatible type ${Types.printType(right)}`,
    );

    return Types.PSIBoolean;
  }
  public visitOr(node: AST.OrAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertEquality(
      node,
      left,
      Types.PSIBoolean,
      `Expected left side of operation to be of type ${Types.printType(
        Types.PSIBoolean,
      )} but instead got incompatible type ${Types.printType(left)}`,
    );
    assertEquality(
      node,
      right,
      Types.PSIBoolean,
      `Expected right side of operation to be of type ${Types.printType(
        Types.PSIBoolean,
      )} but instead got incompatible type ${Types.printType(right)}`,
    );

    return Types.PSIBoolean;
  }

  public visitNot(node: AST.NotAST) {
    const target = this.visit(node);

    assertEquality(
      node,
      target,
      Types.PSIBoolean,
      `Expected operand to be of type ${Types.printType(
        Types.PSIBoolean,
      )} but instead got incompatible type ${Types.printType(target)}`,
    );

    return Types.PSIBoolean;
  }

  public visitUnaryMinus(node: AST.UnaryMinusAST) {
    const target = this.visit(node);

    assert(
      node,
      target.prototype.unaryMinus,
      `Cannot perform operation with type ${Types.printType(target)}`,
    );

    return this.visit(node.target);
  }

  public visitUnaryPlus(node: AST.UnaryPlusAST) {
    const target = this.visit(node);

    assert(
      node,
      target.prototype.unaryPlus(),
      `Cannot perform operation with type ${Types.printType(target)}`,
    );

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
    return Types.PSIProcedureType;
  }
  public visitBlock(node: AST.BlockAST) {
    this.visit(node.compoundStatement);
    node.declarations.forEach(this.visit.bind(this));
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
    this.visit(node.variable);
    this.visit(node.type);
    return Types.PSIVoid;
  }

  public visitCall(node: AST.CallAST) {
    const symbol = this.currentScope.resolve<
      typeof ProcedureSymbol | typeof FunctionSymbol
    >(node.name)!;

    symbol.args.forEach(
      ({ type: declarationType, name: argDeclarationName }, i) => {
        const argAST = node.args[i];
        const arg = this.visit(argAST);

        assertTypeEquality({
          node: argAST,
          left: declarationType,
          right: arg,
          allowPromoteLeft: false,
          message: `Expected argument ${argDeclarationName} to be of type LEFT_TYPE but instead got incompatible type RIGHT_TYPE`,
        });
      },
    );
    if (symbol instanceof ProcedureSymbol) {
      return Types.PSIVoid;
    } else if (symbol instanceof FunctionSymbol) {
      return symbol.returnType;
    } else {
      throw new PSIError(
        node,
        'Program error: Received type checker call of non procedure or function symbol',
      );
    }
  }

  public visitFor(node: AST.ForAST) {
    node.children.forEach(node => this.visit(node).bind(this));
    return Types.PSIVoid;
  }
  public visitWhile(node: AST.WhileAST) {
    node.children.forEach(node => this.visit(node).bind(this));
    return Types.PSIVoid;
  }
  public visitRepeat(node: AST.RepeatAST) {
    node.children.forEach(node => this.visit(node).bind(this));
    return Types.PSIVoid;
  }

  public visitSubrange(node: AST.SubrangeAST) {
    assertEquality(
      node,
      this.visit(node.left),
      this.visit(node.right),
      'Expected left and right constants of subrange to be of same type',
    );

    assert(
      node,
      node.left.value.lessEqualsThan(node.right.value),
      'Expected subrange lower bound to be less or equal to subrange upper bound',
    );

    return Types.createPSISubrange(node.left.value, node.right.value);
  }

  public visitArray(node: AST.ArrayAST) {
    return Types.PSIVoid;
  }

  public visitArrayAccess(node: AST.ArrayAccessAST) {
    const array = (this.currentScope.resolve(node.array.name, VariableSymbol)!
      .type as unknown) as {
      componentType: typeof Types.PSIDataType;
      indexTypes: typeof Types.PSIType[];
    };

    assertEquality(
      node,
      node.accessors.length,
      array.indexTypes.length,
      `Array is ${array.indexTypes.length}-dimensional but ${
        node.accessors.length
      } ${
        node.accessors.length > 1 ? 'index values were' : 'index value was'
      } provided instead`,
    );

    for (let i = 0; i < node.accessors.length; i++) {
      const indexType = array.indexTypes[i];
      const accessor = node.accessors[i];

      assertTypeEquality({
        node: accessor,
        left: indexType,
        right: this.visit(accessor),
        message: `Expected index value to be of type LEFT_TYPE but instead got incompatible type RIGHT_TYPE`,
      });
    }

    return array.componentType;
  }

  public visitFunctionDeclaration(node: AST.FunctionDeclarationAST) {
    this.currentScope = this.currentScope.children.get(node.name)!;
    this.visit(node.block);
    this.currentScope = this.currentScope.getParent()!;
    return Types.PSIFunctionType;
  }
}
