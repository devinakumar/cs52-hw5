import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './router';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary


// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRouter);

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

// START THE SERVER

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/blog';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;
const port = process.env.PORT || 9090;

app.listen(port);

console.log(`listening on: ${port}`);
