/// <reference types="cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('Hello World');
        cy.get('[data-cy="contact-input-name"]').type('Tristan');
        cy.get('[data-cy="contact-input-email"]').type('dummymail@yourmail.com');
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });

        // cy.get('[data-cy=contact-btn-submit]').as('submitBtn');
        // cy.get('@submitBtn')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled'); 
        // Dit is de standaard Cypress manier. Hierboven staand met .then is een alternatief hierop

        cy.get('@submitBtn').click();
        cy.get('@submitBtn')
            .contains('Sending...')
            .should('have.attr', 'disabled');
    });
});