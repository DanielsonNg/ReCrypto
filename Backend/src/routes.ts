import { Router } from "express"
import { coinsList, getCoin } from '../controllers/coin';
const router = Router()

router.get('/coins/lists', coinsList)
router.get('/coin', getCoin)


export default router