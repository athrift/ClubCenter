const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');
const Student = require('../models/Student');
const Organization = require('../models/Organization');

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


router.get('/name', (req, res) => {
    const data = {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});

router.post('/save', (req, res) => {
    console.log('Body: ', req.body)

    const data = req.body;

    const newStudent = new Student(data);

    newStudent.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        
        return res.json({
            msg: 'Your data has been saved!'
        });
    });
});

router.post('/test', (req, res) => {
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

module.exports = router;