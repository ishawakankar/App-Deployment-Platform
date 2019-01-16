const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //   console.log(req.params.name);
    //   res.send("file is being downloaded")
    console.log('-------------------------------------------------')
    console.log(req)
    console.log('req.params is : ', req.params);
    console.log('req.params.name is : ', req.params.name);
    res.download(`logs/${req.params.name}.log`);
  });

  
  module.exports = router;