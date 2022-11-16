export class ThrowError {
  private static _error = new Error();

  public static NotFound(entity: string, message = `${entity} not found`) {
    this._error.message = message;
    this._error.name = 'NotFoundError';
    throw this._error;
  }
  
  public static NotAuthorized(entity: string, message = `${entity} not authorized`) {
    this._error.message = message;
    this._error.name = 'NotAuthorizedError';
    throw this._error;
  }
  
  public static Conflict(entity: string, message = `${entity} already exists`) {
    this._error.message = message;
    this._error.name = 'ConflictError';
    throw this._error;
  }
}