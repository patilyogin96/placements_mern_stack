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
    },
    placement_status: {
      results: {
        type: Number,
        default: 0,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

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

    interview_details: {
      type: Array,
      default: [],
    },

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
