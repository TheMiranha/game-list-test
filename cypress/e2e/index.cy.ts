describe('Index - spec', () => {
  const route = '/'
  const elements = {
    loader: '#loader_container'
  }
  it('main - route check', () => {
    cy.visit(route)
  })
  it('primary - render loader', () => {
    cy.visit(route)
    cy.get(elements.loader).should('exist')
  })
})
