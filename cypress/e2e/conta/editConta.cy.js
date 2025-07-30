import { faker } from '@faker-js/faker'
import { gerarPessoa, gerarConta  } from '../../support/utils'

describe ('Edição de Conta', () => {

    beforeEach(() => {
        cy.cadPessoa(gerarPessoa())
        cy.cadConta(gerarConta())
    })

    it('1 - Validar edição com campo Pessoa em branco', () => {

    cy.get('.text-blue-600').first().click()
    
    cy.get('#pessoaField').clear().click()

    cy.get('button[type="submit"]').click()

    cy.contains('Bad Request').should('be.visible')
    })

     it('2 - Validar edição com campo Número da Conta em branco', () => {

    cy.get('.text-blue-600').first().click()
    
    cy.get('#numeroContaField').clear()

    cy.get('button[type="submit"]').click()

    cy.contains('O número da conta é obrigatório').should('be.visible')
    })

    it('3 - Validar edição do nome da pessoa', () => {

    cy.get('.text-blue-600').first().click()
    
    cy.get('#pessoaField').click()

    cy.get('ul li').eq(1).click()

    cy.get('button[type="submit"]').click()

    cy.contains('Conta atualizada com sucesso!').should('be.visible')
    })

     it('4 - Validar edição do número da conta', () => {

    cy.get('.text-blue-600').first().click()
    
    cy.get('#numeroContaField').clear().type(faker.string.numeric(15))

    cy.get('button[type="submit"]').click()

    cy.contains('Conta atualizada com sucesso!').should('be.visible')
    })

      it.only('5 - Validar edição de todos os campos', () => {

    cy.get('.text-blue-600').first().click()
    
    cy.get('#pessoaField').click()

    cy.get('ul li').eq(1).click()
    
    cy.get('#numeroContaField').clear().type(faker.string.numeric(15))

    cy.get('button[type="submit"]').click()

    cy.contains('Conta atualizada com sucesso!').should('be.visible')
    })
})