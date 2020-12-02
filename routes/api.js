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
const validateOrgRegisterInput = require("../validation/org_register");
const validateLoginInput = require("../validation/login");

// Routes

// @route POST api/register
// @desc Register new Student
// @access Public
router.post("/register", (req, res) => {
    const data = req.body;
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("Invalid data");
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

// @route POST api/registerOrg
// @desc Register new Student
// @access Public
router.post("/registerOrg", (req, res) => {
    const data = req.body;
    // Form validation
    const { errors, isValid } = validateOrgRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("Invalid data");
        return res.status(400).json(errors);
    }
    Student.findOne({ orgUser: data.orgUser }).then(user => {
        if (user) {
            console.log("Organization already exists");
            return res.status(400).json({ email: "Organization Email already exists" });
        } else {
            const newOrganization = new Organization({
                orgUser: data.orgUser,
                orgPass: data.orgPass,
                orgName: data.orgName
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newOrganization.orgPass, salt, (err, hash) => {
                    if (err) throw err;
                    newOrganization.orgPass = hash;
                    newOrganization
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const data = req.body;
    const { errors, isValid } = validateLoginInput(data);
    // Check validation
    if (!isValid) {
        console.log("Invalid data");
        return res.status(400).json(errors);
    }
    const username = data.username;
    const password = data.password;
    // Find user by email
    Student.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            console.log("Username does not exist");
            return res.status(404).json({ emailnotfound: "Username does not exist!" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log("User Logged In");
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
                    .json({ passwordincorrect: "Password entered was incorrect!" });
            }
        });
    });
});

module.exports = router;