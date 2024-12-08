import { Box, Button, Grid2 } from "@mui/material"
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

type ChartType = 'price' | 'marketcap' | 'volume'

export default function CoinPage() {
    const { id } = useParams()
    const [coin, setCoin] = useState<Coin | null>()
    const [chart, setChart] = useState<Chart | null>()
    const [chartType, setChartType] = useState<ChartType>('price')

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:3333/coin?coinID=${id}`)
            setCoin(response.data.general)
            setChart(response.data.chart)

            console.log(response.data)
        })()
    }, [])

    const handleChartButton = (chartType: ChartType) => {
        setChartType(chartType)
    }

    return (
        <>
            <Grid2 direction={'column'} container>
                {/* Top */}
                {coin && <Grid2 container direction={'row'} sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                    <img style={{ width: '150px', height: '150px' }} src={coin.image}></img>
                    <h1>{coin.name}</h1> <h2 style={{ fontWeight: 'lighter' }}>{coin.symbol}</h2>
                </Grid2>}
                {/* Mid */}
                <Grid2>
                    <Grid2 container direction={'row'} gap={3}>
                        <Button variant="contained" color="success" onClick={() => handleChartButton('price')}>Price</Button>
                        <Button variant="contained" color="success" onClick={() => handleChartButton('marketcap')}>MarketCap</Button>
                        <Button variant="contained" color="success" onClick={() => handleChartButton('volume')}>Volume</Button>
                    </Grid2>
                    <Box sx={{ flexGrow: 1 }}>
                        {chart ?
                            chartType === 'price' ? <SparkLineChart
                                height={100}
                                colors={['green']}
                                data=
                                {chart.prices.map((data) => {
                                    return parseFloat(data[1].toFixed(2).toString())
                                })}
                                xAxis={{
                                    scaleType: 'time',
                                    data:
                                        chart.prices.map((data) => {
                                            return new Date(data[0])
                                        })
                                }}
                                showTooltip
                                showHighlight
                            />
                            :
                            chartType === 'marketcap' ? <SparkLineChart
                                height={100}
                                colors={['green']}
                                data=
                                {chart.market_caps.map((data) => {
                                    return parseFloat(data[1].toFixed(2).toString())
                                })}
                                xAxis={{
                                    scaleType: 'time',
                                    data:
                                        chart.prices.map((data) => {
                                            return new Date(data[0])
                                        })
                                }}
                                showTooltip
                                showHighlight
                            />
                            :
                            <SparkLineChart
                                height={100}
                                colors={['green']}
                                data=
                                {chart.total_volumes.map((data) => {
                                    return parseFloat(data[1].toFixed(2).toString())
                                })}
                                xAxis={{
                                    scaleType: 'time',
                                    data:
                                        chart.prices.map((data) => {
                                            return new Date(data[0])
                                        })
                                }}
                                showTooltip
                                showHighlight
                            /> : ''}
                    </Box>
                </Grid2>
                {/* Bottom */}
                <Grid2>

                </Grid2>
            </Grid2>
        </>
    )
}