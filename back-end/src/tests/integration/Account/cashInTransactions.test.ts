import { describe, it, vi } from "vitest";
import { database } from "../../../database";
import { Response } from "superagent";
import { transactionsCashIn } from "../../fakes/Account.fake";
import { app } from "../app";
import { token } from "../../fakes/Token.fake";
import JWT from "jsonwebtoken";
import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { account } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint account/transactions/cashin", () => {

  it("É possível consultar as transações de entrada da conta", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(transactionsCashIn);

    APIResponse = await chai
        .request(app)
        .get("/account/transactions/cashin")
        .set({
          Authorization: token,
        });

    expect(APIResponse.status).to.be.equal(200);
    expect(APIResponse.body).to.have.property("id", 1);
    expect(APIResponse.body).to.have.property("balance", 100);
    expect(APIResponse.body).to.not.have.property("transactionDebited");
    expect(APIResponse.body.transactionCredited.length).to.be.equal(2);
  });

  it("Não é possível consultar as transações de entrada de uma conta inexistente", async () => {
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
      .get("/account/transactions/cashin")
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(404);
    expect(APIResponse.body).to.have.property("message", "Account not found");
  });

  it("Não é possível consultar as transações de entrada de uma conta sem estar logado", async () => {

    APIResponse = await chai
      .request(app)
      .get("/account/transactions/cashin");

    expect(APIResponse.status).to.be.equal(401);
    expect(APIResponse.body).to.have.property("message", "User not authorized");
  });

});
