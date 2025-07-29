import { faker } from '@faker-js/faker'
import { gerarPessoa, gerarConta } from '../../support/utils'

describe ('Exclusão de conta', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.cadPessoa(gerarPessoa())
        cy.cadConta(gerarConta())
    })

   it('1- Cancelamento de exclusão de Conta', () => {

    const conta = {
        numeroContaField: faker.string.numeric(15)
    }

    cy.cadConta(conta)

    cy.contains(conta.numeroContaField)
      .parent() // pega a linha onde o nome está
      .find('.text-red-600')
      .click()

    cy.contains('Cancelar').click()

    cy.contains(conta.numeroContaField).should('be.visible')
})

    /*it ('2 - Conta não excluída devido a existencia de movimentação', () => {

})*/

    it ('3 - Conta excluída com sucesso', () => {
    
    const conta = {
        numeroContaField: faker.string.numeric(15)
    }

    cy.cadConta(conta)

    cy.contains(conta.numeroContaField)
      .parent() // pega a linha onde o nome está
      .find('.text-red-600')
      .click()

    cy.contains('Excluir').click()

    cy.contains('Conta excluída com sucesso').should('be.visible')
    cy.contains(conta.numeroContaField).should('not.exist')
})

})