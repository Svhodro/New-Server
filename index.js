const express=require("express")
const cors=require('cors')
const app=express()
require('dotenv').config()
const port= 5000

//middelware
const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json())



//mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mj0igoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    // await client.connect();
    //collection 
    const database=client.db('Assingment').collection('tourist') 
    //create
    app.get('/',(req,res)=>{
      res.send('running the server')
  })

    app.get('/insert',async(req,res)=>{
      data={name:"sporsho",
            job:"sorkari",
            index:"data"
    }
      const result=await database.insertOne(data)
      res.send(result)
    }) 

    //read all
    app.get('/Get',async(req,res)=>{
     
      const result=  database.find()
      const resul=await result.toArray()
     res.send(resul)
    })
    //read one
    app.get('/one',(req,res)=>{
     
      const result= database.findOne({
        name:
        "sporsho"})      
       res.send(result)
       console.log(result)
    })
// delete
app.get('/Delete',(req,res)=>{
     
  const result= database.deleteOne({
    name:"sporsho"})      
   res.send(result)
   console.log(result)
})
//update
app.get('/Update',async(req,res)=>{  
  const filter = { name:"sporsho" }
  const update={
    $set:{
      name:"rudro vhodro",
      job:"besorkari"
    }
  }
  const options = { upsert: true };
  const result= await database.updateOne(filter,update,options)      
   res.send(result)
   console.log(result)
})






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); 

app.listen(port,()=>{
    console.log("server is running")
})