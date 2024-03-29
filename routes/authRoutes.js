// authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

router.get('/failure', (req, res) => {
    res.send('Something went wrong with authentication...');
});

module.exports = router;
