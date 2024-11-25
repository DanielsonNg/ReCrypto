import { Grid2 } from "@mui/material";
import CoinTable from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";

export type Coin = {
    id: string,
    rank: number,
    name: string,
    symbol: string,
    image: string,
    price: number,
    price24: number,
    marketCap: number,
    marketCap24: number
}

export default function LandingPage() {
    const [coins, setCoins] = useState<Coin[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.post('http://localhost:3333/coins/lists')
                .then((response) => {
                    setCoins(response.data)
                    setLoading(false)
                })
        })()
    }, [])

    return (
        <>
            {loading ?
                <>
                <h1>Loading...</h1>
                </> 
                :

                <Grid2 container>
                    <h2>Crypto Coin List</h2>
                    <CoinTable coins={coins} />
                </Grid2>}
        </>
    )
}