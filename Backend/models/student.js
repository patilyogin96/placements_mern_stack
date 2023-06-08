const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    placement_status: {
      type: Number,
      default: 0,
      // 1= placed , 2=not_placed
    },
    course_scores: [
      {
        dsa_final: {
          type: Number,
        },
        web_dev_final: {
          type: Number,
        },
        react_final: {
          type: Number,
        },
      },
    ],
    interview_details: [
      {
        interview: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Interviews",
        },

        interview_date: {
          type: Date,
        },
        results: {
          type: Number,
        },
        // pass , fail , onhold , didnt_attempt
      },
    ],
    user_type: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
