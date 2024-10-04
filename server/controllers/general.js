import express from "express";
import jwt from "jsonwebtoken";
import { user_model } from "../models/user.model.js";
import multer from "multer";
import bcrypt from "bcrypt";
import { depart_model } from "../models/department.js";
import { employee_model } from "../models/employee.js";
import { salary } from "../models/salary.js";
import { auth } from "./auth.js";
import { leave_model } from "../models/leave.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // user login functionlaity

  await user_model
    .findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.json({ success: false, message: "user not found " });
      }

      // console.log("database password", user.password);
      // console.log("user enter password", await bcrypt.hash(password, 10));
      const check_pass = await bcrypt.compare(password, user.password);

      if (!check_pass) {
        return res.json({ success: false, message: "password not match " });
      }

      if (email != user.email) {
        return res.json({ success: false, message: "email incorrect " });
      }

      const token = jwt.sign(
        { name: user.name, role: user.role, id: user._id },
        "adi",
        {
          expiresIn: "2d",
        }
      );
      // console.log("dsf", user);

      const { password: _, ...userWithoutPassword } = user;

      return res.json({
        message: "all thing are okay in login",
        success: true,
        user: userWithoutPassword,
        token,
      });
    })
    .catch((error) => {
      return res.json({
        message: "error in login api",
        success: false,
        error: error.message,
      });
    });
});

router.post("/add-department", async (req, res) => {
  const { dep_name, dep_desc } = req.body;

  if (!dep_name || !dep_desc) {
    return res.json({
      success: false,
      message: "dep_name and dep_desc needed ",
    });
  }

  depart_model
    .create({
      dep_name,
      dep_desc,
    })
    .then((data) => {
      res.json({
        success: true,
        message: "department created succcesfullly",
        user: data,
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: "error in department catch blockk in backend ",
        error: err.message,
      });
    });
});

router.get("/get-department", async (req, res) => {
  depart_model
    .find()
    .then((data) => {
      return res.json({
        message: "get all the depart",
        success: true,
        user: data,
      });
    })
    .catch((err) => {
      return res.json({
        message: "catch error in backemd get dept ",
        error: err.message,
      });
    });
});

router.put("/edit-department/:id", async (req, res) => {
  const newID = req.params.id;
  const { dep_name, dep_desc } = req.body;
  const data = await depart_model.findById(newID);
  if (!data) {
    return res.json({
      message: "not recve data in edit backend ",
      success: false,
    });
  }

  data.dep_name = dep_name;
  data.dep_desc = dep_desc;
  const newdata = data.save();
  res.json({ message: "edit succesfullt", success: true, user: newdata });
});

router.delete("/delete-department/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      message: "id is not provided by frontend",
      success: false,
    });
  }

  await depart_model
    .findByIdAndDelete(id)
    .then((data) => {
      return res.json({
        message: "user is delete succefully ",
        success: true,
        user: data,
      });
    })
    .catch((error) => {
      return res.json({
        message: "error in catch delete api",
        error: error.message,
      });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add-employee", upload.single("image"), async (req, res) => {
  const {
    employeeId,
    email,
    gender,
    maritalStatus,
    designation,
    departmentId,
    salary,
    password,
    role,
    dob,
  } = req.body;

  const filename = req.file.filename;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await user_model.create({
      name: employeeId,
      email: email,
      password: hashedPassword,
      profile_image: filename,
      role: role,
    });

    const new_user = await user.save();

    const employee = await employee_model.create({
      userId: new_user._id,
      employeeId: employeeId,
      email: email,
      dob: dob,
      gender: gender,
      maritalStatus: maritalStatus,
      designation: designation,
      departmentId: departmentId,
      salary: salary,
      password: hashedPassword,
      role: role,
      image: filename,
    });

    employee.save();

    res.json({
      message: "employee created succesfully",
      success: true,
      user: employee,
    });
  } catch (error) {
    res.json({
      message: "error in employee get api",
      error: error.message,
      success: false,
    });
  }
});

router.get("/get-employees", async (req, res) => {
  try {
    const data = await employee_model
      .find()
      .populate("userId")
      .populate("departmentId");

    res.json({ success: true, message: "get all employess", data: data });
  } catch (error) {
    res.json({ success: false, message: "not get data" });
  }
});

router.get("/get-employee-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employee_model
      .findOne({ _id: id })
      .populate("userId", { password: 0 })
      .populate("departmentId");
    res.json({ message: "employee fetch ", success: true, employee: employee });
  } catch (error) {
    res.json({ message: "error in get employee by id", success: false });
  }
});

router.put("/update-employee/:id", async (req, res) => {
  const { id } = req.params;
  const { salary, dob, maritalStatus, departmentId } = req.body;

  try {
    const data = await employee_model.findOne({ _id: id });
    data.salary = salary;
    data.departmentId = departmentId;
    data.dob = dob;
    data.maritalStatus = maritalStatus;
    data.save();
    res.json({
      message: "employee edit succesfully",
      success: true,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "error in update employee",
      error: error.message,
      sucess: false,
    });
  }
});

router.delete("/delete-employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the employee data, including the related user
    const employee_data = await employee_model
      .findOne({ _id: id })
      .populate("userId");

    // If the employee exists
    if (employee_data) {
      // Delete the user if userId exists
      if (employee_data.userId) {
        await user_model.findByIdAndDelete(employee_data.userId._id);
      }

      // Delete the employee entry from the employee table
      await employee_model.findByIdAndDelete(id);

      res.json({
        message: "Employee and associated user deleted successfully",
        success: true,
      });
    } else {
      res.status(404).json({ message: "Employee not found", success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
      success: false,
    });
  }
});

router.get("/get-employees-dept", async (req, res) => {
  const { departmentId } = req.query;

  try {
    const employee_details = await employee_model.find({
      departmentId: departmentId,
    });

    if (!employee_details) {
      return res.json({
        message: "there is not employess related to this department",
        success: false,
      });
    }
    return res.json({
      message: "fetched data from emploment details",
      success: true,
      data: employee_details,
    });
  } catch (error) {
    res.json({
      message: "error in get employeedepartment id ",
      success: false,
      error: error.message,
    });
  }
});

router.post("/update-salary", async (req, res) => {
  const { employeeId, basicPay, allowance, deduction, payDate } = req.body;
  try {
    // const employee = await employee_model.findOne({ _id: employeeId });
    const total =
      parseInt(basicPay) + parseInt(allowance) - parseInt(deduction);
    // employee.salary = total;
    // employee.save();

    // const salary_user = await salary.findOne({ employeeId: employeeId });

    // if (salary_user) {
    //   (salary_user.total = total),
    //     (salary_user.basicPay = basicPay),
    //     (salary_user.allowance = allowance),
    //     (salary_user.deduction = deduction);
    //   salary_user.save();
    //   return res.json({
    //     message: "salary data exist so update it ",
    //     success: true,
    //     salary: salary,
    //   });
    // }

    const salary1 = await salary.create({
      employeeId: employeeId,
      basicPay: basicPay,
      allowance: allowance,
      deduction: deduction,
      payDate: payDate,
      total: total,
    });

    return res.json({
      message: "get the data",
      success: true,
      salary: salary1,
    });
  } catch (error) {
    res.json({
      message: "error in salary api",
      success: false,
      error: error.message,
    });
  }
});

router.get("/get-salary-details", async (req, res) => {
  const { employeeId } = req.query;
  //console.log("employee", employeeId);
  try {
    const salary_data = await salary.find({ employeeId: employeeId }).populate({
      path: "employeeId",
      populate: {
        path: "userId",
      },
    });
    //console.log("salary data", salary_data);
    if (!salary_data) {
      return res.json({
        message: "Not salary data got ",
        success: false,
      });
    }
    res.json({
      message: "salary data got ",
      salary: salary_data,
      success: true,
    });
  } catch (error) {
    res.json({
      message: "error in salary api",
      error: error.message,
      success: false,
    });
  }
});

router.post("/employee-details", auth, async (req, res) => {
  const { id } = req.user;
  //console.log(req.user);
  try {
    const employee = await employee_model
      .findOne({ userId: id })
      .populate("departmentId");
    res.json({ message: "get the employee", data: employee });
  } catch (error) {
    res.json({ message: "error in employee details", error: error.message });
  }
});

router.post("/verify", auth, (req, res) => {
  const user = req.user;

  return res.json({ message: "valaidate and verify token", user });
});

router.get("/get-employee-byuserid", (req, res) => {
  const { id } = req.query; //getting the user id

  employee_model
    .findOne({ userId: id })
    .then((resp) => {
      res.json({
        message: "get data in employee data ",
        success: "true",
        data: resp,
      });
    })
    .catch((err) => {
      res.json({
        message: "error in backend employee details in employee id",
        success: "false",
        error: err.message,
      });
    });
});

router.post("/create-leave", (req, res) => {
  // console.log(req.body);
  const { leave_name, userid, date_from, date_to, status } = req.body;
  leave_model
    .create({
      leave_name: leave_name,
      employee_id: userid,
      date_from: date_from,
      date_to: date_to,
      status: status,
    })
    .then((leave) => {
      res.json({ message: "create the leave data", leave, success: true });
    })
    .catch((err) => {
      res.json({
        message: "error in leave api",
        error: err.message,
        success: false,
      });
    });
});

//thorugh userid
router.get("/leaves-employee", async (req, res) => {
  const { userId } = req.query; // userid
  console.log("employee valaa dashboard sa", userId);
  console.log("admin vala dashboard sa ", userId);
  //console.log("employeeId", userId);
  try {
    const leaves_data = await leave_model.find().populate("employee_id");
    // console.log(leaves_data);
    // Filter leaves data based on the userId
    const filteredLeaves = leaves_data.filter(
      (leave) => leave.employee_id.userId.toString() === userId
    );
    console.log(filteredLeaves);
    res.status(200).json(filteredLeaves); // Send filtered leaves as response
  } catch (error) {
    console.error("Error fetching leaves data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//through employeeid
router.get("/leaves", async (req, res) => {
  const { userId } = req.query; // userid
  console.log("employee valaa dashboard sa", userId);
  console.log("admin vala dashboard sa ", userId);
  //console.log("employeeId", userId);
  try {
    const leaves_data = await leave_model.find().populate("employee_id");
    // console.log(leaves_data);
    // Filter leaves data based on the userId
    const filteredLeaves = leaves_data.filter(
      (leave) => leave.employee_id._id.toString() === userId
    );
    console.log(filteredLeaves);
    res.status(200).json(filteredLeaves); // Send filtered leaves as response
  } catch (error) {
    console.error("Error fetching leaves data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateLeaveStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  leave_model
    .findById(id)
    .then(async (user) => {
      user.status = status;
      await user.save();
      // console.log(user);
      res.json({
        message: "user leave staus updated",
        success: true,
        user,
      });
    })
    .catch((err) => {
      res.json({
        message: "user leave staus failure",
        success: false,
        error: err.message,
      });
    });
});

export { router };
