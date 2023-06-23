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
          newStudent,
        };

        return res.status(201).json(data);
      } catch (error) {
        let data = {
          error,
        };
        return res.status(400).json(data);
      }
    } else {
      let data = {
        message: "Student is already registered",
      };
      return res.status(400).json(data);
    }
  } catch (error) {}
};

exports.getAllStudents = async (req, res, next) => {
  const searchQuery = req.query.q;
  const page = req.query.page || 1;
  // total records in one page
  const limit = req.query.limit || 10;
  console.log("requestQuery", searchQuery);
  try {
    const total_count = await Student.countDocuments({
      $or: [
        {
          first_name: { $regex: searchQuery ? searchQuery : "", $options: "i" },
        },
      ],
    });

    let allStudents = await Student.find({
      $or: [
        {
          first_name: { $regex: searchQuery ? searchQuery : "", $options: "i" },
        },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "placement_status.company", select: "id company_name" })
      .populate({
        path: "interview_details",
        setect: "interview",
      })
      .exec();

    // let allStudents = await Student.find({})
    //   .populate("interview_details")
    //   .exec();
    // returning with paginations details
    return res.status(200).json({
      total_count,
      page_number: page,
      page_size: limit,
      data: allStudents,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
