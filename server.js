const express = require("express");
const app = express();

app.use(express.json());

// fila de comandos
let queue = [];

// teste de servidor
app.get("/", (req, res) => {
    res.send("API SA-MP ONLINE");
});

// Java envia comando
app.post("/send", (req, res) => {
    if (!req.body) return res.json({ error: "no body" });

    queue.push(req.body);

    console.log("Recebido:", req.body);

    res.json({ ok: true });
});

// Pawn busca comando
app.get("/get", (req, res) => {
    const cmd = queue.shift();

    if (!cmd) {
        return res.json({ action: "none" });
    }

    res.json(cmd);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta " + (process.env.PORT || 3000));
});
