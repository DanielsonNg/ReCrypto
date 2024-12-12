import { RequestHandler } from 'express';

export const exchangesList: RequestHandler = async (req, res, next) => {
    try {
        console.log('true')


        res.status(200)
    } catch (error) {
        next(error)
    }
}