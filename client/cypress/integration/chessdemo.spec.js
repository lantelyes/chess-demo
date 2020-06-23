describe('Main Page', () => {
  it('Visits the main page', () => {
    cy.visit('http://localhost:3000');
  });

  it('Shows the initial tutorial spotlight', () => {
    cy.get('.react-joyride__spotlight').should('be.visible');
  });

  it('Shows the initial tutorial tooltop', () => {
    cy.get('.react-joyride__tooltip').should('be.visible');
  });

  it('Should skip the the initial tutorial, and hide it', () => {
    cy.get('[aria-label="Close"] > svg').click();
    cy.get('.react-joyride__spotlight').should('not.be.visible');
    cy.get('.react-joyride__tooltip').should('not.be.visible');
  });
});
