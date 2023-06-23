const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;

const { Interviews, AssignInterview } = require("../../../models/interview");
// const AssignInterview = require("../../../models/interview");
const Student = require("../../../models/student");
exports.createInterview = async (req, res, next) => {
  const { title, company, interview_date } = req.body;

  try {
    let newInterview = await Interviews.create({
      title,
      company,
      interview_date,
    });

    res.status(201).json(newInterview);
  } catch (error) {}
};

exports.getAllInterviews = async (req, res, next) => {
  try {
    let allInterviews = await Interviews.find({})
      .populate({
        path: "company",
        select: "company_name -_id", //only sending required keys in company object
      })
      .select("title interview_date")
      .exec();

    res.status(200).json({ data: allInterviews });
  } catch (error) {}
};

exports.assignInterviewToStudent = async (req, res, next) => {
  try {
    let assignedInterview = await AssignInterview.create(req.body);
    // await Company.findOneAndUpdate({_id:req.body.company} , {$addToSet:})
    await Student.findOneAndUpdate(
      { _id: req.body.student },
      { $push: { interview_details: assignedInterview } }
    )
      .populate("interview_details.interview")
      .exec();

    let interviewDetails = await AssignInterview.findById(assignedInterview._id)
      .populate("company", "_id company_name")
      .populate(
        "student",
        "_id first_name last_name email phone college placement_status course_scores"
      )
      .populate("interview", "_id title")
      .exec();
    res.status(200).json(interviewDetails);
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.updateAssignInterviewToStudent = async (req, res, next) => {
  const { results, id } = req.body;

  let updatedInterview = await AssignInterview.findOneAndUpdate(
    { _id: id },
    { $set: { results: results } }
  );
  console.log("CCCCCCCCc", updatedInterview);

  await Student.findOneAndUpdate(
    {
      _id: updatedInterview.student,
      "interview_details._id": new ObjectId(id),
    },
    {
      $set: {
        "interview_details.$.results": results,
      },
    },

    { new: true }
  );

  await Student.findOneAndUpdate(
    {
      _id: updatedInterview.student,
    },
    {
      $set: {
        "placement_status.results": results,
        "placement_status.company": updatedInterview.company,
      },
    },

    { new: true }
  );

  // try {
  //   let assignedInterview = await AssignInterview.create(req.body);
  //   // await Company.findOneAndUpdate({_id:req.body.company} , {$addToSet:})
  //   await Student.findOneAndUpdate(
  //     { _id: req.body.student }, // Assuming the student ID is in req.body.studentId
  //     {
  //       $set: { interview_details: assignedInterview._id }, // Add the assigned interview to interview_details array
  //     }
  //   );
  //   let interviewDetails = await AssignInterview.findById(assignedInterview._id)
  //     .populate("company", "_id company_name")
  //     .populate(
  //       "student",
  //       "_id first_name last_name email phone college placement_status course_scores"
  //     )
  //     .populate("interview", "_id title")
  //     .exec();
  //   res.status(200).json(interviewDetails);
  // } catch (error) {
  //   res.status(200).json(error);
  // }
};
