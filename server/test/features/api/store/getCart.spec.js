const request = require("test/support/request");
const factory = require("test/support/factory");
const { expect } = require("chai");
const uuidV1 = require("uuid/v1");

describe("API :: GET /api/store/cart", () => {
  let cookie;
  context("when sent cart data is ok", () => {
    beforeEach(async function() {
      const signup = await request()
        .post("/api/signup")
        .send({
          name: "New User",
          email: "test@ipragmatech.com",
          password: "123456"
        })
        .catch(error => {
          //We can ignore the duplicate exception
        });
      const { header } = await request()
        .post(`/api/login`)
        .send({
          email: "test@ipragmatech.com",
          password: "123456"
        })
        .expect(200);
      cookie = header["set-cookie"];
    });
    it("Returns the cartItems for the user", async () => {
      const { body } = await request()
        .get("/api/store/cart")
        .set("cookie", cookie)
        .expect(200);
    });
  });
});
