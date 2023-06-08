const Student = require("../../../models/student");

exports.createStudent = async (req, res, next) => {
  try {
    let studentPresent = await Student.findOne({
      email: req.body.email,
      phone: req.body.phone,
    });

    if (!studentPresent) {
      const { course_scores, college } = req.body;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const phone = req.body.phone;

      const user_type = req.body.user_type;

      try {
        const newStudent = await Student.create({
          first_name,
          last_name,
          email,
          phone,
          course_scores,
          college,
          user_type,
        });

        let data = {
          message: "Student Created successfully",
          data: {
            newStudent,
          },
        };

        return res.status(201).json(data);
      } catch (error) {
        let data = {
          error,
        };
        return res.status(201).json(data);
      }
    } else {
      let data = {
        message: "Student is already registered",
      };
      return res.status(200).json(data);
    }
  } catch (error) {}
};

exports.getAllStudents = async (req, res, next) => {
  try {
    let allStudents = await Student.find({})
      .populate({
        path: "interview_details ",
        populate: {
          path: "interview",
          select: "_id title interview_date",
        },
      })
      .exec();

    // let allStudents = await Student.find({})
    //   .populate("interview_details")
    //   .exec();

    return res.status(200).json(allStudents);
  } catch (error) {
    return res.status(400).json(error);
  }
};
