/// <reference types="cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('Hello World');
        cy.get('[data-cy="contact-input-name"]').type('Tristan');
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });
        
        // cy.get('@submitBtn')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled'); 
        // Dit is de standaard Cypress manier. Hierboven staand met .then is een alternatief hierop

        cy.get('[data-cy="contact-input-email"]').type('dummymail@yourmail.com{enter}');
        cy.get('[data-cy=contact-btn-submit]').as('submitBtn');
        cy.get('@submitBtn')
            .contains('Sending...')
            .should('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy=contact-btn-submit]').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.eq('Sending...');
        });

        cy.get('@submitBtn').contains('Send Message');
        cy.get('[data-cy="contact-input-message"]').as('msgInput');
        cy.get('@msgInput').focus().blur();
        cy.get('@msgInput')
            .parent()
            .invoke('attr', 'class')
            .should('include', 'invalid');

        cy.screenshot();
        cy.get('[data-cy="contact-input-name"]').as('nameInput');
        cy.get('@nameInput').focus().blur();
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/); //alternatief op regel 37

        cy.screenshot();
        cy.get('[data-cy="contact-input-email"]').as('emailInput');
        cy.get('@emailInput').focus().blur();
        cy.get('@emailInput')
            .parent()
            //.invoke('attr', 'class')
            //.should('include', 'invalid')
            .should((el) => {
                expect(el.attr('class')).not.to.be.undefined;
                expect(el.attr('class')).to.contain('invalid');
            });
    });
});