import { faker } from '@faker-js/faker'
import { gerarPessoa, gerarConta  } from '../../support/utils'

describe ('Edição de Conta', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/conta')
        cy.cadPessoa(gerarPessoa())
        cy.cadConta(gerarConta())
    })

    it('Validar edição com ', () => {

        cy.get('#pessoaField').click()
    })
})