// importing neccessary modules 
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger, logEvents} = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');
const { error } = require('console');
const mongoose = require('mongoose');
const connectDB = require("./config/connectDB");

const app = express()

// connecting to MongoDB
// connectDB();

// Initializing PORT
const PORT = process.env.PORT || 3500

// custom middleware - logger
app.use(logger);


// built in middleware for handling form data
app.use(express.urlencoded({ extended: false}));

// build in middleware for json
app.use(express.json());


// Cross Origin Resource Sharing (Third Party Middleware)
app.use(cors(corsOptions));


// middleware for css and images(static files)
app.use(express.static(path.join(__dirname, 'public')))

// add api routes
app.use('/employees', require('./routes/api/employees'))

// adding root routes
app.use('/', require('./routes/root'))



app.all('*',(req, res)=>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')){
        res.json({error : "404 not found"});
    } else{
        res.type('txt').send("404 not found");
    }
})

// custom middleware for error Handling
app.use(errorHandler);


// listening to server
app.listen(PORT, ()=> console.log('server running on PORT', PORT));
