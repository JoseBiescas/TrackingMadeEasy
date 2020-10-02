require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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
const db = process.env.MONGODB_URI || process.env.ATLAS_URI;

//Connect to db
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false})
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));