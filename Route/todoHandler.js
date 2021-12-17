const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");

//model -> Return class
const Todo = new mongoose.model("Todo", todoSchema);

//get all todos
router.get("/", async (req, res) => {
  await Todo.find({ status: "active" }, (err, document) => {
    if (err) {
      res.status(500).json({ error: "Server Side Error" });
    } else {
      res
        .status(200)
        .json({ result: document, message: "Todos GET Successfully" });
    }
  }).clone();
});
//get single todo
router.get("/:id", async (req, res) => {
  await Todo.findOne({ _id: req.params.id }, (err, document) => {
    if (err) {
      res.status(500).json({ error: "Server Side Error" });
    } else {
      res
        .status(200)
        .json({ result: document, message: "Todo GET Successfully" });
    }
  }).clone();
});
//post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: "Server Side Error" });
    } else {
      res.status(200).json({ message: "Todo Insert Successfully" });
    }
  });
});

//post multiple todo

router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "Server Side Error" });
    } else {
      res.status(200).json({ message: "Todos Inserted Successfully" });
    }
  });
});
//put todo
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
        title: "Updated Title 00017",
      },
    },
    { new: true, useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({ error: "Server Side Error" });
      } else {
        res.status(200).json({ message: "Todo Updated Successfully" });
      }
    }
  ).clone();
  console.log(result);
});
//delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ error: "Server Side Error" });
    } else {
      res.status(200).json({ message: "Todo one deleted Successfully" });
    }
  }).clone();
});

module.exports = router;
