const dotenv = require("dotenv");
dotenv.config(); // Put 'At The Top' first to the environmental variable configuration.

const express = require("express");
const app = express();
const mongoose =require('mongoose')
const url = process.env.MONGO_URL; //CONNECT through URL
const cors=require('cors')

const cookieParser=require('cookie-parser')  //cookie-parser interect with cookies

app.use(cors())
app.use(express.json())  //This middleware automatically converts the JSON string into a JavaScript object


app.use(express.urlencoded({extended:true})) //It converts the form data into a JavaScript object
app.use(cookieParser())



mongoose.connect(url)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Your code for successful connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    // Your error handling code
  });

  




app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
