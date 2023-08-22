import { Router } from "express";
// import { isAuthenticated } from "../auth/index.auth";
import { getAll } from "../controllers/product.controller";

const router = Router();

router.get("/",  getAll);

export default router;
