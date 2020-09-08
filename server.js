const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Import routes
const users = require('./routes/users');
const cards = require('./routes/cards');

//Initialize app using Express
const app = express();

//Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
})
);
app.use(bodyParser.json());

//Db 
const db = require('./config/secrets').ATLAS_URI;

//Connect to db
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to database"))
    .catch(err => console.log(err));

//passport middlewate
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/cards', cards);

const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));