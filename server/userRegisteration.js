import { user_model } from "./models/user.model.js";
import bcrypt from "bcrypt";

const register_user = async (req, res) => {
  const hashed_password = await bcrypt.hash("admin", 10);

  user_model.create({
    name: "aditya",
    email: "aditya@gmail.com",
    password: hashed_password,
    role: "employee",
  });
};

export { register_user };
