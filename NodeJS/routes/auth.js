const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidate, loginValidate } = require('../validation');


router.post('/register', async (req, res) => {

    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) return res.status(401).send('Sorry! Email already exist...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async (req, res) => {

    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is wrong!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Password!');

    let accessToken = jwt.sign(req.body, "access", { expiresIn: "1s" });
    let refreshToken = jwt.sign(req.body, "refresh", { expiresIn: "30d" });

    const token = jwt.sign({
        email: user.email,
        _id: user._id,
        accessToken,
        refreshToken
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    });
    res.header('auth-token', token).send(token);

    res.send('Logged in!')
});

module.exports = router;