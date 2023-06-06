const Interviews = require("../../../models/interview");
const AssignInterview = require("../../../models/interview");
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

    res.status(200).json(allInterviews);

    console.log("NewCreate", newInterview);
  } catch (error) {}
};

exports.assignInterviewToStudent = async (req, res, next) => {
  console.log("AssignINterview", req.body);
  try {
    let assignedInterview = await AssignInterview.create(req.body);

    let interviewDetails = await AssignInterview.findById(assignedInterview._id)
      .populate("company")
      .populate("student")
      .populate("interview")
      .exec();
    res.status(200).json(interviewDetails);
    console.log("NewCreate", interviewDetails);
  } catch (error) {
    res.status(200).json(error);
  }
};
