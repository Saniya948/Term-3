const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const temperatureRoutes = require('./routes/temperatureRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://saniyarub:saniya_1234@cluster0.i24pdok.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api', temperatureRoutes);

app.listen(5000, () => console.log('server running on port 5000'));