const { Interviews, AssignInterview } = require("../../../models/interview");
// const AssignInterview = require("../../../models/interview");
const Student = require("../../../models/student");
exports.createInterview = async (req, res, next) => {
  try {
    let newInterview = await Interviews.create(req.body);

    res.status(201).json(newInterview);

  
  } catch (error) {}
};

exports.getAllInterviews = async (req, res, next) => {
  try {
    let allInterviews = await Interviews.find({}).populate("company").exec();

    res.status(200).json(allInterviews);


  } catch (error) {}
};

exports.assignInterviewToStudent = async (req, res, next) => {

  try {
    let assignedInterview = await AssignInterview.create(req.body);

   

    await Student.findOneAndUpdate(
      { _id: req.body.student }, // Assuming the student ID is in req.body.studentId
      {
        $set: { interview_details: assignedInterview._id }, // Add the assigned interview to interview_details array
      }
    );

    let interviewDetails = await AssignInterview.findById(assignedInterview._id)
      .populate("company", "_id company_name")
      .populate(
        "student",
        "_id first_name last_name email phone college placement_status course_scores"
      )
      .populate("interview", "_id")
      .exec();
    res.status(200).json(interviewDetails);
   
  } catch (error) {
    res.status(200).json(error);
  }
};
