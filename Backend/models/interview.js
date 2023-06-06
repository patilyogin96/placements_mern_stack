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
      type: Date,
      default: Date.now,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interviews = mongoose.model("Interviews", interviewSchema);

module.exports = Interviews;
