import { Negativo, Positivo } from "../src/positivo.js";


test("confirmação de número positivo", () => {
    expect(Positivo).toBe(1);
  });
test("confirmação de número positivo", () => {
    expect(Negativo((-12))).toBe(-1);
  });