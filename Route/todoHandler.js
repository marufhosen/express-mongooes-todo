const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");

//model -> Return class
const Todo = new mongoose.model("Todo", todoSchema);

//get all todos
router.get("/", async (req, res) => {
  try {
    const document = await Todo.find({ status: "active" });
    res
      .status(200)
      .json({ result: document, message: "Todos GET Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
});
//get single todo
router.get("/:id", async (req, res) => {
  try {
    const document = await Todo.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ result: document, message: "Todo GET Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
});
//post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({ message: "Todo Insert Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
});

//post multiple todo

router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: "Todos Inserted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
});
//put todo
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
          title: "Bangladesh in 2022 at updated",
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Todo Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
  console.log(result);
});
//delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Todo one deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Error" });
  }
});

module.exports = router;
