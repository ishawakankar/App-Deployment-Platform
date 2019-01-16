const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('connect-sid');
    req.logout();
    res.redirect('/');
  });

  module.exports = router;