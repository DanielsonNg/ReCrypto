import { Router } from "express"
import {testFunction} from "../controllers/test"

const router = Router()


router.post('/test', testFunction)



export default router