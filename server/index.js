// server/index.js
const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("API Running"));
app.listen(4000, () => console.log("Server running on 4000"));
