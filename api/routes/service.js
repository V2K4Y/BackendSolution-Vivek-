const { checkAuth } = require('../middlewares/checkAuth');

const router = require('express').Router();

router.get('/logout', checkAuth, (req, res) => {
    return res.cookie('rqid', '', { expires: new Date(0) }).status(200).json({msg: "Logged out !"});
})

module.exports = router;