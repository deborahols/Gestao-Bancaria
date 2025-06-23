import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

function formatarCPF(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

describe('Cadastro de pessoa', () => {
  
  beforeEach(() => {
  cy.visit('http://localhost:3000/pessoa')

  })
  
  it('1- Pessoa criada com sucesso', () => {
    const pessoa = {
      nameField: faker.person.fullName().replace(/\./g, ''),
      cpfField: generate(),
      enderecoField: faker.location.streetAddress()
    }

    cy.cadPessoa(pessoa)

    console.log("qualquer coisa ", pessoa.cpfField)

    cy.url().should('be.equal', 'http://localhost:3000/pessoa')
  
    cy.contains(pessoa.nameField).should('be.visible')
    cy.contains(formatarCPF(pessoa.cpfField)).should('be.visible')
    cy.contains(pessoa.enderecoField).should('be.visible')

    cy.contains('Pessoa criada com sucesso').should('be.visible');
    
  })
})