
const express = require('express');

const router = express.Router();
const passport = require('passport');

let oauth;

router.get('/', passport.authenticate('gitlab'));

router.get('/gitlab', passport.authenticate('gitlab'), (req, res) => {
  const authCode = req.query.code;
  oauth = authCode;
  res.redirect('/#/newapp');
});

module.exports = router;
