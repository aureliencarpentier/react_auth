const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

// VALIDATION

router.post('/register', async (req, res) => {
    // LETS VALIDATE
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // CHECK IF USER ALREADY EXISTS
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('User already exists');

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // VALIDATE
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');

    // CHECK PASSWORD CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // CREATE AND ASSIGN TOKEN
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({data: token});
});

module.exports = router;
