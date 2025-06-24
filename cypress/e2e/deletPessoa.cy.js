import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Exclusão de Cadastro de pessoa', () => {
    let pessoa
 beforeEach(() => {
    cy.visit('http://localhost:3000/pessoa')
})

  it('1- Validar cancelamento de exclusão', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-red-600').should('exist')

   cy.get(':nth-child(1) > :nth-child(4) > .text-red-600').click()

   cy.contains('.MuiDialogContent-root > .flex > .bg-blue-600', 'Cancelar').click()

   cy.contains(pessoa.nameField).should('be.visible')

})

})