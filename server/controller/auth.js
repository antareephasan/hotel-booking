const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

//Register
exports.signup =  (req, res) => {
    try {
        User.findOne({ email: req.body.email })
            .exec(async (error, usr) => {
                if (usr) return res.status(400).json({
                    message: 'User already registered'
                });

                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(req.body.password, salt);

                const newUser = new User({
                    email: req.body.email,
                    password: hashedPass
                })

                const user = await newUser.save();
                const { password, ...others } = user._doc;
                res.status(200).json({ 
                    user: others
                 });
            });


    } catch (error) {
        res.status(200).json({
            message: "Something went wrong"
        });
    }
}

//login

exports.signin = async (req, res) => {
    try {
        User.findOne({ email: req.body.email })
            .exec(async (error, user) => {
                if (error) return res.status(500).json({ error });
                if (user) {
                    const validated = await bcrypt.compare(req.body.password, user.password);
                    if (!validated) {
                        return res.status(400).json({
                            message: "Wrong credentials"
                        });
                    }
                    const token = jwt.sign({_id: user._id, }, process.env.JWT_SECRET, {expiresIn: '24h'});
                    const { password, ...others } = user._doc;
                    return res.status(200).json({
                        token,
                        user: others
                    });
                } else {
                    res.status(400).json({
                        message: "Wrong credentials"
                    });
                }
            })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}