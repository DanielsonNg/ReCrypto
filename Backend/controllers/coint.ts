import { RequestHandler } from "express"
import dotenv from 'dotenv';
import axios from "axios";

// type CoinList = {
//     id: string,
//     symbol: string,
//     name: string
// }

export const coinsList: RequestHandler<unknown> = async (req, res, next) => {
    let { test, tesst, testt } = req.body
    try {
        dotenv.config()
        let test = process.env.CG_URL + '/coins/markets'
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