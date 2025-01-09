describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Getting Started with Cypress');
    cy.get('li').should('have.length', 6);
  });
});