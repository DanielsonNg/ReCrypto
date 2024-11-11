import { RequestHandler } from "express"

export const testFunction: RequestHandler<unknown> = (req, res, next) => {
    try {
        console.log(req.body)
        res.status(200).json('test')
    } catch (error) {
        res.status(200).json(error)
    }
}
