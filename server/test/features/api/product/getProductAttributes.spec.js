const request = require("test/support/request");
const factory = require("test/support/factory");
const { expect } = require("chai");
let productId;
describe("API :: GET /api/product/getAttributes/:productId", () => {
  context("when there are products", () => {
    beforeEach(() => {

    });

    it("return success with array of products", async () => {
      factory
        .createMany("product", 2, [{ name: "First" }, { name: "Second" }])
        .then(product => {
          productId = product[0].dataValues.product_id;
          factory
            .createMany("attribute", 2, [{ name: "Color" }, { name: "Size" }])
            .then(attributes => {
              factory
                .createMany("attribute_value", 2, [
                  { attribute_id: attributes[0].dataValues.attribute_id },
                  { attribute_id: attributes[1].dataValues.attribute_id }
                ])
                .then(attributeValues => {
                  return factory.createMany("product_attribute", 2, [
                    {
                      product_id: 1,
                      attribute_value_id:
                        attributeValues[0].dataValues.attribute_value_id
                    },
                    {
                      product_id: 1,
                      attribute_value_id:
                        attributeValues[1].dataValues.attribute_value_id
                    }
                  ]).then(productAttributes => async function (){
                    const { body } = await request()
                      .get("/api/product/getAttributes/"+productId)
                      .expect(200);
                      console.log(body);
                    expect(body[0]).to.have.all.keys(
                      "attributeValueId",
                      "attributeName",
                      "attributeValue"
                    );
                  });
                });
            });
        });

    });
  });

  context("when there are no product", () => {
    it("return success with empty array", async () => {
      const { body } = await request()
        .get("/api/product/getAttributes/300")
        .expect(404);
    });
  });
});
