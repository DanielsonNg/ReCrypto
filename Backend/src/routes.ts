import { Router } from "express"
import { coinsList, getCoin } from '../controllers/coin';
import { exchangesList } from '../controllers/exchanges';
const router = Router()

router.get('/coins/lists', coinsList)
router.get('/coin', getCoin)

router.get('/exchanges', exchangesList)


export default router