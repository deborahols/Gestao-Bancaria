Cypress.Commands.add('cadPessoa', pessoa => {

  cy.visit('http://localhost:3000/pessoa')

  cy.get('#nameField').type(pessoa.nameField)
  cy.get('#cpfField').type(pessoa.cpfField)
  cy.get('#enderecoField').type(pessoa.enderecoField)
  cy.get('button[type="submit"]').click()

})