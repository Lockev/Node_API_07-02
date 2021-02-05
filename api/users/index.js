const express = require("express");
const fs = require("fs");

const routerUsers = express.Router();

let usersData = require("./data.json");

// Get all users
routerUsers.get("/", (req, res) => {
  res.json(usersData);
});

// Get one user
routerUsers.get("/:position", (req, res) => {
  // verify that user exists
  req.params.position <= usersData.users.length && req.params.position !== 0
    ? res.json(usersData.users[req.params.position - 1])
    : res.send("This user doen't exists");
});

routerUsers.post("/", (req, res) => {
  // Add one user to json file
  const newUser = {
    // Create new user object
    id: usersData.users.length + 1,
    data: {
      username: req.query.username,
      biography: req.query.biography,
      avatar: req.query.avatar
    }
  };
  usersData.users.push(newUser); // Push new user object to all users array

  // Rewrite data.json with new user
  fs.writeFile("./api/users/data.json", JSON.stringify(usersData), err => {
    if (err) throw err;
    console.log("The file has been saved!");
    res.send(JSON.stringify(usersData));
  });
});

// Edit one user's data
routerUsers.put("/:position", (req, res) => {
  // Verify that user exists
  if (req.params.position <= usersData.users.length && req.params.position !== 0) {
    // Create new user object with given data, takes initial data if the parameter is not specified by request
    const thisUser = usersData.users[req.params.position - 1];
    const editedUser = {
      username: req.query.username || thisUser.data.username,
      biography: req.query.biography || thisUser.data.biography,
      avatar: req.query.avatar || thisUser.data.avatar
    };
    thisUser.data = editedUser;

    // Rewrite user's data with new created object
    fs.writeFile("./api/users/data.json", JSON.stringify(usersData), err => {
      if (err) throw err;
      console.log("The file has been edited!");
      res.json(thisUser);
    });
  } else {
    res.send("This user doen't exists");
  }
});

// Remove user from data.json
routerUsers.delete("/:position", (req, res) => {
  // Verify that user exists
  if (req.params.position <= usersData.users.length && req.params.position !== 0) {
    usersData.users.splice(req.params.position - 1, 1);
    res.send("User deleted from JSON file");
  } else {
    res.send("This user doen't exists");
  }
});

module.exports = routerUsers;
