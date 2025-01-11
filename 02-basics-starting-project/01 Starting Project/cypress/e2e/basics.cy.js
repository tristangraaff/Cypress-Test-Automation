/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('img');
  });

  it('should render the h1 element and show the correct expected text', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'React Tasks');
  });
});