
const express = require("express");
const path = require("path");

const checklists = require("./src/routes/checklists");
const rootRouter = require("./src/routes/index");
require("./config/database");

const methodOverride = require("method-override");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/checklists", checklists);
app.use("/", rootRouter);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(3000, ()=> {
    console.log("Servidor rodando!");
});