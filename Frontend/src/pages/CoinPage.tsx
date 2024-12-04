import { Grid2 } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Coin = {
    name: string,
    symbol: string,
    image:string,
    description: string,
    market_cap_rank: number,
}

export default function CoinPage() {
    const { id } = useParams()
    const [coin, setCoin] = useState<Coin | null>()

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:3333/coin?coinID=${id}`)
            setCoin(response.data.general)
            console.log(response.data)
        })()
    }, [])


    return (
        <>
            {coin && <Grid2 direction={'column'} container>
                {/* Top */}
                <Grid2 container direction={'row'} sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                    <img style={{ width: '150px', height: '150px' }} src={coin.image}></img>
                    <h1>{coin.name}</h1> <h2 style={{ fontWeight: 'lighter' }}>{coin.symbol}</h2>
                </Grid2>
                <Grid2>

                </Grid2>
                {/* Mid */}
                <Grid2>

                </Grid2>
                {/* Bottom */}
                <Grid2>

                </Grid2>
            </Grid2>}
        </>
    )
}