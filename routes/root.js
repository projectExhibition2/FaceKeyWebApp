const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views','index.html' ))
});

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views','profile.html' ))
});

router.get('/oldpage', (req, res)=>{
    res.redirect('/contact')
});

router.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname,'..', 'views','contact.html'))
});

router.get('/about', (req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'views', 'about.html'))
});



module.exports = router;