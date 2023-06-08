const { Interviews, AssignInterview } = require("../../../models/interview");
const Student = require("../../../models/student");
const Company = require("../../../models/company");
exports.createInterview = async (req, res, next) => {
  const { title, company, interview_date } = req.body;

  console.log("intBobody", req.body);
  try {
    let newInterview = await Interviews.create({
      title,
      company,
      interview_date,
    });

  

    return res.status(201).json(newInterview);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllInterviews = async (req, res, next) => {
  try {
    let allInterviews = await Interviews.find({}).populate("company").exec();

    return res.status(200).json(allInterviews);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.assignInterviewToStudent = async (req, res, next) => {
  console.log("AssignINterview", req.body);
  try {
    let assignedInterview = await AssignInterview.create(req.body);
      // await Company.findOneAndUpdate({_id:req.body.company} , {$addToSet:})
      await Student.findOneAndUpdate(
        { _id: req.body.student },
        { $addToSet: { interviews: assignedInterview._id } }
      );

    let interviewDetails = await AssignInterview.findById(assignedInterview._id)
      .populate("company", "_id company_name")
      .populate(
        "student",
        "_id first_name last_name email phone college placement_status course_scores interview_details"
      )
      .populate("interview", "_id title")
      .exec();
    res.status(200).json(interviewDetails);
    console.log("NewCreate", interviewDetails);
  } catch (error) {
    res.status(200).json(error);
  }
};
