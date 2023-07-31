const { Router } = require("express");
const { postHandler } = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

const router = Router();

router.post("/post", upload.single("image"), postHandler);

module.exports = router;
