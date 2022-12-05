import { describe, it, vi } from "vitest";
import { database } from "../../../database";
import { Response } from "superagent";
import { accountDB } from "../../fakes/Account.fake";
import { app } from "../app";
import { token } from "../../fakes/Token.fake";
import JWT from "jsonwebtoken";
import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { account } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint account/balance", () => {

  it("É possível consultar o saldo da conta", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(accountDB);

    APIResponse = await chai
        .request(app)
        .get("/account/balance")
        .set({
          Authorization: token,
        });

    expect(APIResponse.status).to.be.equal(200);
    expect(APIResponse.body).to.have.property("balance", 100);
  });

  it("Não é possível consultar o saldo de uma conta inexistente", async () => {
    JWT.verify = vi.fn().mockReturnValueOnce({
      "id": 1,
      "accountId": 1,
      "username": "JOD",
      "iat": 1668648298,
      "exp": 1668734698
    });
    account.findFirst = vi.fn().mockResolvedValueOnce(null);

    APIResponse = await chai
      .request(app)
      .get("/account/balance")
      .set({
        Authorization: token,
      });

    expect(APIResponse.status).to.be.equal(404);
    expect(APIResponse.body).to.have.property("message", "Account not found");
  });

  it("Não é possível consultar o saldo de uma conta sem estar logado", async () => {

    APIResponse = await chai
      .request(app)
      .get("/account/balance");

    expect(APIResponse.status).to.be.equal(401);
    expect(APIResponse.body).to.have.property("message", "User not authorized");
  });

});
