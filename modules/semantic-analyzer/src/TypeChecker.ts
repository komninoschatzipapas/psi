import * as AST from 'ast';
import * as Types from 'data-types';
import {
  BaseSymbolScope,
  SymbolScope,
  VariableSymbol,
  ProcedureSymbol,
} from 'symbol';
import { assert, assertEquality, DebugInfoProvider } from 'error';

function assertTypeEquality(
  node: DebugInfoProvider,
  originalLeft: new (..._: any[]) => Types.PSIDataType,
  originalRight: new (..._: any[]) => Types.PSIDataType,
  message?: string, // Replaces LEFT_TYPE and RIGHT_TYPE with types
) {
  let left = (originalLeft as unknown) as typeof Types.PSIDataType;
  let right = (originalRight as unknown) as typeof Types.PSIDataType;

  if (left.treatAs) {
    left = left.treatAs;
  }

  if (right.treatAs) {
    right = right.treatAs;
  }

  assertEquality(
    node,
    left,
    right,
    message
      ? message
          .replace(/LEFT_TYPE/g, Types.printType(originalLeft))
          .replace(/RIGHT_TYPE/g, Types.printType(originalRight))
      : `Expected operands to be of same type but instead got mismatching types ${Types.printType(
          originalLeft,
        )} and ${Types.printType(originalRight)}`,
  );
}

export default class TypeChecker extends AST.ASTVisitor<
  new (..._: any[]) => Types.PSIDataType
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
    return this.currentScope.resolve(node.name, VariableSymbol)!.type;
  }

  public visitAssignment(node: AST.AssignmentAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);
    return left;
  }

  public visitIntegerDivision(node: AST.IntegerDivisionAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIInteger;
  }

  public visitRealDivision(node: AST.RealDivisionAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIReal;
  }

  public visitMinus(node: AST.MinusAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return left;
  }

  public visitMultiplication(node: AST.MultiplicationAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return left;
  }

  public visitMod(node: AST.ModAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return left;
  }

  public visitPlus(node: AST.PlusAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return left;
  }

  public visitEquals(node: AST.EqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitNotEquals(node: AST.NotEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitGreaterThan(node: AST.GreaterThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitLessThan(node: AST.LessThanAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitGreaterEquals(node: AST.GreaterEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitLessEquals(node: AST.LessEqualsAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitAnd(node: AST.AndAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

    return Types.PSIBoolean;
  }
  public visitOr(node: AST.OrAST) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);

    assertTypeEquality(node, left, right);

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
    this.currentScope
      .resolve(node.name, ProcedureSymbol)!
      .args.forEach((arg, i) => {
        const declarationType = this.visit(node.args[i]);

        assertEquality(
          node,
          arg.type,
          declarationType,
          `Expected argument ${arg.name} to be of type ${declarationType.constructor.name}`,
        );
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

  public visitSubrange(node: AST.SubrangeAST) {
    assertEquality(
      node,
      this.visit(node.left),
      this.visit(node.right),
      'Expected left and right constants of subrange to be of same type',
    );

    assert(
      node,
      node.left.value.lessEqualsThan(node, node.right.value),
      'Expected subrange lower bound to be less or equal to subrange upper bound',
    );

    return Types.createPSISubrange(node.left.value, node.right.value);
  }

  public visitArray(node: AST.ArrayAST) {
    return Types.PSIVoid;
  }

  public visitArrayAccess(node: AST.ArrayAccessAST) {
    // TODO: check array parameters

    const array = (this.currentScope.resolve(node.array.name, VariableSymbol)!
      .type as unknown) as {
      componentType: new (..._: any[]) => Types.PSIDataType;
      indexTypes: (new (..._: any[]) => Types.PSIType)[];
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

      assertTypeEquality(
        accessor,
        indexType,
        this.visit(accessor),
        `Expected index value to be of type LEFT_TYPE but instead got incompatible type RIGHT_TYPE`,
      );
    }

    return array.componentType;
  }
}
