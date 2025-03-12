
// const express = require('express');
// const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb'); // Import ObjectId here
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Configuration
// const uri = "mongodb+srv://mern-book-store:0912778190@cluster0.j1v99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         const bookCollections = client.db("BookInventory").collection("Books");

//         // Insert a book to db: Post Method
//         app.post("/upload-book", async (req, res) => {
//             const data = req.body;
//             const result = await bookCollections.insertOne(data);
//             res.send(result);
//         });

//         // Get all books & find by a category from db
//         app.get("/all-books", async (req, res) => {
//             let query = {};
//             if (req.query?.category) {
//                 query = { category: req.query.category };
//             }
//             const result = await bookCollections.find(query).toArray();
//             res.send(result);
//         });

//         // Update a book method
//         app.patch("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const updateBookData = req.body;
//             const filter = { _id: new ObjectId(id) }; // Fix: Use ObjectId correctly here
//             const updatedDoc = {
//                 $set: {
//                     ...updateBookData
//                 }
//             };
//             const options = { upsert: true };

//             // Update now
//             const result = await bookCollections.updateOne(filter, updatedDoc, options);
//             res.send(result);
//         });

//         // Delete an item from db
//         app.delete("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) }; // Fix: Use ObjectId correctly here
//             const result = await bookCollections.deleteOne(filter);
//             res.send(result);
//         });

//         // Get a single book data
//         app.get("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) }; // Fix: Use ObjectId correctly here
//             const result = await bookCollections.findOne(filter);
//             res.send(result);
//         });

//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }

// run().catch(console.dir);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// middlewear 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// mongodb confiq here
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:0912778190@cluster0.j1v99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const bookCollections = client.db("BookInventory").collection("Books");


        // insert a book to db: Post Method
        app.post("/upload-book", async (req, res) => {
            const data = req.body;
            // console.log(data);
            const result = await bookCollections.insertOne(data);
            res.send(result);
        })

        // // get all books from db
        // app.get("/all-books", async (req, res) => {
        //     const books = bookCollections.find();
        //     const result = await books.toArray();
        //     res.send(result)
        // })

        // get all books & find by a category from db
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result)
        })

        // update a books method
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateBookData
                }
            }
            const options = { upsert: true };

            // update now
            const result = await bookCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // delete a item from db
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.deleteOne(filter);
            res.send(result);
        })


        // get a single book data
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.findOne(filter);
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})