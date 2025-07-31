import { faker } from '@faker-js/faker'
import { gerarPessoa } from '../../support/utils'

describe ('Cadatro de Conta Bancaria', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.cadPessoa(gerarPessoa())
    })

        it('1- Campos em branco', () => {

            cy.get('[href="/conta"]',).click()
            cy.contains('Cadastro de Conta').should('be.visible')
            cy.get('button[type="submit"]').click()
            cy.contains('A pessoa é obrigatória').should('be.visible')
            cy.contains('O número da conta é obrigatório').should('be.visible')
        })

        it('2- Conta já existente', () => {

            const contaDupli = faker.string.numeric(15);

            cy.get('[href="/conta"]').click()
            cy.contains('Cadastro de Conta').should('be.visible')
            
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
        
        it('3- Conta criada com sucesso', () => {
    
            cy.get('button[type="submit"]').click()
            cy.get('[href="/conta"]').click()
            cy.contains('Cadastro de Conta').should('be.visible')
            
            // abre o dropdown
            cy.get('#pessoaField').click()

            // seleciona a lista de opções, clica na opção pelo indice
            cy.get('ul li').eq(0).click()
            cy.get('#numeroContaField').type(faker.string.numeric(15))
            cy.get('button[type="submit"]').click()

            cy.contains('Conta criada com sucesso!').should('be.visible')
        })

})