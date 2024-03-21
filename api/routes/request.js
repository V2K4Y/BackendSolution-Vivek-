const { getAllRequest, serviceRequest, requestInProgress, requestResolved, getRequestById, getUserRequest } = require('../controllers/request');
const { checkAuth } = require('../middlewares/checkAuth');
const { upload } = require('../services/multer');

const router = require('express').Router();

router.get('/request',checkAuth, getRequestById);
router.get('/requests',checkAuth, getAllRequest);
router.get('/getUserRequest', checkAuth, getUserRequest)
router.post('/send-request', checkAuth, upload.single('doc_file'), serviceRequest);
router.put('/update-in-progress',checkAuth, requestInProgress);
router.put('/update-resolved',checkAuth, requestResolved);

module.exports = router;