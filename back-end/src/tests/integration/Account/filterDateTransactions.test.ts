import { describe, it, vi } from "vitest";
import { database } from "../../../database";
import { Response } from "superagent";
import { transactions } from "../../fakes/Account.fake";
import { app } from "../app";
import { token } from "../../fakes/Token.fake";
import JWT from "jsonwebtoken";
import chai from "chai";
import chaiHttp = require("chai-http");
import { ITransactionEntity } from "../../../database/entities/ITransaction.entity";

chai.use(chaiHttp);

const { account } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint account/transactions/filter", () => {
  const date = "2022-11-17";

  it("É possível consultar as transações de uma determinada data", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(transactions);

    APIResponse = await chai
        .request(app)
        .get(`/account/transactions/filter?date=${date}`)
        .set({
          Authorization: token,
        });

    expect(APIResponse.status).to.be.equal(200);
    expect(APIResponse.body).to.have.property("id", 1);
    expect(APIResponse.body).to.have.property("balance", 100);
    APIResponse.body.transactionCredited.forEach((transaction: ITransactionEntity) => {
      expect(transaction.createdAt.toString().includes(date)).to.be.true;
    })
    APIResponse.body.transactionDebited.forEach((transaction: ITransactionEntity) => {
      expect(transaction.createdAt.toString().includes(date)).to.be.true;
    })
  });

  it("Não é possível consultar as transações de uma data de uma conta inexistente", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(undefined);

    APIResponse = await chai
      .request(app)
      .get(`/account/transactions/filter?date=${date}`)
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(404);
    expect(APIResponse.body).to.have.property("message", "Account not found");
  });

  it("Não é possível consultar as transações de uma data de uma conta sem estar logado", async () => {

    APIResponse = await chai
      .request(app)
      .get(`/account/transactions/filter?date=${date}`);

    expect(APIResponse.status).to.be.equal(401);
    expect(APIResponse.body).to.have.property("message", "User not authorized");
  });

});
