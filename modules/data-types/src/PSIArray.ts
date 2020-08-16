import {
  PSIDataType,
  PSIBoolean,
  PSIChar,
  PSIInteger,
  PSIReal,
} from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';
import PSIType from './PSIType';

export function isPSIArray(
  dataType: PSIDataType,
): dataType is PSIDataType & PSIArrayLike {
  return dataType.isArray;
}

export interface PSIArrayLike {
  value: any;
  changeValue(keys: PSIDataType[], value: PSIDataType): void;
  getValue(keys: PSIDataType[]): PSIDataType | undefined;
}

function serializeDataType(dataType: PSIDataType): any {
  if (
    dataType instanceof PSIBoolean ||
    dataType instanceof PSIChar ||
    dataType instanceof PSIInteger ||
    dataType instanceof PSIReal
  ) {
    return dataType.serialize();
  } else {
    throw new Error(`Could not serialize data type ${dataType}`);
  }
}

export default function createPSIArray(
  indexTypes: (new (..._: any[]) => PSIType)[],
  componentType: new (..._: any[]) => PSIType,
) {
  return class PSIArray extends PSIDataType implements PSIArrayLike {
    public static isArrayType = true;
    public isArray = true;
    public static indexTypes = indexTypes;
    public static componentType = componentType;

    public static defaultValue = new PSIArray();

    public readonly value: any;

    constructor() {
      super();
      this.value = {};
    }

    public changeValue(keys: PSIDataType[], value: PSIDataType) {
      let current = this.value;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const serialized = serializeDataType(key);
        if (!current.hasOwnProperty(serialized)) {
          current[serialized] = {};
        }
        current = current[serialized];
      }

      current[serializeDataType(keys[keys.length - 1])] = value;
    }

    public getValue(keys: PSIDataType[]) {
      let current = this.value;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const serialized = serializeDataType(key);
        if (!current.hasOwnProperty(serialized)) {
          return undefined;
        }
        current = current[serialized];
      }

      return current[serializeDataType(keys[keys.length - 1])];
    }

    public add(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public subtract(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public multiply(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public divide(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public integerDivide(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public mod(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): PSIArray {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public equals(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public lessThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public greaterThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public lessEqualsThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public greaterEqualsThan(
      debugInfoProvider: DebugInfoProviderLike,
      right: PSIArray,
    ): boolean {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
    public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
      throw new PSIError(
        debugInfoProvider,
        'Cannot execute this operator with the PSIArray type',
      );
    }
  };
}
