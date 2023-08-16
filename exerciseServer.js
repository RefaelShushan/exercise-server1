const express = require("express");
// const { send, status } = require("express/lib/response");
const app = express();
const port = 8080;
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 3;
app.use(express.json());

let users = [
  { id: "1", email: "1234@gmail.com", password: "1234" },
  { id: "2", email: "5678@gmail.com", password: "567" },
  { id: "3", email: "89@gmail.com", password: "910" },
];

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const userId = users.find((user) => user.id === id);
  console.log(userId);
  !userId ? res.send("not found") : res.send(userId);
});

app.post(`/`, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("enter mail and password");
  } else {
    const check = users.find(
      (element) =>
        element.email === email &&
        bcrypt.compareSync(password, element.password)
    );
    if (check) {
      res.send("wrong credentials");
    } else {
      const newUser = {
        id: uuid(),
        email,
        password: bcrypt.hashSync(password, 3),
      };
      users.push(newUser);
      res.send(users);
    }
  }
});

app.post("/search", (req, res) => {
  const { email, password } = req.body;
  const check = users.find(
    (element) =>
      element.email === email && bcrypt.compareSync(password, element.password)
  );
  if (check) {
    return res.status(200).send("User is connected");
  } else {
    return res.status(200).send("wrong credentials");
  }
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  const userIndex = users.findIndex((element) => element.id === id);
  const userId = users.find((element) => element.id === id);
  console.log(userId);
  if (!userId) {
    res.status(400).send(`user ${userId} not find`);
  }
  if (!email || !password) {
    res.status(400).send("enter mail and password");
  } else {
    users[userIndex] = { id: id, email, password };
    res.status(200).send(`User ID ${id} updated successfully`);
  }
});

// app.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const updateUser = req.body;
//   const userId = users.findIndex((element) => element.id === id);

//   users[userId] = { ...users[userId], ...updateUser };
//   res.status(200).send(`User ID ${id} updated successfully`);
// });

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send(`User ID ${id} delete`);
  } else {
    res.send("user not found");
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
