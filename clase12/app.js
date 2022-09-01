const express = require("express");
const app = express();
const router = require("./src/routes/routeProducts.js");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/", router);

module.exports=app;