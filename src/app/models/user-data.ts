
export interface Endereco {
    numero: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export interface UserData {
    endereco: Endereco;
    _id: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    crp: string;
    dataNascimento: string;
    email: string;
    senha: string;
    valorConsultaPadrao: string;
    __v: number;
    chavePix: string;
}
