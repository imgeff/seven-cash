import { describe, it, vi } from "vitest";
import { app } from "../app";
import { database } from "../../../database";
import { Response } from "superagent";
import { token } from "../../fakes/Token.fake";
import { accountDB } from "../../fakes/Account.fake";
import { transactionDB, transactionRequest, userIncludeAccount } from "../../fakes/Transaction.fake";
import chai from "chai";
import chaiHttp from "chai-http";
import JWT from "jsonwebtoken";

chai.use(chaiHttp);

const { account, user, transaction } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint /transaction/transfer", () => {

  it("É possível fazer uma transferência", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(accountDB);
    user.findFirst = vi.fn().mockResolvedValueOnce(userIncludeAccount);
    const debitAccount = { ...accountDB, balance: 50 };
    const creditAccount = { ...accountDB, balance: 150 };
    account.update = vi.fn()
      .mockResolvedValueOnce(debitAccount)
      .mockResolvedValueOnce(creditAccount);
    transaction.create = vi.fn().mockResolvedValueOnce(transactionDB);

    APIResponse = await chai
      .request(app)
      .post("/transaction/transfer")
      .send(transactionRequest)
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(201);
    expect(APIResponse.body).to.have.property("id", 1);
    expect(APIResponse.body).to.have.property("debitedAccountId", 1);
    expect(APIResponse.body).to.have.property("creditedAccountId", 2);
    expect(APIResponse.body).to.have.property("value", 50);
  });

  it("Não é possível fazer uma transferência quando o valor é maior que o saldo", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(accountDB);

    transactionRequest.value = 5000;

    APIResponse = await chai
      .request(app)
      .post("/transaction/transfer")
      .send(transactionRequest)
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(401);
    expect(APIResponse.body).to.have.property("message", "Unauthorized transfer due to insufficient balance!");
  });

  it("Não é possível realizar uma transferência de uma conta inexistente", async () => {
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
      .post("/transaction/transfer")
      .send(transactionRequest)
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(404);
    expect(APIResponse.body).to.have.property("message", "Account not found");
  });

  it("Não é possível realizar uma transferência sem estar logado", async () => {

    APIResponse = await chai
      .request(app)
      .post("/transaction/transfer");

    expect(APIResponse.status).to.be.equal(401);
    expect(APIResponse.body).to.have.property("message", "User not authorized");
  });

});