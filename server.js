const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetHistoryRoutes = require('./routes/assetHistoryRoutes');
const statsRoute = require('./routes/statsRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.use(cors({ origin: 'http://localhost:5000' })); // Set CORS to allow requests from frontend
  app.use(express.json());

  // Register routes
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/assets', assetRoutes);
  app.use('/assetHistory', assetHistoryRoutes);
  app.use('/stats', statsRoute); // Use the new route

  // Test CORS route
  app.get('/test-cors', (req, res) => {
    res.send('CORS is working!');
  });

  app.get('/', (req, res) => {
    res.send('Asset Tracking and Management API');
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  app.set('socketio', io);
});
