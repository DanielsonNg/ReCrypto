import axios from 'axios';
import { RequestHandler } from 'express';
import { base_url } from './coin';
import { defaultHeader } from '../src/helper';

type Exchanges = {
    trust_score_rank: number,
    id: string,
    name: string,
    image: string,
    trade_volume_24h_btc: number,
    trade_volume_24h_btc_normalized: number,
    year_established: number,
    trust_score: number
}

export const exchangesList: RequestHandler = async (req, res, next) => {
    try {
        const url = base_url + '/exchanges?per_page=25&page=1'
        const response = await axios.get(url, defaultHeader)
        const temp = response.data
        const exchanges = temp.map((temp: Exchanges) => ({
            rank: temp.trust_score_rank,
            id: temp.id,
            name: temp.name,
            image: temp.image,
            volume24: temp.trade_volume_24h_btc,
            volume24normalized: temp.trade_volume_24h_btc_normalized,
            year: temp.year_established,
            trust: temp.trust_score
        }))
        res.status(200).json({ exchanges: exchanges })
    } catch (error) {
        next(error)
    }
}

export const exchange: RequestHandler = async (req, res, next) => {
    try {
        const id = req.query.id
        const url = base_url + `/exchanges/${id}`
        const response = await axios.get(url, defaultHeader)
        const temp = response.data
        const exchange = {
            rank: temp.trust_score_rank,
            id: temp.id,
            name: temp.name,
            image: temp.image,
            volume24: temp.trade_volume_24h_btc,
            volume24normalized: temp.trade_volume_24h_btc_normalized,
            year: temp.year_established,
            trust: temp.trust_score,
            tickers: temp.tickers
        }
        res.status(200).json(exchange)
    } catch (error) {
        next(error)
    }
}