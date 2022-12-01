import { describe, it, vi } from "vitest";
import { database } from "../../../database";
import { Response } from "superagent";
import { userDB, userRequest } from "../../fakes/User.fake";
import { app } from "../app";
import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { user } = database;
const { expect } = chai;
let APIResponse: Response;

describe("Testes do endpoint user/login", () => {

  it("É possível fazer login", async () => {
    user.findFirst = vi.fn().mockResolvedValueOnce(userDB);

    APIResponse = await chai
        .request(app)
        .post("/user/login")
        .send(userRequest);

    expect(APIResponse.status).to.be.equal(200);
    expect(APIResponse.body).to.have.property("username", "JOD");
    expect(APIResponse.body).to.not.have.property("password");
    expect(APIResponse.body).to.have.property("token");
    expect(APIResponse.body.token.length > 0).to.be.equal(true);

  });

  it("Não é possível fazer login com senha sem caracteres maiúsculos", async () => {
    userRequest.password = "johndoe123";

    APIResponse = await chai
      .request(app)
      .post("/user/login")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(400);
    expect(APIResponse.body).to.have.property("message");
  });

  it("Não é possível fazer login com senha sem caracteres numéricos", async () => {
    userRequest.password = "JohnDoe";

    APIResponse = await chai
      .request(app)
      .post("/user/login")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(400);
    expect(APIResponse.body).to.have.property("message");
  });

  it("Não é possível fazer login de um usuário inexistente", async () => {
    user.findFirst = vi.fn().mockResolvedValueOnce(null);

    userRequest.password = "JohnDoe123";

    APIResponse = await chai
      .request(app)
      .post("/user/login")
      .send(userRequest);

    expect(APIResponse.status).to.be.equal(404);
    expect(APIResponse.body).to.have.property("message", "User not found");
  })

});
