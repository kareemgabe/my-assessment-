// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const authRoutes = require('./routes/auth');
// const connectDB = require('./config/db');

// const app = express();
// app.use(bodyParser.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// connectDB();

// app.use('/api/auth', authRoutes);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
