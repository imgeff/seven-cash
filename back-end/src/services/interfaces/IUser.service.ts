import { IUserEntityRequest, IUserEntityResponse } from "../../database/entities/IUser.entity"

export interface IUserService {
  register(user: IUserEntityRequest): Promise<IUserEntityResponse>;
  login(user: IUserEntityRequest): Promise<IUserEntityResponse>;
}