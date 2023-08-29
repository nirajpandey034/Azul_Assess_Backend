const express = require("express");
const router = express.Router();
require("dotenv").config();
const UserModel = require("../models/User");
const User = require("../models/User");

// get all users

router.get("/getAll", async (req, res) => {
  try {
    await UserModel.find({})
      .then((users) => {
        return res.json({ data: users });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  } catch (error) {
    return res.status(500).send("Error Occured: " + error.message);
  }
});
// get one user. based on email
router.post("/getUserWithEmail", async (req, res) => {
  const email = req.body.email;
  try {
    await UserModel.find({ email: email })
      .then((user) => {
        return res.json({ data: user });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  } catch (error) {
    return res.status(500).send("Error Occured: " + error.message);
  }
});
// user addition
router.post("/add", async (request, response) => {
  try {
    console.log(request.body);
    // getting input
    const { name, age, email, dob, address } = request.body;

    //validation
    if (!(name && age && email && dob && address)) {
      return response.status(400).send("All input is required");
    }
    //checking existing user
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return response.status(409).send("User Already Exist. Please Login");
    }

    const user = await UserModel.create({
      name,
      age,
      email,
      dob,
      address,
    });

    return response.status(201).json({ success: true, response: user });
  } catch (err) {
    return response.status(500).json({ response: err, success: false });
  }
});

// User deletion
router.delete("/delete", async (req, res) => {
  let email = req.body.email;
  const filter = { email: email };
  try {
    const response = await UserModel.deleteOne(filter);
    return res.status(200).json({ info: `${email} is deleted successfully` });
  } catch (error) {
    return res.status(500).json({ error: "Error Occured: " + error.message });
  }
});

// update user, except email
router.put("/update", async (req, res) => {
  let content = req.body;
  const filter = { email: content.email };
  try {
    const data = await UserModel.findOneAndUpdate(filter, content);
    return res
      .status(200)
      .json({ info: `${content.email} is updated successfully` });
  } catch (error) {
    return res.status(500).json({ error: "Error Occured: " + error.message });
  }
});
module.exports = router;
