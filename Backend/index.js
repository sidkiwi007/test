const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
require("./connection");

const BlogModel = require("./model");

app.post("/addEmployee", async (req, res) => {
  const { EmpName, designation, empId, img_url } = req.body;

  
  if (!EmpName || !designation || !empId || !img_url) {
    return res.status(400).send("All fields are required.");
  }

  try {
    
    const result = await BlogModel(req.body).save();
    res.status(201).send({ message: "Employee added", employee: result });
  } catch (error) {
    console.error("Error Details:", error);
    res.status(500).send("Error adding employee");
  }
});

app.post("/addEmployee", async (req, res) => {
  console.log("Request Body:", req.body);  

  try {
    const result = await BlogModel(req.body).save();
    res.status(201).send({ message: "Employee added", employee: result });
  } catch (error) {
    console.error("Error Details:", error);
    res.status(500).send("Error adding employee");
  }
});



app.get("/employees", async (req, res) => {
  try {
    const employees = await BlogModel.find();
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving employees");
  }
});
app.put("/updateEmployee/:id", async (req, res) => {
  try {
    const updatedEmployee = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).send("Employee not found");
    res.json(updatedEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating employee");
  }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const result = await BlogModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Employee not found");
    res.send("Employee deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting employee");
  }
});



app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
