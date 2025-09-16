import jsonServer from "json-server";

let server;
const baseUrl = "http://localhost:4000";

beforeAll((done) => {
    const app = jsonServer.create();
    const router = jsonServer.router("db.json");
    const middlewares = jsonServer.defaults();

    app.use(middlewares);
    app.use(router);

    server = app.listen(4000, done);
});

afterAll((done) => {
    server.close(done);
});

// GET Básico
test("GET /equipamentos", async () => {
    const res = await fetch(`${baseUrl}/equipamentos`);
    expect(res.status).toBe(200);
});

// GET Retorna um Array
test("GET /equipamentos ", async () => {
    const res = await fetch(`${baseUrl}/equipamentos`);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
});


// POST Equipamentos
test("POST /equipamentos", async () => {
    const novoEquipamento = { name: "Makita", value: "R$450,00" };
    const res = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEquipamento),
    });
    const data = await res.json();
    expect(data.name).toBe("Makita");
});

// GET Equipametos Por ID
test("GET /equipamentos/:id", async () => {
    const res = await fetch(`${baseUrl}/equipamentos/2`);
    const data = await res.json();
    expect(data).toHaveProperty("id", 2);

});

test("POST /equipamentos", async () => {
    const novoEquipamento = { name: "Makita Premium", value: "R$1000,00"};
    await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(novoEquipamento),
    })
    const res = await fetch(`${baseUrl}/equipamentos`);
    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);
});

// PUT Equipamentos
test("PUT /equipamentos/:id", async () => {
    const res = await fetch(`${baseUrl}/equipamentos/5`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 5,
            name: "Carrinho de Mão",
            value: "R$650,00",
        }),
    });
    const data = await res.json();
    expect(data.name).toBe("Carrinho de Mão");
});

// PATCH Equipamentos
test("PATCH /equipamentos/ID", async () =>{
    const res = await fetch(`${baseUrl}/equipamentos/5`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({value: "R$500,00"}),
    });
    const data = await res.json();
    expect(data.value).toBe("R$500,00");
});

test("DELETE /equipamentos/6", async () => {
    await fetch(`${baseUrl}/equipamentos/6`, { method: "DELETE" });
    const res = await fetch(`${baseUrl}/esquipamentos/6`);
    expect(res.status).toBe(404);
});

test("DELETE /equipamentos/7", async () => {
    await fetch(`${baseUrl}/equipamentos/7`, { method: "DELETE" });
    const res = await fetch(`${baseUrl}/esquipamentos/7`);
    expect(res.status).toBe(404);
});


test("Fluxo Completo REVISADO LIDO ENTENDIDO", async () => {
    // cria
    let res = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Soprador Sthil",
            value: "R$1000,00",
        }),
    });
    let equipamento = await res.json();

    // pega
    res = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`);
    let data = await res.json();
    expect(data).toHaveProperty("name", "Soprador Sthil");

    // deleta
    await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, { method: "DELETE" });
    res = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`);
    expect(res.status).toBe(404);
});