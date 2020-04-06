const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// routes set up
const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose
    .connect(db)
    .then(() => { console.log('Connected to MongoDB!') })
    .catch(error => { console.log(error) });

//Use Routes
app.use('/api/items', items);

// Serve static assets if in production (deployed)
if(process.env.NODE_ENV === 'production') {
    //set a static folder
    app.use(express.static('client/build'));
    
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

// port set up and connect to hosted server or localhost port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server started on port ${port}`)} );
