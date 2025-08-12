import { verificarIndice } from "../src/Atividade/atividade";

describe('indice', () => {
    test(`Verificar indice com ultima posição do array como 5`, () => {
        expect(verificarIndice(5)).toBe("Indice inválida");
    });
});