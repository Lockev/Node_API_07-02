const express = require("express");
const fs = require("fs");

const routerUsers = express.Router();

let usersData = require("./data.json");

routerUsers.get("/", (req, res) => {
  res.json(usersData);
});

routerUsers.get("/:position", (req, res) => {
  req.params.position <= usersData.users.length && req.params.position !== 0
    ? res.json(usersData.users[req.params.position - 1])
    : res.send("This user doen't exists");
});

routerUsers.post("/", (req, res) => {
  const newUser = {
    id: usersData.users.length + 1,
    data: {
      username: req.query.username,
      biography: req.query.biography,
      avatar: req.query.avatar
    }
  };
  usersData.users.push(newUser);

  fs.writeFile("./api/users/data.json", JSON.stringify(usersData), err => {
    if (err) throw err;
    console.log("The file has been saved!");
    res.send(JSON.stringify(usersData));
  });
});

routerUsers.put("/:position", (req, res) => {
  if (req.params.position <= usersData.users.length && req.params.position !== 0) {
    const thisUser = usersData.users[req.params.position - 1];
    const editedUser = {
      username: req.query.username || thisUser.data.username,
      biography: req.query.biography || thisUser.data.biography,
      avatar: req.query.avatar || thisUser.data.avatar
    };

    thisUser.data = editedUser;

    fs.writeFile("./api/users/data.json", JSON.stringify(usersData), err => {
      if (err) throw err;
      console.log("The file has been edited!");
      res.json(thisUser);
    });
  } else {
    res.send("This user doen't exists");
  }
});

routerUsers.delete("/:position", (req, res) => {
  if (req.params.position <= usersData.users.length && req.params.position !== 0) {
    usersData.users.splice(req.params.position - 1, 1);
    res.send("User deleted from JSON file");
  } else {
    res.send("This user doen't exists");
  }
});

module.exports = routerUsers;
