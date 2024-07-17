const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/DB');
const router = require('./Routers/Routers');
const cors = require('cors'); // Use lowercase 'cors'

dotenv.config();

// Connect to the database
ConnectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.set(express.static('./public'))
app.use('/public',express.static('public'))

const PORT = process.env.PORT || 8000;

// Routes
app.use('/api/v8', router);

app.get('/', (req, res) => {
    res.send('Hello World hitesh');
});

// Start the server
app.listen(8000, () => {
    console.log(`Server is running on port ${PORT}`);
});
