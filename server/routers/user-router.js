import { Router } from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logOut", userController.logOut);
router.get("/getUsers", authMiddleware, userController.getUsers);
router.get("/refresh", userController.refresh);

export default router;
