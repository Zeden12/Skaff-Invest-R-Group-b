const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const contactRoutes = require('./routes/contactRoutes');
const careerRoutes = require('./routes/careerRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

connectDB();

app.use('/api/contact', contactRoutes);
app.use('/api/careers', careerRoutes);

app.get('/', (req, res) => {
  res.send('Skaff Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});