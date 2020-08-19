import { PSIDataType } from './PSIDataTypes';
import PSIType from './PSIType';
import serializeDataType from './serializeDataType';

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

export default function createPSIArray(
  indexTypes: (typeof PSIType)[],
  componentType: typeof PSIType,
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
  };
}
