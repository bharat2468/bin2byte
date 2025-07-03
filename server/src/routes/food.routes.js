import { Router } from "express";
import { postFood, getFood } from "../controllers/food.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
	.route("/postfood")
	.post(verifyJWT, upload.single("photo"), postFood);

router.get("/getfood", verifyJWT, getFood);

export default router;
