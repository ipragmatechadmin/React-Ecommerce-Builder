const request = require("test/support/request");
const factory = require("test/support/factory");
const { expect } = require("chai");
const uuidV1 = require("uuid/v1");

describe("API :: POST /api/store/order", () => {
  let cookie;
  context("when sent order data is ok", () => {
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

    it("updates and returns 200 with the updated order", async () => {

      let attributes = [{ attributeValueId: 1 }, { attributeValueId: 7 }];
      const { body } = await request()
        .post("/api/store/order")
        .set("cookie", cookie)
        .send({
          cartId: uuidV1().replace(/-/g, ''),
          shippingId: 1,
          taxId: 1
        })
        .expect(200);
    });
  });
  context(
    "When there is no loggedin user and try to place order",
    () => {
      it("return unauthored error with message ", async () => {
        const { body } = await request()
          .post("/api/shipping")
          .send({
            cartId: uuidV1().replace(/-/g, ''),
            shippingId: 1,
            taxId: 1
          })
          .expect(401);
        expect(body.message).to.equal("User not authorized for this action");
      });
    }
  );
});
