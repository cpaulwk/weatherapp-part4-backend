const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Paul:findyourway27%40@cluster0.8zey7ke.mongodb.net/weatherapp-part4';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
