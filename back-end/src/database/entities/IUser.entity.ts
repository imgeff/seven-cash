export interface IUserEntityRequest {
  username: string;
  password: string;
}

export interface IUserEntityResponse {
  id: number;
  username: string;
  accountId: number;
}

export interface IUserEntity extends IUserEntityRequest, IUserEntityResponse {}
