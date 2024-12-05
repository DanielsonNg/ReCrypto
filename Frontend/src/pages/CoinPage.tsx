import { Box, Grid2 } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

type Coin = {
    name: string,
    symbol: string,
    image: string,
    description: string,
    market_cap_rank: number,
}

type Chart = {
    market_caps: [number[]],
    prices: [number[]],
    total_volumes: [number[]]
}

export default function CoinPage() {
    const { id } = useParams()
    const [coin, setCoin] = useState<Coin | null>()
    const [chart, setChart] = useState<Chart | null>()

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:3333/coin?coinID=${id}`)
            setCoin(response.data.general)
            setChart(response.data.chart)
            console.log(response.data.chart.market_caps)
        })()
    }, [])


    return (
        <>
            <Grid2 direction={'column'} container>
                {/* Top */}
                {coin && <Grid2 container direction={'row'} sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                    <img style={{ width: '150px', height: '150px' }} src={coin.image}></img>
                    <h1>{coin.name}</h1> <h2 style={{ fontWeight: 'lighter' }}>{coin.symbol}</h2>
                </Grid2>}
                <Grid2>
                    <Box sx={{ flexGrow: 1 }}>
                        {chart ? <SparkLineChart data={chart.market_caps.map((data) => {
                            return data[1]
                        })} height={100} />
                            : ''}
                    </Box>
                </Grid2>
                {/* Mid */}
                <Grid2>

                </Grid2>
                {/* Bottom */}
                <Grid2>

                </Grid2>
            </Grid2>
        </>
    )
}