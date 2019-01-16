const express = require('express');
const router = express.Router();
const passportSetup = require('../authentication/passport')

router.get('/', (req, res) => {
    console.log('inside profile');
    // console.log(res)
    console.log('status');
    console.log(req.isAuthenticated())
    console.log('now data');
   
   
    let testdata = [];
    testdata = passportSetup()._json;
   
    // console.log('test profile', req.body)
   
    if (req.isAuthenticated()) {
      res.json({ testdata, 'status': true });
    }
    else {
      testdata = req.body;
      res.json({ testdata, 'status': false })
    }
  });

  module.exports = router;