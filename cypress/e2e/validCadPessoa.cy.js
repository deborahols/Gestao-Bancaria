import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Validações no Cadastro de Pessoa', () => {
 
 beforeEach(() => {
    cy.visit('http://localhost:3000/pessoa')
 })

  it('1- Validar cadastro de pessoa com campo Nome vazio', () => {
     const emptyName = {
       cpfField: generate(),
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#cpfField')
        .type(emptyName.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(emptyName.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('Nome em branco').should('be.visible')
 })

   it('2- Validar cadastro de pessoa com campo Nome preenchido com espaço', () => {
     const spaceName = {
       cpfField: generate(),
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#nameField')
        .type(' ')
        .should('be.visible')
    cy.get('#cpfField')
        .type(spaceName.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(spaceName.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('Nome em branco').should('be.visible')
 })

 it('3- Validar preenchimento com Nome acima do limite', () => {
    const bigName = {
       nameField: faker.string.alpha(256),
       cpfField: generate(),
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#nameField')
        .type(bigName.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(bigName.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(bigName.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('O nome deve ter no mínimo 256 caracteres').should('be.visible')
 })

 it('4- Validar cadastro com campo CPF vazio', () => {
   const emptyCpf = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#nameField')
        .type(emptyCpf.nameField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(emptyCpf.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('O CPF é obrigatório').should('be.visible')
 })

 it('5- Validar cadastro com CPF inválido', () => {
   const invalidCpf = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       cpfField: "00000000000",
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#nameField')
        .type(invalidCpf.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(invalidCpf.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(invalidCpf.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('CPF inválido').should('be.visible')
 })

 it('6- Validar cadastro com CPF de 10 digitos', () => {
   const invalidCpf = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       cpfField: "9678726300",
       enderecoField: faker.location.streetAddress()
    }

    cy.get('#nameField')
        .type(invalidCpf.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(invalidCpf.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(invalidCpf.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('CPF inválido').should('be.visible')
 })

 it('7- Validar cadastro com campo Endereço vazio', () => {
   const emptyAdress = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       cpfField: generate(),
    }

    cy.get('#nameField')
        .type(emptyAdress.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(emptyAdress.cpfField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('Endereço em branco').should('be.visible')
 })

  it('8- Validar cadastro com campo Endereço preenchido com espaço', () => {
   const spaceAdress = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       cpfField: generate(),
    }

    cy.get('#nameField')
        .type(spaceAdress.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(spaceAdress.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(' ')
        .should('be.visible')    

    cy.get('button[type="submit"]').click()

    cy.contains('Endereço em branco').should('be.visible')
 })

   it('9- Validar preenchimento com Endereço acima do limite', () => {
    const bigAdress = {
       nameField: faker.person.fullName().replace(/\./g, ''),
       cpfField: generate(),
       enderecoField: faker.string.alpha(256)
    }

    cy.get('#nameField')
        .type(bigAdress.nameField)
        .should('be.visible')
    cy.get('#cpfField')
        .type(bigAdress.cpfField)
        .should('be.visible')
    cy.get('#enderecoField')
        .type(bigAdress.enderecoField)
        .should('be.visible')

    cy.get('button[type="submit"]').click()

    cy.contains('O endereço deve ter no mínimo 256 caracteres').should('be.visible')
 })

 it('10- Validação de duplicidade', () => {

    const pessoaDupli = {
        nameField: faker.person.fullName().replace(/\./g, ''),
        cpfField: generate(),
        enderecoField: faker.location.streetAddress()
  };
    // cadastro
    cy.get('#nameField').type(pessoaDupli.nameField);
    cy.get('#cpfField').type(pessoaDupli.cpfField);
    cy.get('#enderecoField').type(pessoaDupli.enderecoField);
    cy.get('button[type="submit"]').click();

    cy.contains('Pessoa criada com sucesso').should('be.visible');
  
    // cadastro duplicado
    cy.get('#nameField').type(pessoaDupli.nameField);
    cy.get('#cpfField').type(pessoaDupli.cpfField);
    cy.get('#enderecoField').type(pessoaDupli.enderecoField);
    cy.get('button[type="submit"]').click();

    cy.contains('CPF já cadastrado').should('be.visible');
   
})

})
