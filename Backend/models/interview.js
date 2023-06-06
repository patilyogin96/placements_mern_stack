const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    interview_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interviews = mongoose.model("Interviews", interviewSchema);

module.exports = Interviews;
