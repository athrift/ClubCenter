const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const BlogPost = require('../models/blogPost');
const Student = require('../models/Student');
const Organization = require('../models/Organization');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Routes

// Setting up Demo Routes 

router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });

    Student.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
    Organization.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

// router.get('/login', controllers.getStudentByEmail)


// router.post('/register', (req, res) => {
//     console.log('Body: ', req.body)
//     const data = req.body;
//     const newStudent = new Student(data);

//     newStudent.save((error) => {
//         if (error) {
//             res.status(500).json({ msg: 'Sorry, internal server errors' });
//             return;
//         }
//         return res.json({
//             msg: 'Your data has been saved!'
//         });
//     });
// });

// @route POST api/register
// @desc Register new Student
// @access Public
router.post("/register", (req, res) => {
    const data = req.body;
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("DUMB");
        return res.status(400).json(errors);
    }
    Student.findOne({ username: data.username }).then(user => {
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newStudent = new Student({
                name: data.name,
                username: data.username,
                password: data.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newStudent.password, salt, (err, hash) => {
                    if (err) throw err;
                    newStudent.password = hash;
                    newStudent
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/registerOrg', (req, res) => {
    console.log('Body: ', req.body)
    const data = req.body;
    const newOrg = new Organization(data);

    newOrg.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!'
        });
    });


});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    Student.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;