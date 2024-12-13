import axios from 'axios';
import { RequestHandler } from 'express';
import { defaultHeader } from '../src/helper';
import { base_url } from './coin';

export const getNfts: RequestHandler = async (req, res, next) => {
    try {
        const endpoint = `/nfts/list?order=floor_price_native_desc&per_page=250`
        const response = await axios.get(base_url + endpoint, defaultHeader)
        res.status(200).json(response.data)
    } catch (error) {
        next(error)
    }
}