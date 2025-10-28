import express from 'express';

const app = express()
app.use(express.json())

app.listen(300, () => console.log("Api rodando"))