import { describe, expect, it, jest, test } from "@jest/globals";
import Editora from "../../models/editora.js";

describe('Testando o modelo Editora', () => {
    const objetoEditora = {
        nome: 'CDC',
        cidade: 'Sete Lagoas',
        email: 'sak@cm.com',
    };

    it('Deve instanciar uma nova Editora', () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });

    it.skip('Deve salvar editora no Banco de Dados', () =>{
        const editora = new Editora(objetoEditora);
        
        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('CDC');

        });
    });

    it.skip('Deve salvar no DB usando a sintaxe moderna', async () => {
        const editora = new Editora(objetoEditora);

        const dados = await editora.salvar();

        const retornado = await Editora.pegarPeloId(dados.id);

        expect(retornado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    });

    it('Deve fazer uma chamada simulada no BD', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar = jest.fn().mockReturnValue({
        id: 10,
        nome: 'CDC',
        cidade: 'Sete Lagoas',
        email: 'sak@cm.com',
        created_at: '2022-10-11',
        updated_at: '2022-10-11',
        });

        const retorno = editora.salvar();

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    })
});