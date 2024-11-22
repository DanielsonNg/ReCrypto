import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import createHttpError, { isHttpError } from "http-errors";

const app = express()
app.use(express.json())
const PORT = 3333

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3333");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})