const router = require('express').Router();

router.get('/', function(req, res){
    res.json({
        status: "API is working",
        message: "resthub is now accepting requests"
    });
});

module.exports = router;