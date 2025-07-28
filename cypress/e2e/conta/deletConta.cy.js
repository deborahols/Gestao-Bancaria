import { faker } from '@faker-js/faker'
import { gerarPessoa } from '../../support/utils'

describe ('Exclusão de conta', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.cadPessoa(gerarPessoa())
    })

   it('1- Conta excluída com sucesso', () => {

    const conta = {
        pessoaField: 0,
        numeroContaField: faker.string.numeric(17)
    }

    cy.cadConta(conta)

     cy.contains(conta.pessoaField)
      .parent() // pega a linha onde o nome está
      .find('.text-red-600')
      .click()

   cy.contains('Cancelar').click()

   cy.contains(conta.pessoaField).should('be.visible');

})

})