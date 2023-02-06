// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId")
const { Attribute, validate } = require("../models/attribute");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const attributes = await Attribute.find().select("-__v").sort("name");
  res.send(attributes);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let attributes = new Attribute({
    name: req.body.name,
    status: req.body.status,
  });
  attributes = await attributes.save();

  res.send(attributes);
});

// router.put("/:id", [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     { new: true}
//   );

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

//auth, admin

router.delete("/:id", validateObjectId, async (req, res) => {
  console.log(req.params.id);
  const attribute = await Attribute.findByIdAndRemove(req.params.id);

  if (!attribute)
    return res
      .status(404)
      .send("The attribute with the given ID was not found.");

  res.send(attribute);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const genre = await Genre.findById(req.params.id).select("-__v");

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

module.exports = router;
