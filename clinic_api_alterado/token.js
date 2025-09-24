import jwt from "jsonwebtoken";
const SECRET_KEY ="chaveSuperSecreta123456"
const tokens = jwt.sign(
    {id: 1, email: "jhonDo@gmail.com", role: "admin "},
    SECRET_KEY,
    {
        expiresIn: "1h",
    });

    try {
        const decoded = jwt.verify(tokens, SECRET_KEY);
        console.log("Decodificado", decoded);
    } catch(error) { console.error("Token Inválido", error.message); }
