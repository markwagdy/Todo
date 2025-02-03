describe("Todo API Tests", () => {
  const baseUrl = "http://localhost:3000/todos";
  let createdTodoId;

  before(() => {
    cy.exec("NODE_ENV=test node seedTest.js", { failOnNonZeroExit: false });
  });

  // after(() => {
  //   cy.exec("NODE_ENV=test node cleanupTestDB.js", { failOnNonZeroExit: false });
  // });

  it("should fetch all todos (GET /todos)", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('response.body ---------------------------------------------------',response)
      console.log('response.body ---------------------------------------------------',response)
      expect(response.body["data"]).to.be.an("array");
    });
  });

  it("should create a new todo (POST /todos)", () => {
    cy.request("POST", baseUrl, { task: "Test Cypress Todo" }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body.task).to.eq("Test Cypress Todo");

        createdTodoId = response.body.id;
      }
    );
  });

  it("should update a todo (PUT /todos/:id)", () => {
    cy.wrap(null).then(() => {
      expect(createdTodoId).to.exist;
      return cy.request("PUT", `${baseUrl}/${createdTodoId}`, { task: "Updated Task" });
    }).its("status").should("eq", 200);
  });

  it("should mark a todo as completed (PATCH /todos/:id/complete)", () => {
    cy.wrap(null).then(() => {
      expect(createdTodoId).to.exist;
      return cy.request("PATCH", `${baseUrl}/${createdTodoId}/complete`);
    }).its("status").should("eq", 200);
  });

  it("should delete a todo (DELETE /todos/:id)", () => {
    cy.wrap(null).then(() => {
      expect(createdTodoId).to.exist;
      return cy.request("DELETE", `${baseUrl}/${createdTodoId}`);
    }).its("status").should("eq", 200);
  });

  it("should return 404 for a non-existent todo (GET /todos/:id)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/99999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
