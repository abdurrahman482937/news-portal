const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express")
const cors = require("cors")
require('dotenv').config();

const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xesam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send("News Portal Server Running...")
})

async function run() {
    try {
        await client.connect();
        const db = client.db("news-portal")
        const newsCollection = db.collection("allNews")

        app.get("/all-news", async (req, res) => {
            const query = {}
            const news = await newsCollection.find(query).toArray()
            res.send(news)
        })

    } finally {
    }
}

run().catch(console.dir);
app.listen(port, () => {
    console.log("http://localhost:5000");
})