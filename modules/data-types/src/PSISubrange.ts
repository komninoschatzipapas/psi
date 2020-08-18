import { PSIDataType } from './PSIDataTypes';

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

    static runtimeValidation(value: PSISubrange): boolean {
      return (
        this.left.lessEqualsThan(value) && this.right.greaterEqualsThan(value)
      );
    }
  };
}
