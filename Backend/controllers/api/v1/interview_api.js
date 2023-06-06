const Interviews = require("../../../models/interview");

exports.createInterview = async (req, res, next) => {
  try {
    let newInterview = await Interviews.create(req.body);

    res.status(201).json(newInterview);

    console.log("NewCreate", newInterview);
  } catch (error) {}
};

exports.getAllInterviews = async (req, res, next) => {
  try {
    let allInterviews = await Interviews.find({}).populate("company").exec();

    res.status(200).json(allInterviews)

    console.log("NewCreate", newInterview);
  } catch (error) {}
};
