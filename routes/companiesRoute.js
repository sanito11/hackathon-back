const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController')


router.route('/').get(companiesController.getCompanies)
    .post(companiesController.addCompany)

router.route('/:id').get(companiesController.getCompany)
    .put(companiesController.editCompany)
    .delete(companiesController.deleteCompany)


module.exports = router