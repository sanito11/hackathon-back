const express = require('express');
const router = express.Router();
const applicationsRoute = require('../controllers/applicationsController')

router.route('/').get(applicationsRoute.getApplications)
    .post(applicationsRoute.addApplication)

router.route('/:id').get(applicationsRoute.getApplication)
    .put(applicationsRoute.editApplication)
    .delete(applicationsRoute.deleteApplicantion)

module.exports = router