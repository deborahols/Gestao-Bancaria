import { faker } from '@faker-js/faker'

describe ('Exclusão de conta', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.get('[href="/conta"]').click()
    })

   it('1- Conta excluída com sucesso', () => {

    cy.get('#pessoaField').click()

    // seleciona a lista de opções, clica na opção pelo indice
    cy.get('ul li').eq(0).click()
    cy.get('#numeroContaField').type(faker.string.numeric(17))
    cy.get('button[type="submit"]').click()
    
    })

})