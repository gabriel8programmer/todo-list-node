

const express = require("express");
const taskController = require("../controllers/task-controller");

const checklistDependentRoute = express.Router();
const simpleRoute = express.Router();

checklistDependentRoute.get("/:id/tasks/new", taskController.new)
checklistDependentRoute.post("/:id/tasks", taskController.add)
simpleRoute.delete("/:id", taskController.delete)
simpleRoute.put("/:id", taskController.update)

module.exports = { checklistDependent: checklistDependentRoute, simple: simpleRoute};