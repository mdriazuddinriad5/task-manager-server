const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.wz04jag.mongodb.net/?retryWrites=true&w=majority`;

console.log(process.env.USER_DB);
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

        const listCollection = client.db("hotel").collection("list");


        app.post('/toDoList', async (req, res) => {
            const lists = req.body;
            const result = await listCollection.insertOne(lists);
            res.send(result);
        })

        app.get('/toDoList', async(req,res)=>{
            const result = await listCollection.find().toArray();
            res.send(result);
        })


        app.delete('/toDoList/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await listCollection.deleteOne(query);
            res.send(result);
        })


        app.put('/updateTask/:id', async (req, res) => {
            const taskId = req.params.id;
            const updatedTask = req.body;
          
            try {
              const result = await listCollection.updateOne(
                { id: parseInt(taskId) },
                { $set: updatedTask }
              );
          
              res.json({ message: 'Task updated successfully', result });
            } catch (error) {
              console.error('Error updating task:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });

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