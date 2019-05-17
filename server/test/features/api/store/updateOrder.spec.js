const request = require("test/support/request");
const factory = require("test/support/factory");
const { expect } = require("chai");
const uuidV1 = require("uuid/v1");

describe("API :: PUT /api/store/order/:orderId", () => {
  context("when sent order data is ok", () => {
    it("updates and returns 200 with the updated order", async () => {
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
        .post("/api/login")
        .send({
          email: "test@ipragmatech.com",
          password: "123456"
        })
        .expect(200);
      let attributes = [{ attributeValueId: 1 }, { attributeValueId: 7 }];

      const { body } = await request()
        .put("/api/store/order/1")
        .set("cookie", header["set-cookie"])
        .send({
          status: 1,
          comments: "Payment done by Paypal",
          authCode: "XCCSDFFD2234",
          reference: "{payment details}"
        })
        .expect(200);
    });
  });
});
