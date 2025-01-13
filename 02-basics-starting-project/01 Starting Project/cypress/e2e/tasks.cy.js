/// <reference types="cypress" />

const taskTitle = 'New Task';
const taskSummary = 'A random description';

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
        cy.get('#title').type(taskTitle);
        cy.get('#summary').type(taskSummary);
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains(taskTitle);
        cy.get('.task p').contains(taskSummary);
        cy.get('[data-cy=backdrop]').should('not.exist');
        cy.get('.modal').should('not.exist');
    });
});

//TODO
// -data-cy attributen toevoegen