import mongoose, { Schema } from "mongoose";

const leave_scheme = mongoose.Schema({
  leave_name: {
    type: String,
    enum: ["casual", "sick", "maritial"],
  },
  employee_id: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },

  date_from: {
    type: Date,
  },
  date_to: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

export const leave_model = mongoose.model("Leaves", leave_scheme);
