const router = require("express").Router();
const HiringController = require("../controllers/HiringController.js");
const AuthCheckerHiring = require("../middlewares/ca_hiring.js")
router.post("/register",HiringController.Register);
router.post("/login",HiringController.Login);
router.get("/profile",AuthCheckerHiring,HiringController.Profile);
module.exports = router;