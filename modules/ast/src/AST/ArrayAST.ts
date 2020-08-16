import { TypeAST } from '.';
import { createPSIArray } from 'data-types';

export default class ArrayAST extends TypeAST {
  get dataType() {
    if (!this.componentType.dataType) {
      throw new Error(
        'Program error: Could not calculate ArrayAST data type: component type has no data type',
      );
    }

    for (const indexType of this.indexTypes) {
      if (!indexType.dataType) {
        throw new Error(
          'Program error: Could not calculate ArrayAST data type: an index type had no data type',
        );
      }
    }

    return createPSIArray(
      this.indexTypes.map(indexType => indexType.dataType!),
      this.componentType.dataType,
    );
  }

  constructor(public indexTypes: TypeAST[], public componentType: TypeAST) {
    super();
    this.addChild(...indexTypes, componentType);
  }
}
