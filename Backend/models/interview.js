const mongoose = require("mongoose");
const Company = require("./company");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    interview_date: {
      // type: Date,
      // default: Date.now,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const assignInterviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviews",
      required: true,
    },
    results: {
      type: Number,
      default: 0,
    },

    // title: {
    //   type: String,
    //   required: true,
    // },
    // company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    // interview_date: {
    //   type: Date,
    //   default: Date.now,
    //   // required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Interviews = mongoose.model("Interviews", interviewSchema);
const AssignInterview = mongoose.model(
  "AssignInterview",
  assignInterviewSchema
);

module.exports = { Interviews, AssignInterview };
// module.exports = AssignInterview;
