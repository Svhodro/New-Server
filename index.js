const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 3000;

//middelware
const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors());
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mj0igoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    //collection
    const database = client.db("Assingment").collection("tourist");
    const contryData = client.db("Assingment").collection("contry");
    //create
    app.get("/", (req, res) => {
      res.send("running the server");
    });

    app.post("/insert", async (req, res) => {
      console.log(req.body.users);
      const result = await database.insertOne({
        image: req.body.users.url,

        tourists_spot_name: req.body.users.tourists_spot_name,

        country_Name: req.body.users.country_Name,

        location: req.body.users.location,

        shortdescription: req.body.users.description,

        average_cost: req.body.users.average_cost,
        seasonality: req.body.users.seasonality,

        travel_time: req.body.users.travel_time,

        totaVisitorsPerYear: req.body.users.totaVisitorsPerYear,

        UserEmail: req.body.users.useremail,

        UserName: req.body.users.username,
      });
      res.send(result).status(204);
    });

    app.get("/contry", async (req, res) => {
     
      const result = contryData.find();
      const resul = await result.toArray();
      res.send(resul);
    });




    //read all
    app.get("/Get", async (req, res) => {
      const result = database.find();
      const resul = await result.toArray();
      res.send(resul);
    });
    //read one

    // app.get("/:id", async (req, res) => {
      
    //   let query = {_id: ObjectId(req.params.id)};
    //   let result = await database.findOne(query);
    //   if (!result) res.send("Not found").status(404);
    //   else res.send(result).status(200);
    // });
    // delete
    app.get("/Delete", async (req, res) => {
          const Id=req.body.id
      const result = await database.deleteOne({_id:Id });
      res.send(result);
    });
    //update
    app.get("/Update", async (req, res) => {
      const filter = { _id:req.body.id  };
      const update = {
        $set: {
          name: "rudro vhodro",
          job: "besorkari",
        },
      };
      const options = { upsert: true };
      const result = await database.updateOne(filter, update, options);
      res.send(result);
      console.log(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running");
});
