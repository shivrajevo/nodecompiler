import { compiler } from "../controllers/main.mjs";
import { Router } from "express";
const router = Router()

router.post("/compile", compiler)


export { router }