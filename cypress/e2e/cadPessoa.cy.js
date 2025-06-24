import { faker } from '@faker-js/faker' // biblioteca para gerar dados aleatórios e realistas (nomes, endereços, e-mails etc.)
import { generate } from 'gerador-validador-cpf' // função da biblioteca que cria um CPF válido e formatado.
import { formatarCpf } from '../support/utils' // função para formatar o CPF com máscara e possibilitar ser encontrado no should

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

    cy.url().should('be.equal', 'http://localhost:3000/pessoa')
  
    cy.contains(pessoa.nameField).should('be.visible')
    cy.contains(formatarCpf(pessoa.cpfField)).should('be.visible')
    cy.contains(pessoa.enderecoField).should('be.visible')

    cy.contains('Pessoa criada com sucesso').should('be.visible');
    
  })
})