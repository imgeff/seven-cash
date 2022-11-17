import { ISchemaError } from "./interfaces/ISchemaError";

export const schemaErrors: ISchemaError[] = [
  {
    name: 'ValidationError',
    types: [
      'string.base',
      'string.min',
      'string.max',
      'string.email',
      'string.empty',
      'string.pattern.base',
      'number.base',
      'number.min',
      'number.max',
      'number.integer',
    ],
  },
  {
    name: 'RequiredError',
    types: ['any.required'],
  },
];