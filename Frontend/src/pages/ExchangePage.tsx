import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ExchangeMarketTable from "../components/ExchangeMarketTable"
import { Grid2 } from "@mui/material"
import { Exchange } from './CoinExchangesPage';

export type Market = {
    base: string,
    coin_id: string,
    last: number,
    volume: number,
    target: string
}

export default function ExchangePage() {
    const { id } = useParams()
    const [markets, setMarkets] = useState([])
    const [exchange, setExchange] = useState<Exchange>()

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:3333/exchange?id=${id}`)
            setExchange(response.data)
            setMarkets(response.data.tickers)
        })()
    }, [])

    return (
        <>
            {exchange ?
                <Grid2 container direction={'column'} gap={5}>
                    <Grid2 container direction={'row'} sx={{ display: 'flex', alignContent: 'center' }} gap={3}>
                        <Grid2 container direction={'row'} gap={3}>
                            <img style={{ width: '100px', height: '100px' }} src={exchange.image}></img>
                            <h2>
                                {exchange.name} &nbsp;
                            </h2>
                            <h2>
                                {exchange.rank}#
                            </h2>
                        </Grid2>
                        <Grid2 container>
                            <h2>
                                Volume {exchange.volume24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $
                            </h2>
                        </Grid2>
                    </Grid2>

                    <ExchangeMarketTable markets={markets} />
                </Grid2> :
                <h2>Fetching Data...</h2>
            }
        </>
    )
}