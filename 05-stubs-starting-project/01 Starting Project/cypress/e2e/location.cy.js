/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then(win => {
      cy.get('@userLocation').then(location => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserPosition')
        .callsFake((cb) => {
          setTimeout(() => {
            cb(location);
          }, 100);
        });
      });

      cy.stub(win.navigator.clipboard, 'writeText')
        .as('saveToClipboard')
        .resolves();  
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });

  it('should share a location URL', () => {
    cy.get('@userLocation').then(location => {
      const { latitude, longitude } = location.coords;
      const userName = location.userName;

      cy.get('[data-cy="name-input"]').type(userName);
      cy.get('[data-cy="get-loc-btn"]').click();
      cy.get('[data-cy="share-loc-btn"]').click();
      cy.get('@saveToClipboard').should('have.been.called');
      cy.get('@saveToClipboard').should('have.been.calledWithMatch', 
        new RegExp(`${latitude}.*${longitude}.*${encodeURI(userName)}`));
    });
  });
});
