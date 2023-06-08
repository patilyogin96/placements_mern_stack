const mongoose = require("mongoose");
const Company = require("./company");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
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
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviews",
    },
  },
  {
    timestamps: true,
  }
);

const AssignInterview = mongoose.model(
  "AssignInterview",
  assignInterviewSchema
);

const Interviews = mongoose.model("Interviews", interviewSchema);

module.exports = {Interviews , AssignInterview };

