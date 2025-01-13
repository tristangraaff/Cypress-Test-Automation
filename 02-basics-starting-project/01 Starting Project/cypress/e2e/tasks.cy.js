/// <reference types="cypress" />

describe('tasks management', () => {
    beforeEach(() => {
        cy.visit('index.html');
        cy.get('button').contains('Add Task').click();
        cy.get('.modal').should('exist');
    });

    it('should open and close the new task modal by clicking on the backdrop', () => {
        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should open and close the new task modal by clicking on the cancel button', () => {
        cy.get('button').contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create a new task', () => {

    });
});

//TODO
// -data-cy attributen toevoegen