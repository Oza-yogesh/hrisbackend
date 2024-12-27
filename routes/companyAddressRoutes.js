const express = require('express');
const companyAddressController = require('../controllers/companyAddressController');

const router = express.Router();

router.post('/:companyId', companyAddressController.createCompanyAddress);
router.get('/:companyId', companyAddressController.getCompanyAddress);
router.put('/:companyId', companyAddressController.updateCompanyAddress);
router.delete('/:companyId', companyAddressController.deleteCompanyAddress);

module.exports = router;
