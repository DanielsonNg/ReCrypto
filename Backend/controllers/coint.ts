import { RequestHandler } from "express"
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export const coinsList: RequestHandler = async (req, res, next) => {
    try {
        let url = process.env.CG_URL + '/coins/markets?vs_currency=usd'
        let fetch = await axios.get(url, {
            headers: {
                'x-cg-api-key': process.env.CG_API_KEY,
                'accept': 'application/json',
            }
        })

        type CoinListsProps = {
            id: string,
            market_cap_rank: number,
            name: string,
            symbol: string,
            image: string,
            current_price: number,
            price_change_percentage_24h: number,
            market_cap: number,
            market_cap_change_percentage_24h: number
        }

        const filteredData = fetch.data.map((coin: CoinListsProps) => ({
            id: coin.id,
            rank: coin.market_cap_rank,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            price: coin.current_price,
            price24: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            marketCap24: coin.market_cap_change_percentage_24h
        }))

        res.status(200).json(filteredData)
    } catch (error) {
        next(error)
    }
}