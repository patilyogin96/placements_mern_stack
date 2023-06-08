const Company = require("../../../models/company");

exports.addCompany = async (req, res, next) => {
  const company_name = req.body.company_name;

  try {
    let newCompany = await Company.create({ company_name });

    return res.status(201).json(newCompany);
  } catch (error) {
    return res.status(400).json(error);
  }
};
