const express = require("express");
const router = express.Router();
const appDb = require("../db/db.apps");
// const appModel = require('../db/models/apps');

router.get("/", (req, res) => {
  console.log("authenticated ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    appDb
      .getUserApps(null)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => console.log(err));
  } else {
    console.log("in /apps", req.body.app);
    appDb
      .getUserApps({ app_name: req.body.app.toLowerCase() })
      .then(data => {
        // console.log('in db',data)
        res.json(data);
      })
      .catch(err => console.log(err));
  }
  // res.json(req.body)
});

module.exports = router;
//req.sessionID
