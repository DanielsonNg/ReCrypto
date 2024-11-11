import express from "express"
import router from "./routes";

const app = express()
app.use(express.json())

const PORT = 5173

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})