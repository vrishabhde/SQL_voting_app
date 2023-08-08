import express from "express";
import { register_user, register_user_html } from "../controllers/user_controller.js";

const router = express.Router();


router.get("/register_user",register_user_html);
router.post("/register_user",register_user);


export default router;