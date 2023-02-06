const validateObjectId = require("../middleware/validateObjectId");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().select("-__v").sort("name");
  res.send(categories);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({ name: req.body.name, status: req.body.staus });
  await category.save();

  res.send(category);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );

  if (!category)
    return res.status(404).send("The category with the given ID not found.");

  res.send(category);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res.status(404).send("The category with the given ID was not found.");
  res.send(categoery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const category = await Category.findById(req.params.id).select("-__v");

  if (!category)
    return res.status(404).send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
