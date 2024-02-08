import { compiler } from "../controllers/main.mjs";
import { Router } from "express";
import { tempdelete } from "../middlewares/cleantemp.mjs";
const router = Router()

router.post("/compile", tempdelete, compiler)


export { router }