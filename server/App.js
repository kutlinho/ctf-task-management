import express from "express";
import { mongoose } from "mongoose";
import pkg from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

const { json } = pkg;
const app = express();
app.use(json());
app.use(cors());

const dbConnectionString =
  "mongodb+srv://kutlumeydanli:VLS30TT6EofGmuDA@ctf-cluster.wbr3ooc.mongodb.net/?retryWrites=true&w=majority&appName=ctf-cluster";
mongoose
  .connect(dbConnectionString, {})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("database.js/db: " + err);
  });

// Basit bir login endpoint'i
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login");

  try {
    // Using async-await for database operation
    const result = await mongoose.connection.db
      .collection("users")
      .findOne({ username });

    if (!result) {
      return res.status(401).send("No user found");
    }
    if (result.password === password) {
      const token = jwt.sign({ username }, "secret_key", {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/register", async (req, res) => {
  // NOT: Güvenli olmayan bir yapı kullanıldı
  const { username, password } = req.body;
  // Sadece demo amaçlıdır
  // give me a function that checks the username from users collection
  try {
    const result = await mongoose.connection.db
      .collection("users")
      .findOne({ username });

    if (result) {
      res.status(401).send("User already exists");
    }

    console.log(user);
    await mongoose.connection.db
      .collection("users")
      .insertOne({ username, password });

    console.log("1 document inserted");

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// Task ekleme endpoint'i
app.post("/task", async (req, res) => {
  // Güvenlik açığı: Token doğrulama yok
  const task = req.body;
  const owner = await mongoose.connection.db
    .collection("users")
    .findOne({ username: task.owner });
  // Task'ı veritabanına kaydet
  const result = await mongoose.connection.db
    .collection("tasks")
    .insertOne({ ...task, owner: owner }, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
  res.json({ message: "Task added successfully" });
});

// Task listeleme endpoint'i
app.get("/tasks/:user", async (req, res) => {
  // Güvenlik açığı: Token doğrulama yok

  const user = req.params.user;
  var result;
  if (user === "undefined") return res.status(401).send("No user found");
  if (user === "admin") {
    // taskları çekerken atanan user'ı nesne olarak password ile çekiyoruz
    result = await mongoose.connection.db
      .collection("tasks")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        // res.json(result);
      });
  } else {
    // retrieve user with password as an object
    result = await mongoose.connection.db
      .collection("tasks")
      .find({ user })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }

  console.log(result);

  return res.json(result);
});

app.get("/users", async (req, res) => {
  // Güvenlik açığı: Token doğrulama yok
  const result = await mongoose.connection.db
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      // res.json(result);
    });
  return res.json(result);

  if (!result) {
    return res.status(401).send("No user found");
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
