import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Exclusão de Cadastro de pessoa', () => {

 beforeEach(() => {
   cy.visit('http://localhost:3000/pessoa')
})

  it('1- Validar cancelamento de exclusão', () => {

   const cadNotDel = {
      nameField: faker.person.fullName().replace(/\./g, ''),
      cpfField: generate(),
      enderecoField: faker.location.streetAddress()
    }
   cy.cadPessoa(cadNotDel)

    // Clica no botão de excluir da linha correspondente a essa pessoa
   cy.contains(cadNotDel.nameField)
      .parent() // pega a linha onde o nome está
      .find('.text-red-600')
      .click()

   cy.contains('Cancelar').click()

   cy.contains(cadNotDel.nameField).should('be.visible');
})

  it('2- Validar confirmação de exclusão', () => {

   const cadDel = {
      nameField: faker.person.fullName().replace(/\./g, ''),
      cpfField: generate(),
      enderecoField: faker.location.streetAddress()
    }
   cy.cadPessoa(cadDel)

    // Clica no botão de excluir da linha correspondente a essa pessoa
   cy.contains(cadDel.nameField)
      .parent() // pega a linha onde o nome está
      .find('.text-red-600')
      .click()

   cy.contains('Excluir').click()

   cy.contains(cadDel.nameField).should('not.exist')

   cy.contains('Pessoa excluída com sucesso', {timeout: 1000}).should('be.visible')
})

it('3- Validar exclusão de pessoa conta vinculada', () => {

})

})