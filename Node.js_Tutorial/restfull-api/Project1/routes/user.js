/* Routing refers to determining how an application responds to 
a client request to a particular endpoint, which is a URI (or path) 
and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed 
when the route is matched. */

const express = require("express");
const {
  handleGetAllUsers,
  handleGetUser,
  handleUpdateUser,
  handleAllUpdateUser,
  handleDeleteUser,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router(); //just like app but for route we use router

//Routes

/* //html rendring or ssr
router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  const html = `
      <ul> 
      ${allUsers
        .map((user) => `<li>${user.firstName} ${user.lastName}</li>`)
        .join("")}
      </ul>
      `;

  return res.send(html);
}); */

// Restful api in json response
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

//Dynamic routing gives specific user info
//use route when path is same for different methods
router
  .route("/:id")
  .get(handleGetUser)
  .put(handleAllUpdateUser)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
