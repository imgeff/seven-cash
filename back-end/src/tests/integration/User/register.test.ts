import { describe, it, vi } from "vitest";
import { database } from "../../../database";
import { Response } from "superagent";
import { userDB, userRequest } from "../../fakes/User.fake";
import { app } from "../app";
import { accountDB } from "../../fakes/Account.fake";
import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { user, account } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint user/register", () => {

  it("É possível registrar um usuário", async () => {
    user.findFirst = vi.fn().mockResolvedValueOnce(null);
    account.create = vi.fn().mockResolvedValueOnce(accountDB);
    user.create = vi.fn().mockResolvedValueOnce(userDB);

    APIResponse = await chai
        .request(app)
        .post("/user/register")
        .send(userRequest);

    expect(APIResponse.status).to.be.equal(201);
    expect(APIResponse.body).to.have.property("username", "JOD");
    expect(APIResponse.body).to.have.property("id", 1);
    expect(APIResponse.body).to.have.property("accountId", 1);
    expect(APIResponse.body).to.have.property("token");
    expect(APIResponse.body).to.not.have.property("password");
    expect(APIResponse.body.token.length > 0).to.be.equal(true);

  });

  it("Não é possível registrar um usuário com senha sem caracteres maiúsculos", async () => {
    userRequest.password = "johndoe123";

    APIResponse = await chai
      .request(app)
      .post("/user/register")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(400);
    expect(APIResponse.body).to.have.property("message");
  });

  it("Não é possível registrar um usuário com senha sem caracteres numéricos", async () => {
    userRequest.password = "JohnDoe";

    APIResponse = await chai
      .request(app)
      .post("/user/register")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(400);
    expect(APIResponse.body).to.have.property("message");
  });

  it("Não é possível registrar um usuário que já existe", async () => {
    user.findFirst = vi.fn().mockResolvedValueOnce(userDB);

    userRequest.password = "JohnDoe123";

    APIResponse = await chai
      .request(app)
      .post("/user/register")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(409);
    expect(APIResponse.body).to.have.property("message", "User already exists");
  })

});
