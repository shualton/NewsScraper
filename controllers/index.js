var router = require("express").Router()

var ApiRoutes = require("./api");
var ViewRoutes = require("./view");


router.use('/api', ApiRoutes);
router.use('/', ViewRoutes);

module.exports = router;