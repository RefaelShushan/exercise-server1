const express = require("express");
const { send, status } = require("express/lib/response");
const app = express();
const port = 8080;
const { v4: uuid } = require("uuid");
app.use(express.json())

let user =[ 
  { id: "1", email: "1234@gmail.com", password: "1234" },
  { id: "2", email: "5678@gmail.com", password: "567" },
  { id: "3", email: "89@gmail.com", password: "910" },
];

app.get("/", (req, res) => {
    res.send(user);
  });

app.get("/:id", (req, res) => {
    const id = req.params.id
    const userId = user.find((element)=> element.id === id)
    !userId ? res.send("not found"):res.send(userId)
});

app.post("/", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "enter agin" });
    }
    const newUser = { id: uuid(), email, password };
    user.push(newUser);
    res.send(user);
    
});


app.put("/:id",(req,res)=>{
    const id = req.params.id;
    const updateUser = req.body;
    const userId = user.findIndex((element)=> element.id === id); 
    user[userId] = {...user[userId],...updateUser}
    res.status(200).send(`User ID ${id} updated successfully`)
})

app.delete("/:id",(req,res)=>{
    const id = req.params.id;
    const userId = user.findIndex((element)=> element.id === id); 
    user.splice(userId,1)
    res.status(200).send(`User ID ${id} delete`);
})





app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
