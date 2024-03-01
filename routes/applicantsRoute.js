const express = require('express');
const router = express.Router();
const applicantsRoute = require('../controllers/applicantsController')

router.route('/').get(applicantsRoute.getApplicants)
    .post(applicantsRoute.addApplicant)


router.route('/:id').get(applicantsRoute.getApplicant)
    .put(applicantsRoute.editApplicant)
    .delete(applicantsRoute.deleteApplicant)

module.exports = router 