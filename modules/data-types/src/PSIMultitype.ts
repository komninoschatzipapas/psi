import PSIDataType from './PSIDataType';

export default function createPSIMultitype(...types: (typeof PSIDataType)[]) {
  return class PSIMultitype extends PSIDataType {
    public static multitype = types;
  };
}
