export const accountDB = {
  id: 1,
  balance: 100,
}

export const transactions = {
	id: 1,
	balance: 100,
	transactionCredited: [
		{
			id: 1,
			debitedAccountId: 2,
			creditedAccountId: 1,
			value: 50,
			createdAt: "2022-11-17T15:04:57.611Z"
		},
		{
			id: 2,
			debitedAccountId: 2,
			creditedAccountId: 1,
			value: 50,
			createdAt: "2022-11-17T15:11:33.172Z"
		}
	],
	"transactionDebited": [
		{
			id: 3,
			debitedAccountId: 1,
			creditedAccountId: 2,
			value: 20,
			createdAt: "2022-11-17T14:00:56.731Z"
		},
		{
			id: 4,
			debitedAccountId: 1,
			creditedAccountId: 2,
			value: 30,
			createdAt: "2022-11-17T15:13:27.029Z"
		},
		{
			id: 5,
			debitedAccountId: 1,
			creditedAccountId: 2,
			value: 50,
			createdAt: "2022-11-17T22:38:16.119Z"
		}
	]
}
