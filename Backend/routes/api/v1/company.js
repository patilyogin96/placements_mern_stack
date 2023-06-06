const express = require("express");
const router = express.Router();

const companyController = require("../../../controllers/api/v1/company_api");

router.post("/add-company", companyController.addCompany);

module.exports = router;