const express = require("express");
const app = express();

app.use(express.json());

let queue = [];

// Pawn envia comando
app.post("/send", (req, res) => {
    const event = {
        playerid: req.body.playerid || 0,
        action: req.body.action,
        data: req.body.data || ""
    };

    queue.push(event);

    console.log("EVENT:", event);

    res.json({ ok: true });
});

// Android APP só RECEBE comandos
app.get("/get", (req, res) => {
    const event = queue.shift();

    if (!event) {
        return res.json({ action: "none" });
    }

    res.json(event);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("API rodando");
});
