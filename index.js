const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;

const client = new MongoClient(uri);
const DB = "membership_managment";
const usersCollection = "users";
const membershipsCollection = "memberships";

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(membershipsCollection)
      .find()
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(membershipsCollection)
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
