const express = require('express');
const bodyParser = require('body-parser');
const { python } = require('compile-run');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/compile", async (req, res) => {
    try {
        const code = req.body.ScriptContent;

        if (!code) {
            return res.status(400).send('No code provided');
        }

        const result = await python.runSource(code);
        res.json(result);
    } catch (error) {
        res.status(500).send('Error compiling script');
    }
});

const PORT = 1616;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
