const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function connectDB(uri = MONGO_URI) {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  connectDB()
    .then(() => {
      console.log('✅ Connected to MongoDB');
      app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

module.exports = { app, connectDB };
