const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    /* res.json({
        posts: {
            title: 'My First Node Application',
            description: 'You can easily see this post with logging in!'
        }
    }) */
    res.send(req.user)
})

module.exports = router;