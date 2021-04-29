const express = require('express');
const PORT = 3000
const mongoose = require('mongoose');
const logs = require('./models/logSchema'); // Grabs the MongoDB schema 


const cors = require('cors'); // This is required when using Cross Origin 

const app = express();

// Middleware

// This will enable Cross Origin
app.use(cors('*'));

// This is another way to enable Cross Origin
//app.use(function (req, res, next) {
//  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.use(express.urlencoded({ extended: true }));


// Try connecting to database

mongoose.connect('mongodb://localhost/siemdb', {  useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000)
    console.log(`it's alive on http://localhost:${PORT}`)
    console.log('connected to db!')
  })
  .catch((err) => {
    console.log(err);
  });

const logRoute = require('./routes/logs');
app.use('/logs', logRoute)

const dummyRoute = require('./routes/dummy');
app.use('/dummy', dummyRoute)

const dummy2Route = require('./routes/dummy2');
app.use('/dummy2', dummy2Route)

// Testing saving to DB

app.get('/add-log', (req, res) => {
  // logdoc variable = new item in logs
  const logdoc = new logs({
    Host: 'Test Log',
    Description: 'Test Log'
  });
  // save to DB and send saved data
  logdoc.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})


// Grabbing all logs in DB

app.get('/all-logs', (req, res) => {
  
  console.log(req.rawHeaders);
// search in logs for all "logs" then send logs
  logs.find()
    .then((result) => {res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});


// Test route

app.get('/test', (req,  res) => {
    res.status(200).send({
        test: 'YEETUS',
        test2: 'FETUS'
    })
});


// Testing post request

app.post('/log-post-test', (req, res) => {
  console.log(req.body);

  const logit = new logs(req.body); // 
  
  logit.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});