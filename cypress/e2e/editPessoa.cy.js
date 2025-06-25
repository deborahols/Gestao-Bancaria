import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'
import { gerarPessoa } from '../support/utils'

describe('Edição no Cadastro de pessoa', () => {

 beforeEach(() => {
   cy.visit('http://localhost:3000/pessoa')
   cy.cadPessoa(gerarPessoa()) // chama o comando personalizado para cadastrar a pessoa no sistema com os dados gerados.
    })

  it('1- Validar edição com campo Nome em branco', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()
   
   cy.get('#nameField').clear('#nameField')

   cy.get('@btnSave').click()

   cy.contains('Nome em branco').should('be.visible')
})

it('2- Validar edição com alteração no nome', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')
   
   cy.get('@btnEdit').click()

   cy.get('#nameField').clear().type('Teste da Silva')

   cy.get('@btnSave').click()

   cy.contains('Pessoa atualizada com sucesso!', {timeout: 1000}).should('be.visible')
})

 it('3- Validar edição com campo CPF em branco', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#cpfField').clear()

   cy.get('@btnSave').click()

   cy.contains('O CPF é obrigatório').should('be.visible')
})

 it('4- Validar edição com alteração no CPF', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#cpfField').clear().type(generate())

   cy.get('@btnSave').click()

   cy.contains('Pessoa atualizada com sucesso!', {timeout: 1000}).should('be.visible')
})

 it('5- Validar edição com campo Endereço em branco', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#enderecoField').clear()

   cy.get('@btnSave').click()

   cy.contains('Endereço em branco').should('be.visible')
})

 it('6- Validar edição com alteração de endereço', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#enderecoField').clear().type(faker.location.streetAddress())

   cy.get('@btnSave').click()

   cy.contains('Pessoa atualizada com sucesso!', {timeout: 1000}).should('be.visible')
})

it('7- Validar edição com todos os campos em branco', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#nameField').clear()
   cy.get('#cpfField').clear()
   cy.get('#enderecoField').clear()
   
   cy.get('@btnSave').click()

   cy.contains('Nome em branco').should('be.visible')
   cy.contains('O CPF é obrigatório').should('be.visible') 
   cy.contains('Endereço em branco').should('be.visible')  
})

 it('8- Validar edição de todos os campos', () => {

   cy.get(':nth-child(1) > :nth-child(4) > .text-blue-600 > [data-testid="EditIcon"]').as('btnEdit')
   cy.get('button[type="submit"]').as('btnSave')

   cy.get('@btnEdit').click()

   cy.get('#enderecoField').clear().type(faker.person.fullName().replace(/\./g, ''))
   cy.get('#enderecoField').clear().type(generate())
   cy.get('#enderecoField').clear().type(faker.location.streetAddress())

   cy.get('@btnSave').click()

   cy.contains('Pessoa atualizada com sucesso!', {timeout: 1000}).should('be.visible')
})

})