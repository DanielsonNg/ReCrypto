import { RequestHandler } from "express"
import dotenv from 'dotenv';
import axios from "axios";
import { defaultHeader } from "../src/helper";
dotenv.config()

const base_url = process.env.CG_URL

export const coinsList: RequestHandler = async (req, res, next) => {
    try {
        let endpoint: string = '/coins/markets?vs_currency=usd'
        let fetchCoins = await axios.get(base_url + endpoint, defaultHeader)

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

        const filteredData = fetchCoins.data.map((coin: CoinListsProps) => ({
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
        
        endpoint = '/search/trending'
        let fetchTrending = await axios.get(base_url + endpoint, defaultHeader)

        type TrendingCoin = {
            item: {
                id: string,
                coin_id: number,
                name: string,
                symbol: string,
                market_cap_rank: number,
                thumb: string
                small: string
                large: string
                slug: string
                price_btc: Float32Array,
                score: number
            }
        }

        const trendingCoins = fetchTrending.data.coins.map((coin: TrendingCoin) => ({
            id: coin.item.id,
            coin_id: coin.item.coin_id,
            name: coin.item.name,
            symbol: coin.item.symbol,
            rank: coin.item.market_cap_rank,
            thumb: coin.item.thumb,
            small: coin.item.small,
            large: coin.item.large,
            price: coin.item.price_btc,
            score: coin.item.score
        }))

        res.status(200).json({ coins: filteredData, trendingCoins: trendingCoins })
    } catch (error) {
        next(error)
    }
}

export const getCoin: RequestHandler = async (req, res, next) => {
    try {
        const coinID: unknown = req.query.coinID
        const endpoint: string = `/coins/${coinID}?market_data=false&community_data=false&developer_data=false&sparkline=false&tickers=false`
        const coin = await axios.get(base_url + endpoint, defaultHeader)

        res.status(200).json({ coinData: coin.data })
    } catch (error) {
        next(error)
    }
}

