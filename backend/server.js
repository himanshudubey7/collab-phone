// backend/server.js

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/phone_directory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const { name, phone } = req.body;
  const newContact = new Contact({ name, phone });
  await newContact.save();
  io.emit('contactAdded', newContact);
  res.json(newContact);
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  io.emit('contactDeleted', id);
  res.json({ success: true });
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
