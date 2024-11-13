import { Router } from "express"
import { coinsList } from '../controllers/coint';
const router = Router()

router.post('/coins/list', coinsList)


export default router