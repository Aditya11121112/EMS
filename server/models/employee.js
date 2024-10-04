import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  employeeId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  maritalStatus: { type: String, enum: ["single", "married"], required: true },
  designation: { type: String, required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "depart",
    required: true,
  },
  salary: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employee", "admin"], required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const employee_model = mongoose.model("Employee", employeeSchema);
