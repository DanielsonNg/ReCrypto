import { RequestHandler } from "express"
import dotenv from 'dotenv';
import axios from "axios";
import { defaultHeader } from "../src/helper";
dotenv.config()

const base_url = process.env.CG_URL


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

export const coinsList: RequestHandler = async (req, res, next) => {
    try {
        let endpoint: string = '/coins/markets?vs_currency=usd'
        let fetchCoins = await axios.get(base_url + endpoint, defaultHeader)
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
        if (!coinID) {
            res.status(422)
        }
        let endpoint: string
        let response
        let temp

        // endpoint = `/coins/${coinID}?market_data=false&community_data=false&developer_data=false&sparkline=false&tickers=false`
        // response = await axios.get(base_url + endpoint, defaultHeader)
        // temp = response.data
        // const general = {
        //     name: temp.name,
        //     symbol: temp.symbol,
        //     image: temp.image?.large || null,
        //     description: temp.description?.en || null,
        //     market_cap_rank: temp.market_cap_rank || null,
        // };

        // endpoint = `/simple/price?ids=${coinID}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true'`
        // response = await axios.get(base_url + endpoint, defaultHeader)
        // let price = response.data['vita-inu']

        endpoint = `/coins/${coinID}/market_chart?vs_currency=usd&days=1`
        response = await axios.get(base_url + endpoint, defaultHeader)
        const chart = response.data

        // res.status(200).json({ general: general, price: price, chart: chart })
        res.status(200).json({chart:chart})
    } catch (error) {
        next(error)
    }
}

