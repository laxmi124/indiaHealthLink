const express = require("express");
const cors = require("cors");
// const products = require("./products.json");
const studentRoutes = require("./src/student/routes");
let app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// send file
app.get("/", (req, res) => {
  res.send("Get All users");
});

app.use("/api/v1/students", studentRoutes);
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
