const mongoose = require('mongoose');

// MongoDB Connection URI
const uri = 'mongodb+srv://shaz:Shazhebat@onlinegame.n91djcr.mongodb.net/?retryWrites=true&w=majority&appName=OnlineGame';

// Options to pass to MongoDB Driver
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Export mongoose object
module.exports = mongoose;
