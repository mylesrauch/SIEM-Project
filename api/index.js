const express = require('express');
const PORT = 3000
const mongoose = require('mongoose');
const logs = require('./models/logSchema');

const app = express();

// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

// grabbing all logs in DB
app.get('/all-logs', (req, res) => {
  
  console.log(req.rawHeaders);
// search in logs for all "logs" then send logs
  logs.find()
    .then((result) => {
      res.send(result);
      console.log('all-logs get')
    })
    .catch((err) => {
      console.log(err);
    })
})

// test route
app.get('/test', (req,  res) => {
    res.status(200).send({
        test: 'YEETUS',
        test2: 'FETUS'
    })
});

// testing post request
app.post('/log-post-test', (req, res) => {
  console.log(req.body);

  const logit = new logs(req.body);
  
  logit.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});