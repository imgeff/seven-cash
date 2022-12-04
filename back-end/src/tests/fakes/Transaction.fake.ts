import { userDB } from "./User.fake";
import { accountDB } from "./Account.fake";

export const transactionDB = {
	id: 1,
	debitedAccountId: 1,
	creditedAccountId: 2,
	value: 50,
	createdAt: "2022-11-17T22:38:16.119Z"
}

export const transactionRequest = {
  username: "admin",
  value: 50
}

export const userIncludeAccount = {
  ...userDB,
  account: {
    ...accountDB
  },
}