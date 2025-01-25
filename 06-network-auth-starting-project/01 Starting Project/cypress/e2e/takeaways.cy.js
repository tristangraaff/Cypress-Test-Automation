/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });

  it('should add a new takeaway', () => {
    cy.intercept('POST', '/takeaways/new*', 'succes').as('createTakeaway');
    cy.login('/login', 'test@example.com', 'testpassword');
    cy.visit('/takeaways/new');
    cy.get('[data-cy="title"]').click(); //prevent flakiness
    cy.get('[data-cy="title"]').type('Learning is awesome');
    cy.get('[data-cy="body"]').type('Seeding databases, stubbing, intercepting http requests... I\'m learning a lot');
    cy.get('[data-cy="create-takeaway"]').click();
    const expectedBody = /title=Learning\+is\+awesome&body=Seeding\+databases%2C\+stubbing%2C\+intercepting\+http\+requests\.\.\.\+I%27m\+learning\+a\+lot/;
    cy.wait('@createTakeaway')
      .its('request.body')
      .should('match', expectedBody);
  });
});