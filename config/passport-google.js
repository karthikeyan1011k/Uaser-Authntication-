const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//for generating random password
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new google auth strategy
passport.use(new googleStrategy({
    //details obtained from google cloud console
    clientID:process.env.PASSPORT_CLINT_ID ,
    clientSecret: process.env.PASSPORT_CLINT_SECRET ,
    callbackURL: process.env.PASSPORT_CALLBACK_URL ,  
 }, function(accessToken, refreshToken, profile, done){
    User.findOne({ email: profile.emails[0].value })
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        })
        .then(user => {
          return done(null, user);
        })
        .catch(err => {
          console.log('Error in creating user ', err);
          return done(err);
        });
      }
    })
    .catch(err => {
      console.log('Error in google strategy passport: ', err);
      return done(err);
    });
  
 }

 ));

 module.exports = passport;