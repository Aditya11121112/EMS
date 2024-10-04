import mongoose, { Schema } from "mongoose";

const salary_schema = mongoose.Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },

  basicPay: {
    type: Number,
  },
  allowance: {
    type: Number,
  },
  deduction: {
    type: Number,
  },
  payDate: {
    type: Date,
  },
  total: {
    type: Number,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});

export const salary = mongoose.model("Salary", salary_schema);
