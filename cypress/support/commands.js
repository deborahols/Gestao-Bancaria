Cypress.Commands.add('cadPessoa', pessoa => {

  cy.visit('http://localhost:3000/pessoa')

  cy.get('#nameField').type(pessoa.nameField)
  cy.get('#cpfField').type(pessoa.cpfField)
  cy.get('#enderecoField').type(pessoa.enderecoField)
  cy.get('button[type="submit"]').click()

})

Cypress.Commands.add('cadConta', conta => {

  cy.get('[href="/conta"]').click()
  cy.get('#pessoaField').click()
  cy.get('ul li').eq(conta.pessoaField).click()
  cy.get('#numeroContaField').type(conta.numeroContaField)
  cy.get('button[type="submit"]').click()
  cy.contains('Conta criada com sucesso!').should('be.visible')

})



