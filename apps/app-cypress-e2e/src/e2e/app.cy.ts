
describe('app-cypress-e2e', () => {
  it('has title', () => {
    cy.visit('/')
    cy.get('h1').contains(/Welcome/);
  });


  it('select today', () => {
    cy.visit('/')

    const dateEl = '[data-testid="bal-date-input"]'

    cy.get(dateEl).type('2.3.2024')
    cy.get(dateEl).should('have.value', '02.03.2024')
  });

});
