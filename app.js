const express = require('express');
const cors = require("cors");
const passport = require('passport');
const { google } = require('googleapis');

const prisma = require("./database/db");

const app = express()

app.use(cors());
require("./config/passport.config");

const scope = [
    'profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/contacts',
]

app.get('/google', passport.authenticate('google', { scope: scope }));

app.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async function (req, res) {
        const userData = req.user;

        const email = userData.profile.emails[0].value;

        let user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: profile.displayName,
                    email: email,
                },
            });
        }

        // token
    });

app.get("/contacts", async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI,
    );

    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const people = google.people({ version: 'v1', auth: oauth2Client });

    const contacts = await people.people.connections.list({
        personFields: ['names', 'emailAddresses', 'phoneNumbers'],
        resourceName: 'people/me',
    });

    const connections = contacts.data.connections;

    res.json({ connections })
})


app.listen(3000, () => console.log("listing"));