import { Schema } from "joi";
import { schemaErrors } from "../../utils/schema/errors";
import { ISchemaError } from "../../utils/schema/interfaces/ISchemaError";

export class SchemaValidation {

  public static validate = (schema: Schema) => (data: any) => {
    const { error: schemaFailed } = schema.validate(data);
  
    if (schemaFailed) {
      const errorDetails = schemaFailed.details[0];
      const error = new Error(errorDetails.message);

      const schemaError = schemaErrors.find((err: ISchemaError) => err.types.includes(errorDetails.type));
      if (schemaError) {
        error.name = schemaError.name;
        throw error;
      }

      error.name = errorDetails.type;
      throw error;
    }
  };
}
