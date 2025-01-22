/// <reference types="Cypress" />

describe('contact form', 
  { defaultCommandTimeout: 10000,
    //browser: 'edge'
   },() => {
  before(() => {
    //Before runt eenmalig, voor het draaien van alle tests
  });

  beforeEach(() => {
    cy.visit('/about');
  });

  it('should submit the form', () => {
    cy.task('log', 'Dit wordt de terminal output.');
    cy.getByDataCy('contact-input-message').type('Hello world!');
    cy.getByDataCy('contact-input-name').type('John Doe');
    cy.getByDataCy('contact-btn-submit').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.eq('Send Message');
    });
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    cy.submitForm();
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot();
    cy.getByDataCy('contact-btn-submit').as('submitBtn');
    // cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.getByDataCy('contact-btn-submit').contains('Send Message');
    cy.getByDataCy('contact-input-message').as('msgInput');
    cy.get('@msgInput').focus().blur();
    cy.get('@msgInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getByDataCy('contact-input-name').focus().blur();
    cy.getByDataCy('contact-input-name')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getByDataCy('contact-input-email').focus().blur();
    cy.getByDataCy('contact-input-email')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })
  });
});
