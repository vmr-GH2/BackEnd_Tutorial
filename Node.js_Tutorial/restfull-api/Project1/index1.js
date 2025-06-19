const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs"); //append new user to file

const app = express();
const PORT = 3000;

//built-in middleware 0 - plugin
//This middleware parses the URL-encoded data and converts it into a JavaScript object
app.use(express.urlencoded({ extended: false })); //it processes the request before it reaches your route handlers.

//middleware1
//next means subsequent middleware
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  req.userName = "varun rakshe";
  fs.appendFile(
    "logFile.txt",
    `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
    (err, data) => {
      if (err) console.log(err);
      next(); //next middleware function/next function
    }
  );
});

//middleware2
app.use((req, res, next) => {
  console.log("Hello from middleware 2", req.userName);

  next(); //next middleware function/next function
});

//Routes
//html rendring or ssr
app.get("/users", (req, res) => {
  const html = `
    <ul> 
    ${users
      .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
      .join("")}
    </ul>
    `;

  return res.send(html);
});

// Restful api in json response
app.get("/api/users", async (req, res) => {
  res.setHeader("X-Myname", "Varun"); //custom header
  //Always add X to custom headers
  console.log("I am in the ger route", req.userName);
  return res.json(users);
});

//Dynamic routing gives specific user info
//use route when path is same for different methods
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) return res.status(404).send("User not found in the List :)!");
    return res.json(user);
  })
  .put((req, res) => {
    //Fully replaces the resource. All fields must be provided in the request.
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).send("User not found in the List :)!");
    }

    //replace current user with new user

    const { first_name, last_name, email, gender, job_title } = req.body;

    if (!first_name || !last_name || !email || !gender || !job_title) {
      return res.status(400).send("Please provide all fields");
    }

    // Create a new user object
    const updatedUser = { id, first_name, last_name, email, gender, job_title };
    users[userIndex] = updatedUser;

    // Write the updated users array back to the JSON file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error updating the file:", err);
        return res.status(500).send("Failed to update the file.");
      }

      return res.status(201).json({
        status: "success",
        message: "User replaced successfully with below details",
        updatedUser,
      });
    });
  })
  .patch((req, res) => {
    //Partially updates the resource. Only the fields provided in the request are updated.
    //Edit or Update The user with id
    const userid = Number(req.params.id);
    const user = users.find((user) => user.id === userid);

    if (!user) {
      return res.status(404).send("User not found in the List :)!");
    }

    //Update the user details
    const { id, first_name, last_name, email, gender, job_title } = req.body;
    if (id) user.id = Number(id);
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (job_title) user.job_title = job_title;
    //return res.json(user);

    // Save updated users array back to the JSON file
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Failed to update the file.");
        }

        return res.status(201).json({
          status: "success",
          message: "User updated successfully",
          user,
        });
      }
    );
  })
  .delete((req, res) => {
    //delete The user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).send("User not found in the List :)!");
    }

    //Remove the user from database or json file

    const deletedUser = users.splice(userIndex, 1);

    // Save updated users array back to the JSON file
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          console.error("Error writing to the file:", err);
          return res.status(500).send("Failed to update the file.");
        }

        return res.json({
          status: "success",
          message: "User deleted successfully",
          deletedUser,
        });
      }
    );

    //return res.json({ status: "pending" });
  });

app.post("/api/users", async (req, res) => {
  //Create new user
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

  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      return res.status(201).json({ status: "success", id: users.length });
    }
  );
});

/*app.patch("/api/users/:id",(req,res)=>{
  Edit or Update The user with id
  return res.json({status :"pending"})
})

app.delete("/api/users/:id",(req,res)=>{
  delete The user with id
  return res.json({status :"pending"})
}) */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
