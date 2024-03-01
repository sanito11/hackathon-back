const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController')

router.route('/').get(jobsController.getJobs)
    .post(jobsController.addJob)

router.route('/:id').get(jobsController.getJob)
    .put(jobsController.editJob)
    .delete(jobsController.deleteJob)


module.exports = router