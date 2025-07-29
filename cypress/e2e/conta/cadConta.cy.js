import { faker } from '@faker-js/faker'
import { gerarPessoa } from '../../support/utils'

describe ('Cadatro de Conta Bancaria', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.cadPessoa(gerarPessoa())
    })

     it.only('1- Conta já existente', () => {

    const contaDupli = faker.string.numeric(15);

    cy.get('[href="/conta"]').click()
    
    // abre o dropdown
    cy.get('#pessoaField').click()

    // seleciona a lista de opções, clica na opção pelo indice
    cy.get('ul li').eq(0).click()
    cy.get('#numeroContaField').type(contaDupli)
    cy.get('button[type="submit"]').click()

    cy.contains('Conta criada com sucesso!').should('be.visible')

    cy.get('#pessoaField').click()
    cy.get('ul li').eq(0).click()
    cy.get('#numeroContaField').type(contaDupli)
    cy.get('button[type="submit"]').click()

    cy.contains('Conta já cadastrada').should('be.visible')

    })
    
    it('2- Conta criada com sucesso', () => {
   
    cy.get('button[type="submit"]').click()

    cy.get('[href="/conta"]').click()
    
    // abre o dropdown
    cy.get('#pessoaField').click()

    // seleciona a lista de opções, clica na opção pelo indice
    cy.get('ul li').eq(0).click()
    cy.get('#numeroContaField').type(faker.string.numeric(15))
    cy.get('button[type="submit"]').click()

    cy.contains('Conta criada com sucesso!').should('be.visible')
    })

})