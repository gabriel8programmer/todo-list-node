
const express = require("express");
const checklistController = require("../controllers/checklist-controller");

const router = express.Router();

router.get("/", checklistController.index)
router.get("/new", checklistController.new)
router.get("/:id", checklistController.show)
router.get("/:id/edit", checklistController.edit)
router.post("/", checklistController.add)
router.put("/:id", checklistController.update)
router.delete("/:id", checklistController.delete)

module.exports = router;