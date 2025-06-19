const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found in the List :)!");
  return res.json(user);
}

async function handleUpdateUser(req, res) {
  //Partially updates the resource. Only the fields provided in the request are updated.

  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: req.body.last_name,
    firstName: req.body.first_name,
    email: req.body.email,
    gender: req.body.gender,
    jobTitle: req.body.job_title,
  });
  if (!user) {
    return res.status(404).send("User not found in the List :)!");
  }
  return res.json({
    status: "Success",
    msg: "User information updated successfully",
  });
}

async function handleAllUpdateUser(req, res) {
  //Fully replaces the resource. All fields must be provided in the request.

  //replace current user with new user
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).send("Please provide all fields");
  }

  // Update the user in MongoDB
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id, // Find user by ID
    {
      firstName: first_name,
      lastName: last_name,
      email: email,
      gender: gender,
      jobTitle: job_title,
    }, // Update all the  field
    { new: true, runValidators: true } // Return updated user and apply schema validation
  );

  if (!updatedUser) {
    return res.status(404).send("User not found in the List :)!");
  }

  return res.status(201).json({
    status: "success",
    message: "User replaced successfully with below details",
    updatedUser,
  });
}

async function handleDeleteUser(req, res) {
  //delete The user with id

  await User.findByIdAndDelete(req.params.id);

  return res.json({
    status: "Success",
    msg: "User deleted successfully",
  });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).send("Please provide all fields");
  }

  //Create new user
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  //console.log(result);
  return res
    .status(201)
    .json({
      status: "success",
      msg: "User created successfully",
      id: result._id,
    });
}

module.exports = {
  handleGetAllUsers,
  handleGetUser,
  handleUpdateUser,
  handleAllUpdateUser,
  handleDeleteUser,
  handleCreateNewUser,
};
