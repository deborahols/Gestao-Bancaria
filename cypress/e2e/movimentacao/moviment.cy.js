import { faker } from '@faker-js/faker'
import { gerarPessoa, gerarConta  } from '../../support/utils'

describe('Cadastro de movimentação', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pessoa')
        cy.cadPessoa(gerarPessoa())
        cy.cadConta(gerarConta())
    })

        it('1- Movimentação com campos em branco', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('button[type="submit"]').click()

            cy.contains('A pessoa é obrigatória').should('be.visible')
            cy.contains('A Conta é obrigatória').should('be.visible')
            cy.contains('Tipo Movimentação é obrigatório').should('be.visible')
            cy.contains('Valor é obrigatório').should('be.visible')
        })

        it('2- Deposito cadastrado com sucesso', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('#pessoaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#numeroContaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#tipoField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#valorField').type(faker.string.numeric(6))
            cy.get('button[type="submit"]').click()

            cy.contains('Movimentacão criada com sucesso!').should('be.visible')
        })

        it('3- Saque realizado com sucesso', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('#pessoaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#numeroContaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#tipoField').click()
            cy.get('ul li').eq(2).click()
            cy.get('#valorField').type(faker.string.numeric(5))
            cy.get('button[type="submit"]').click()

            cy.contains('Movimentacão criada com sucesso!').should('be.visible')
        })

        it('4 - Saque maior do que o valor em conta', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('#pessoaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#numeroContaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#tipoField').click()
            cy.get('ul li').eq(2).click()
            cy.get('#valorField').type(faker.string.numeric(7))
            cy.get('button[type="submit"]').click()

            cy.contains('Saldo insuficiente para saque.').should('be.visible')
        })

        it('5 - Consulta de Extrato de depositos', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('#pessoaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#numeroContaField').click()
            cy.get('ul li').eq(1).click()

            cy.get('table').contains('R$').should('exist')
        })

        it('6 - Consulta de Extrato de saques', () => {

            cy.get('[href="/movimentacao"]',).click()

            cy.contains('Cadastro de Movimentação').should('be.visible')

            cy.get('#pessoaField').click()
            cy.get('ul li').eq(1).click()
            cy.get('#numeroContaField').click()
            cy.get('ul li').eq(1).click()
            
            cy.get('table').contains('-R$').should('exist')
        })

})