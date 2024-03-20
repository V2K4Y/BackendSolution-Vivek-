const { loginUser, regUser } = require('../controllers/user');

const router = require('express').Router();

router.post('/register', regUser);
router.post('/login', loginUser);

module.exports = router;