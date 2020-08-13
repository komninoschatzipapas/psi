import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default function createPSISubrange(
  left: PSIDataType,
  right: PSIDataType,
) {
  return class PSISubrange extends PSIDataType {
    public static get treatAs() {
      if (PSISubrange.left.constructor === PSISubrange.right.constructor) {
        return PSISubrange.left.constructor as typeof PSIDataType;
      } else {
        throw new Error(
          'Program error: PSISubrange subtype tried to be accessed when left and right types mismatch',
        );
      }
    }

    public static isSubrangeType = true;

    public static left = left;
    public static right = right;

    static runtimeValidation(
      debugInfoProvider: DebugInfoProviderLike,
      value: PSISubrange,
    ): boolean {
      return (
        this.left.lessEqualsThan(debugInfoProvider, value) &&
        this.right.greaterEqualsThan(debugInfoProvider, value)
      );
    }

    public add(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public subtract(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public multiply(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public divide(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public integerDivide(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public mod(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): PSISubrange {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public equals(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public lessThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public greaterThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public lessEqualsThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public greaterEqualsThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSISubrange,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
    public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSISubrange type',
      );
    }
  };
}
