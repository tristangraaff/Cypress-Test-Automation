/// <reference types="cypress" />

describe('tasks management', () => {
    beforeEach(() => {
        cy.visit('index.html');
        cy.get('[data-cy=start-add-task-button]').click();
        cy.get('.modal').should('exist');
    });

    it('should open and close the new task modal by clicking on the backdrop', () => {
        cy.get('[data-cy=backdrop]').click({ force: true });
        cy.get('[data-cy=backdrop]').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should open and close the new task modal by clicking on the cancel button', () => {
        cy.get('[data-cy=cancel-button]').contains('Cancel').click();
        cy.get('[data-cy=backdrop]').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create a new task', () => {
        
    });
});

//TODO
// -data-cy attributen toevoegen