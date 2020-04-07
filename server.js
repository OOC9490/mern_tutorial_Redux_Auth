const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');


const app = express();

// express Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// connect to Mongo
mongoose
    .connect(db, { useNewUrlParser:true, useCreateIndex: true })
    .then(() => { console.log('Connected to MongoDB!') })
    .catch(error => { console.log(error) });

// Use Routes
// routes set up
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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
