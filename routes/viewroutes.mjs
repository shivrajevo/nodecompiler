import { Router } from 'express';
import { homepage } from "../controllers/frontend.mjs"


const router = Router();

router.get('/', homepage)


export { router }