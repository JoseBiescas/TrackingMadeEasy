/*
passport.js

When a user visits a protected route,they will attach their JWT to the HTTP 
Authorization header.

passport-jwt will grab that value and parse it using the 
ExtractJwt.fromAuthHeaderAsBearerToken method.

passport-jwt will take the extracted JWT along with the options
we set an call jsonwebtoken library's verify method.


*/

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model("users");
const keys = require('../config/secrets');
const passport = require('passport');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secreOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};