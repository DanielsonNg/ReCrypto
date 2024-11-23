import { Grid2 } from "@mui/material";
import CoinTable from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";

export type Coin = {
    id:string,
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

    useEffect(() => {
        (async () => {
            await axios.post('http://localhost:3333/coins/lists')
                .then((response) => {
                    setCoins(response.data)
                })
        })()
    }, [])

    return (
        <>
            <Grid2 container>
                <h2>Crypto Coin List</h2>
                <CoinTable coins={coins} />
            </Grid2>
        </>
    )
}