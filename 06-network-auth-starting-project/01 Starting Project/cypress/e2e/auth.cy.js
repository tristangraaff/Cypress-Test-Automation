/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should signup new user', () => {
    cy.login('/signup', 'test2@example.com', 'geendatabreach');
  });

  it('should log in with an existing user', () => {
    cy.login('/login', 'test@example.com', 'testpassword');
  });

  it('should logout', () => {
    cy.login('/login', 'test@example.com', 'testpassword');
    cy.contains('Logout').click();
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
});