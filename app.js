// Boiler Plate App Set Up
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

// Test URI access
console.log(process.env.MONGO_URI)

const mongoose = require('mongoose')
//Connect to Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Test for successful connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors())
app.use(express.static('public'))

// Serve Static File 
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// });

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port 3000')
})

//Poem Model + Schema
const PoemSchema = new mongoose.Schema({
  title: String,
  author: String,
  poem: String,
  source: String,
  book: String,
  publisher: String,
  year: Number,
  image: String,
  video: String,
});

const Poem = mongoose.model("Poem", PoemSchema);


// Read
// https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
app.get('/poems', async (request, response) => {
    const poems = await Poem.find({})
    // get all objects within our poems collection
    // send back to visitor as json
    try {
      //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
      response.send(poems);
    } catch (error) {
      //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
      response.status(500).send(error);
    }
});

// Create 
//Quick Note on RESTful routes: https://medium.com/@shubhangirajagrawal/the-7-restful-routes-a8e84201f206
app.post("/poems", bodyParser.urlencoded({ extended: false }), async (request, response) => {
  console.log(request.body)
  const poem = new Poem(request.body);
  console.log(poem)
  try {
    await retreater.save();
    response.send(poem);
  } catch (error) {
    response.status(500).send(error);
  }
});