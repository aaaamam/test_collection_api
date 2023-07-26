import testBody from "../fixtures/test_body.json";

const env = Cypress.env();

describe("Test API Create collection", () => {
  let responseId;

  it("TC_01: Create collection success", () => {
    cy.request({
      method: "POST",
      url: env.url,
      headers: {
        "x-api-key": Cypress.env("x_api_key"),
      },
      body: testBody.body_create_collection,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.collection.name).to.eq(
        testBody.body_create_collection.collection.info.name
      );
      responseId = response.body.collection.id;
    });
  });

  it("TC_02: Get collection success", () => {
    cy.request({
      method: "GET",
      url: env.url + "/" + responseId,
      headers: {
        "x-api-key": Cypress.env("x_api_key"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.collection.info.name).to.eq(
        testBody.body_create_collection.collection.info.name
      );
    });
  });

  it("TC_03: Create and Get collection success", () => {
    cy.request({
      method: "POST",
      url: env.url,
      headers: {
        "x-api-key": Cypress.env("x_api_key"),
      },
      body: testBody.body_create_collection,
    }).then((responsePost) => {
      cy.request({
        method: "GET",
        url: env.url + "/" + responsePost.body.collection.id,
        headers: {
          "x-api-key": Cypress.env("x_api_key"),
        },
      }).then((responseGet) => {
        expect(responseGet.status).to.eq(200);
        expect(responseGet.body.collection.info.name).to.eq(
          testBody.body_create_collection.collection.info.name
        );
        expect(responsePost.status).to.eq(200);
        expect(responsePost.body.collection.name).to.eq(
          testBody.body_create_collection.collection.info.name
        );
      });
    });
  });
});
