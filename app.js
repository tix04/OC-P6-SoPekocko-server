/*****************These are the info required to connect to the mongo DB Database on mongo DB Atlas *******************/

//SRV Url: mongodb+srv://AJ_OCWDP6:<password>@sopekockoocp6.klqdq.mongodb.net/<dbname>?retryWrites=true&w=majority
//ClusterName: soPekockoOCP6
//UserName: AJsopekocko4
//Password: newPass4
//Database Name: soPekocko


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://AJsopekocko4:newPass4@sopekockoocp6.klqdq.mongodb.net/soPekocko?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
})
.catch((error) => {
  console.log('Unable to connect to Mongo DB Atlas');
  console.error(error);
});

app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);



module.exports = app;