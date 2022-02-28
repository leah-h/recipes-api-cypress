/// <reference types="cypress" />>

describe("Recipes CRUD API Testing", () => {
  const recipesAPI =
    "https://api.buildable.dev/flow/v1/call/test/demo-recipe-app-c7bb284c3c";

  it("should get recipes", () => {
    cy.request("POST", `${recipesAPI}/recipes/list`)
      .its("body.rows")
      .should("have.length", 3);
  });

  it("should add a recipe", () => {
    const newRecipe = {
      name: "Cheese Sandwich",
      ingredients: "2 slices bread of choice, 1 slice america cheese, butter",
      instructions:
        "1. Melt butter in a pan 2. Toast sandwich both sides until golden brown 3. Enjoy!",
    };
    cy.request("POST", `${recipesAPI}/recipes/create`, newRecipe);
    cy.request("POST", `${recipesAPI}/recipes/list`)
      .its("body.rows")
      .should("have.length", 4);
  });

  it("should update a recipe", () => {
    const updateRecipe = {
      name: "Melted Gooey Cheesy Cheese Sandwich",
    };
    cy.request(
      "GET",
      `${recipesAPI}/recipes/get/e8f9bf46474f41d280b743ec1ec7794e`
    )
      .its("body.name")
      .should("equals", "Cheese Sandwich");
    cy.request(
      "PATCH",
      `${recipesAPI}/recipes/update/e8f9bf46474f41d280b743ec1ec7794e`,
      updateRecipe
    );
    cy.request(
      "GET",
      `${recipesAPI}/recipes/get/e8f9bf46474f41d280b743ec1ec7794e`
    )
      .its("body.name")
      .should("equals", "Melted Gooey Cheesy Cheese Sandwich");
  });

  it("should delete a recipe", () => {
    cy.request("POST", `${recipesAPI}/recipes/list`)
      .its("body.rows")
      .should("have.length", 4);
    cy.request(
      "DELETE",
      `${recipesAPI}/recipes/delete/e8f9bf46474f41d280b743ec1ec7794e`
    );
    cy.request("POST", `${recipesAPI}/recipes/list`)
      .its("body.rows")
      .should("have.length", 3);
  });
});
