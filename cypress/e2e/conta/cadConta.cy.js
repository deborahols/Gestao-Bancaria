import { faker } from '@faker-js/faker'

describe ('Cadatro de Conta Bancaria', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/conta')
    })

    it('1- Conta criada com sucesso', () => {

    // abre o dropdown
    cy.get('#pessoaField').click()

    // seleciona a lista de opções, clica na opção pelo indice
    cy.get('ul li').eq(2).click()
    cy.get('#numeroContaField').type(faker.string.numeric(15))
    cy.get('button[type="submit"]').click()

    cy.contains('Conta criada com sucesso!').should('be.visible')
    })

})