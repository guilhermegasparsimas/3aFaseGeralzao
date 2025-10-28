import jsonServer from "json-server";

let server;
const baseUrl = "http://localhost:3000"

beforeAll((done) => {
    const app = jsonServer.create();
    const router = jsonServer.router("db.json");
    const middlewares = jsonServer.defaults();

    app.use(middlewares);
    app.use(router);

    server = app.listen(4000, done)
});

afterAll((done) => {
    server.close(done);
})

test("app.get(/users)", async () => {
    const res = await fetch(`${baseUrl}/users`);
    expect.(res.status).toBe(200);
});

test("app.get(/users)", async () => {
    const res = await fetch(`${baseUrl}/users`);
    const data = await res.json();
    expect.(Array.isArray(data)).toBe(true);
})