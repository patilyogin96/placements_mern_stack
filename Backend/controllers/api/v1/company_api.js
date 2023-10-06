const Company = require("../../../models/company");

exports.addCompany = async (req, res, next) => {
  const company_name = req.body.company_name;

  console.log("Yogin");

  try {
    let newCompany = await Company.create({ company_name });

    return res.status(201).json(newCompany);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    let allCompanies = await Company.find({})
      .populate()
      .select("company_name")
      .exec();

    res.status(200).json({ data: allCompanies });
  } catch (error) {}
};
