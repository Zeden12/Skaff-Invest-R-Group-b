const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const upload = require('../middleware/uploadMiddleware');

router.post(
  '/submit',
  upload.single('resume'),
  careerController.submitApplication
);

router.get(
  '/',
  careerController.getAllApplications
);

module.exports = router;