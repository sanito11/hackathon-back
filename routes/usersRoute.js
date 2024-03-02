const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')


router.route('/').get(usersController.getUsers)
    .post(usersController.addUser)


router.route('/:id').get(usersController.getUser)
    .put(usersController.editUser)
    .delete(usersController.deleteUser)


module.exports = router