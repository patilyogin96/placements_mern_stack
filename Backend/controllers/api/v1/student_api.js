const Student = require("../../../models/student");

exports.createStudent = async (req, res, next) => {
  console.log("INcommigStudent", req.body);
  try {
    let studentPresent = await Student.findOne({
      email: req.body.email,
      phone: req.body.phone,
    });

    if (!studentPresent) {
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
