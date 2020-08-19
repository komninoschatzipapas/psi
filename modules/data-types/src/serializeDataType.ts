import PSIDataType from './PSIDataType';
import PSIBoolean from './PSIBoolean';
import PSIChar from './PSIChar';
import PSIInteger from './PSIInteger';
import PSIReal from './PSIReal';

export default function serializeDataType(dataType: PSIDataType): any {
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
