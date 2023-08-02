const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000

// middle ware
app.use(cors())
app.use(express.json())
// user:task-manager
// pass:zsT3BLEok6coErUD



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5lehpdk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const taskCollection = client.db('taskManager').collection('tasks')

        // ----Data Read operation----//
        app.get('/tasks', async (req, res) => {
            try {
                const result = await taskCollection.find().toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Failed to fetch tasks' });
            }
        });






        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// server test
app.get('/', (req, res) => {
    res.send('Task manager assignment server is running...........')
})

app.listen(port, () => {
    console.log(`Task manager assingment server is running on port:${port}`)
})

