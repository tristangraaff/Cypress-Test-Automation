/// <reference types="cypress" />

const taskTitle = 'New Task';
const taskSummary = 'A random description';

const taskTitle2 = 'New Task 2';
const taskSummary2 = 'A random desciption 2';

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

    it('should validate user input', () => {
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values');
    });

    it('should filter tasks', () => {
        cy.get('#title').type(taskTitle);
        cy.get('#summary').type(taskSummary);
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    });

    it('should add multiple tasks', () => {
        cy.get('#title').type(taskTitle);
        cy.get('#summary').type(taskSummary);
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.get('[data-cy=start-add-task-button]').click();
        cy.get('#title').type(taskTitle2);
        cy.get('#summary').type(taskSummary2);
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 2);

        cy.get('.task').eq(0).contains('New Task');
        cy.get('.task').eq(1).contains('New Task 2');
    });
});