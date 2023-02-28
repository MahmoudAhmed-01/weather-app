// Setup empty JS object to act as endpoint for all routes
let weatherdata = {}

// host name and port
const hostname = "localhost";
const port = 5678;

// Express to run server and routes
const express = require("express");
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));



// GET
app.get('/all', function (req, res) {
  res.send(weatherdata)
})

// POST
app.post('/add', function (req, res) {
  weatherdata = req.body;
  console.log(weatherdata)
  res.send(weatherdata)
})




listening = () => console.log(`Server is running at http://${hostname}:${port}/`)
app.listen(port, listening);
