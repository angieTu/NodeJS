const express = require("express");
const {
  getGatitos,
  getGatito,
  postGatito,
  deleteGatito,
  putGatito,
} = require("../controllers/gatitoControllers");
const router = express.Router();

router.get("/", getGatitos);
router.get("/:id", getGatito);
router.post("/", postGatito);
router.delete("/:id", deleteGatito);
router.put("/:id", putGatito);

module.exports = router;
