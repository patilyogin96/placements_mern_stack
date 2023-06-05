const express = require('express')
const router = express.Router();

router.use('/users' , require('./users'))
// router.use('/statement' ,require('./statements'))



module.exports = router;