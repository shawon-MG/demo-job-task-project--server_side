const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jshb2ox.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const toDoListCollection = client.db('demo-job-task--project').collection('to-do-lists');

        app.post('/task', async (req, res) => {
            const newTask = req.body;
            console.log(newTask);
            const result = await toDoListCollection.insertOne(newTask);
            res.send(result);
        });

        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = toDoListCollection.find(query);
            const result = await cursor.toArray();

            res.send(result);
        });


    }
    finally {

    }

}
run().catch(console.dir);


// Root API:---------------------------------------------------------
app.get('/', (req, res) => {
    res.send("End Game Task-Project's server is live");
});

app.listen(port, () => {
    console.log("End Game Task-Project is on Port");
});