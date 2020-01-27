const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running...'));

// Define routes
app.use('/api/location', require('./routes/api/location'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
