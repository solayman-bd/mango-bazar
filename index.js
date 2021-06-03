const express = require("express");
const app = express();
const cors = require("cors");
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzyej.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const mangoCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("MangoDetails");

  app.get("/mangoes", (req, res) => {
    mangoCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.post("/mangoes", (req, res) => {
    mangoCollection.insertMany(req.body).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  console.log("database connected");
});
app.listen(process.env.PORT || 5000);
