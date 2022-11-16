import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errors } from "../../utils/error";

export class ErrorManager {

  public static catch(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const { name, message } = err;
  
    const typeError = errors.find((error) => error.types.includes(name));
  
    if (typeError !== undefined) {
      return res.status(typeError.code).json({ message });
    }
  
    console.error(err);
    const internalServerErrorMessage = "Desculpe, Houve um erro interno no qual já estamos trabalhando para resolver, tente novamente mais tarde.";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: internalServerErrorMessage });
  }
}