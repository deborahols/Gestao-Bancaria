import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Edição no Cadastro de pessoa', () => {
 
 beforeEach(() => {
    cy.visit('http://localhost:3000/pessoa')
    cy.cadPessoa()
 })

  it('1- Validar edição com campo Nome em branco', () => {

    // clicando no botão editar
    cy.get('tr', '636.633.697-06').find('button').eq(0).click()

    // limpando campo nome
    cy.get('#nameField').clear()

    // salvando cadastro
    cy.get('button[type="submit"]').click()

    // alerta de obrigatoriedade
    cy.contains('O nome é obrigatório').should('be.visible')
 })

})