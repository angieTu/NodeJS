const express = require("express");
const router = express.Router();

const {
  getRefugios,
  getRefugio,
  postRefugio,
  deleteRefugio,
  putRefugio,
} = require("../controllers/refugiosControllers");

router.get("/", getRefugios);
router.get("/:id", getRefugio);
router.post("/", postRefugio);
router.delete("/:id", deleteRefugio);
router.put("/:id", putRefugio);

module.exports = router;
