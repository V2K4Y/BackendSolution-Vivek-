const { getAllRequest, serviceRequest, requestInProgress, requestResolved, getRequestById } = require('../controllers/request');
const { checkAuth } = require('../middlewares/checkAuth');
const { upload } = require('../services/multer');

const router = require('express').Router();

router.get('/requests',checkAuth, getAllRequest);
router.get('/request/:id',checkAuth, getRequestById);
router.post('/send-request', upload.single('doc_file'), serviceRequest);
router.put('/update-in-progress',checkAuth, requestInProgress);
router.put('/update-resolved',checkAuth, requestResolved);

module.exports = router;