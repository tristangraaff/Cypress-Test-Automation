/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a succes message' , () => {
    cy.intercept('POST', '/newsletter*', {status: 201}).as('subscribe'); //this intercepts any http request sent to localhost:3000/newsletter?anything
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Thanks for signing up');
  });

  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', {message: 'Email exists already'}).as('subscribe');
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Email exists already');
  });
});