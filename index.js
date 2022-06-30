const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

const cors = require('cors');


app.use(express.json());
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send("End Game Task-Project's server is live");
});

app.listen(port, () => {
    console.log("End Game Task-Project is on Port");
});