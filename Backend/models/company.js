const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interviews",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
