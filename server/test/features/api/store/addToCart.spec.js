const request = require("test/support/request");
const factory = require("test/support/factory");
const { expect } = require("chai");
const uuidV1 = require("uuid/v1");

describe("API :: POST /api/store/cart", () => {
  let cookie;
  context("when sent valid cart data ", () => {
    before(async function() {
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
    it("Updates and returns 200 with the single quantity", async () => {
      let attributes = [{ attributeValueId: 1 }, { attributeValueId: 7 }];
      const { body } = await request()
        .post("/api/store/cart")
        .set("cookie", cookie)
        .send({
          cartId: uuidV1().replace(/-/g, ''),
          productId: 1,
          attributes: JSON.stringify(attributes),
          quantity: 1,
          buyNow: 1
        })
        .expect(200);
    });
    it("Updates and returns 200 with the multiple quantity", async () => {
      let attributes = [{ attributeValueId: 1 }, { attributeValueId: 7 }];
      const { body } = await request()
        .post("/api/store/cart")
        .set("cookie", cookie)
        .send({
          cartId: uuidV1().replace(/-/g, ''),
          productId: 1,
          attributes: JSON.stringify(attributes),
          quantity: 3,
          buyNow: 1
        })
        .expect(200);
        
    });
  });
});
