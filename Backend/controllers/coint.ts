import { RequestHandler } from "express"
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config()
// type CoinList = {
//     id: string,
//     symbol: string,
//     name: string
// }


export const coinsList: RequestHandler = async (req, res, next) => {
    let { test, tesst, testt } = req.body
    try {
        console.log('test')
        let test = process.env.CG_URL + '/coins/markets?vs_currency=usd'
        let fetch = await axios.get(test, {
            headers: {
                'x-cg-api-key': process.env.CG_API_KEY,
                'accept': 'application/json',
            }
        })
        res.status(200).json(fetch.data)
    } catch (error) {
        next(error)
    }
}