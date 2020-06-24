describe('Main Page', () => {
  it('Visits the main page', () => {
    cy.visit('http://localhost:3000');
  });

  it('Shows the initial tutorial spotlight', () => {
    cy.get('.react-joyride__spotlight').should('be.visible');
  });

  it('Shows the initial tutorial tooltip', () => {
    cy.get('.react-joyride__tooltip').should('be.visible');
  });

  it('Should skip the the initial tutorial, and hide it', () => {
    cy.get(
      '[style="align-items: center; display: flex; justify-content: flex-end; margin-top: 15px;"] > div > button',
    ).click(); //Selector for skip button
    cy.get('.react-joyride__spotlight').should('not.be.visible');
    cy.get('.react-joyride__tooltip').should('not.be.visible');
  });
});
