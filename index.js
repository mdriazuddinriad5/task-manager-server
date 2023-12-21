const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.wz04jag.mongodb.net/?retryWrites=true&w=majority";

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

        console.log("Pinged your deployment. You successfully connected to MongoDB!");



        
    } finally {
        
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Task is running')
})


app.listen(port, () => {
    console.log(`Task is running on ${port}`);
})