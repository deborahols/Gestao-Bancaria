import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

export function formatarCpf(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function gerarPessoa() {
  return {
    nameField: faker.person.fullName().replace(/\./g, ''),
    cpfField: generate(),
    enderecoField: faker.location.streetAddress()
  }
}
