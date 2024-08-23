
const express = require("express");
const path = require("node:path");

const checkListRouter = require("./routes/checklist");
const taskRouter = require("./routes/task");
const rootRouter = require("./routes/index");

const methodOverride = require("method-override");

require("./config/database");

const app = express();

//initial configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method", {methods: ["GET", "POST"]}));

//config ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//config static files
app.use(express.static("public"));

//routes
app.use("/checklists", checkListRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simple);
app.use("/", rootRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Servidor rodando em http://localhost:${port}`);
});