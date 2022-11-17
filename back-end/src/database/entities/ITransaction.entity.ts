export interface ITransactionEntityRequest {
  username: string;
  value: number;
}

export interface ITransactionEntity {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
}