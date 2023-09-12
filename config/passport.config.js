const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            cb(null, { accessToken, refreshToken, profile })
        } catch (error) {
            return cb(error);
        }
    }));