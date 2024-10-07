import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { router } from "./controllers/general.js";
import { auth } from "./controllers/auth.js";
import path from "path";
//import { register_user } from "./userRegisteration.js";

// const app = express();
const a = "ayusjh";
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

const __dirname = path.resolve(); // Only needed if using ES6 modules (e.g., `import` statements)

// Serve files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/api/auth", router);
app.use("/api/auth", auth);
app.use("/uploads", express.static("./uploads"));

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.vcbdv.mongodb.net/EMS?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((resp) => {
    if (!resp) {
      console.log("error in backend side databse connection");
    }
    app.listen(4000, () => {
      console.log("server startde at port 4000 and databse connected ");
    });
    // register_user();
  })
  .catch((err) => {
    console.log(err.message);
  });
