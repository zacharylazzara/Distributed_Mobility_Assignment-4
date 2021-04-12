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
    Item.find().exec().then((results) => {
        console.log(results)
        res.send(results)
    }).catch((e) => {
        console.log(e)
        res.status(500).send("error getting items")
    })
})

// GET ONE
app.get("/api/items/:item_name", (req,res) => {
    Item.findOne(req.params.item_name).exec().then((results) => {
        console.log(results)
        if (results === null) {
            res.status(404).send({msg:`"${req.params.item_name}" not found`})
        } else {
            res.send(results)
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send("error getting items")
    })
})

// INSERT 
app.post("/api/items", (req, res) => {
    if ("name" in req.body && "rarity" in req.body) {
        Item.create([req.body]).exec().then((results) => {
            res.status(201).send({msg:`successfully created ${results}`})
        }).catch((e) => {
            console.log(e)
            res.status(500).send("error creating item")
        })
    } else {
        res.status(401).send({msg:"name and rarity are required"})
    }
})

// DELETE
app.delete("/api/items/:item_name", (req,res) => {
    Item.findOneAndDelete(req.params.item_name).exec().then((results) => {
        if (results === null) {
            res.status(404).send({msg:`"${req.params.item_name}" not found`})
        } else {
            res.send({msg:`successfully deleted ${results}`})
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send("error deleting item")
    })
})

// UPDATE
app.put("/api/items/:item_id", (req,res) => {
    res.status(501).send("not implemented")
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