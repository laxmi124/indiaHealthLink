const { Router } = require("express");
const controller = require("./contoller");
const router = Router();

router.get("/", (req, res) => controller.getStudents(req, res));
router.get("/:id", (req, res) => controller.getStudentById(req, res));
router.post("/", (req, res) => controller.addStudent(req, res));

module.exports = router;
