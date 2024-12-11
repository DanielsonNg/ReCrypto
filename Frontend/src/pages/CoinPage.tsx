import { Box, Button, Grid2, styled } from '@mui/material';
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { axisClasses, LineChart, lineElementClasses } from '@mui/x-charts';
import { blue, red } from '../lib/index';

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

type ChartType = 'price' | 'marketcap'

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
            <Grid2 direction={'column'} container rowGap={5}>
                {/* Top */}
                {coin && <Grid2 container direction={'row'} sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                    <img style={{ width: '100px', height: '100px' }} src={coin.image}></img>
                    <h2>{coin.name}</h2> <h3 style={{ fontWeight: 'lighter' }}>{coin.symbol}</h3>
                    <h2>#{coin.market_cap_rank}</h2>
                </Grid2>}

                {/* Mid */}
                <Grid2 container flexDirection={'column'} rowGap={10} sx={{ padding: '20px' }}>
                    <Grid2 sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Grid2 container gap={5} flexDirection={'row'}>
                            <h2>Price ${chart ? chart.prices[0][1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 'Price Unavailable'}</h2>
                            <h2>MarketCap ${chart ? chart.market_caps[0][1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 'Market Cap Unavailable'}</h2>
                        </Grid2>
                        <Grid2 container columnGap={4} direction={'row'} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button sx={{ borderRadius: '5px', height: '40px'}}  onClick={() => handleChartButton('price')}>Price</Button>
                            <Button sx={{ borderRadius: '5px', height: '40px'}}  onClick={() => handleChartButton('marketcap')}>MarketCap</Button>
                            {/* <Button variant="contained" color="success" onClick={() => handleChartButton('volume')}>Volume</Button> */}
                        </Grid2>
                    </Grid2>
                    <Box sx={{ flexGrow: 1 }}>
                        {chart ?
                            chartType === 'price' ?
                                <>
                                    <SparkLineChart
                                        height={200}
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
                                        sx={{
                                            [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                                                display: 'none',
                                            },
                                        }}

                                    />
                               
                                </>
                                :
                                <>
                                    <SparkLineChart
                                        height={200}
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
                                </>
                            : ''}
                        {chart &&
                            <>
                                <LineChart
                                    colors={['green']}
                                    height={200}
                                    series={[{
                                        data: chart.total_volumes.map((data) => {
                                            return parseFloat(data[1].toFixed(2).toString())
                                        }), area: true, showMark: false
                                    }]}
                                    xAxis={[{
                                        scaleType: 'point', data: chart.total_volumes.map((data) => {
                                            return new Date(data[0])
                                        }),

                                        label: 'Volume'
                                    }]}
                                    sx={{
                                        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                                            display: 'none',
                                        },
                                        [`& .${lineElementClasses.root}`]: {
                                            display: 'none',
                                        },
                                        // marginLeft:'100px',
                                        // paddingLeft:'50px'
                                    }}
                                />

                            </>
                        }
                    </Box>
                </Grid2>
                {/* Bottom */}
                <Grid2 sx={{ padding: '50px' }}>
                    {coin && <Grid2>
                        <h2>About {coin.name}</h2>
                        {coin ? <div dangerouslySetInnerHTML={{ __html: coin.description }}></div> : 'Coin description not found'}
                    </Grid2>}
                </Grid2>
            </Grid2>
        </>
    )
}