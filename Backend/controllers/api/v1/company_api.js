const Company = require("../../../models/company");

exports.addCompany = async (req, res, next) => {
  const company_name = req.body.company_name;
  let newCompany = await Company.create({ company_name });
};
