const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
        username,
        email,
        password,
        verified: false,
        verificationCode
    });

    try {
        await user.save();

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Verification email sent.');
        });
    } catch (error) {
        res.status(500).send('Server error. Please try again.');
    }
});

// Verify route
router.post('/verify', async (req, res) => {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });

    if (user && user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        res.status(200).send('Email verified.');
    } else {
        res.status(400).send('Invalid verification code.');
    }
});

// Complete registration route
router.post('/complete-registration', async (req, res) => {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.verified) {
        user.username = username;
        user.password = password;
        await user.save();
        res.status(200).send('Registration complete.');
    } else {
        res.status(400).send('User not verified.');
    }
});

module.exports = router;
