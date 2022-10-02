// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const jwt = require('jsonwebtoken');

// //Register
// exports.signup =  (req, res) => {
//     try {
//         User.findOne({ email: req.body.email })
//             .exec(async (error, usr) => {
//                 if (usr) return res.status(400).json({
//                     message: 'User already registered'
//                 });

//                 const salt = await bcrypt.genSalt(10);
//                 const hashedPass = await bcrypt.hash(req.body.password, salt);

//                 const newUser = new User({
//                     email: req.body.email,
//                     password: hashedPass
//                 })

//                 const user = await newUser.save();
//                 const { password, ...others } = user._doc;
//                 res.status(200).json({ 
//                     user: others
//                  });
//             });


//     } catch (error) {
//         res.status(200).json({
//             message: "Something went wrong"
//         });
//     }
// }