// ----------------------------------
// Mongoose Setup
// ----------------------------------
const mongoose = require("mongoose")
const mongoURL = process.env.MONGO_URL
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const Schema = mongoose.Schema
const ItemSchema = new Schema({
    name: String,
    rarity: String,
    description: String,
    goldPerTurn: Number
})
const Item = mongoose.model("items", ItemSchema)

// ----------------------------------
// Express Setup
// ----------------------------------
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;

// ----------------------------------
// Endpoints
// ----------------------------------
// GET ALL
app.get("/api/items", (req, res) => {
    Item.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (e) => {
            console.log(e)
            res.status(500).send("Error getting items")
        }
    )
})

// TODO: Rename all this to items

// GET ONE
app.get("/api/items/:item_name", (req,res) => {
    res.status(501).send("Not implemented")
})

// INSERT 
app.post("/api/items", (req, res) => {
    res.status(501).send("Not implemented")
})

// UPDATE BY ID
app.put("/api/items/:item_id", (req,res) => {
    res.status(501).send("Not implemented")
})

// DELETE BY ID
app.delete("/api/items/:item_name", (req,res) => {
    res.status(501).send("Not implemented")
})


// ----------------------------------
// Connect to Database & Start Server
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}

mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("Connected successfully to database")
        app.listen(HTTP_PORT, onHttpStart); 
    }
).catch(
    (err) => {
        console.log("Error connecting: " + err)
    }
)