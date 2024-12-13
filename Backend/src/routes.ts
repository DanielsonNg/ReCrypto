import { Router } from "express"
import { coinsList, getCoin } from '../controllers/coin';
import { exchange, exchangesList } from '../controllers/exchanges';
import { getNfts } from '../controllers/nft';
const router = Router()

router.get('/coins/lists', coinsList)
router.get('/coin', getCoin)

router.get('/exchanges', exchangesList)
router.get('/exchange', exchange)

router.get('/nfts', getNfts)


export default router