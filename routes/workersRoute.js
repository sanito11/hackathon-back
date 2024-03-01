const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workersController')

router.route('/').get(workersController.getWorkers)
    .post(workersController.addWorker)

router.route('/:id').get(workersController.getWorker)
    .put(workersController.editWorker)
    .delete(workersController.deleteWorker)


module.exports = router