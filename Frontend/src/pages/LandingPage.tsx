import { Grid2 } from "@mui/material";
import CoinTable from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import TrendingCoinCard from "../components/TrendingCoinCard";

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

type TrendingCoin = {
    id: string,
    coin_id: number,
    name: string
    symbol: string
    rank: number,
    thumb: string,
    small: string,
    large: string,
    price: Float32Array,
    score: number
}

export default function LandingPage() {
    const [coins, setCoins] = useState<Coin[]>([])
    const [loading, setLoading] = useState(false)
    const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get('http://localhost:3333/coins/lists')
                .then((response) => {
                    setCoins(response.data.coins)
                    setTrendingCoins(response.data.trendingCoins)
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

                <Grid2 container flexDirection={'column'}>
                    <h2>Trending Coins</h2>
                    <Grid2 container flexDirection={'row'} gap={2}>
                        {trendingCoins.length > 0 ? trendingCoins.map((coin) => (
                            <Grid2 size={2} sx={{
                                borderBlock: 'solid 0.5px gray',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                width:'fit-content',
                                minWidth:'150px',
                                padding:'4px'
                            }}>
                                <TrendingCoinCard
                                    id={coin.id}
                                    small={coin.small}
                                    price={coin.price}
                                    symbol={coin.symbol}
                                    key={coin.id}
                                    rank={coin.rank}
                                    coin_id={coin.coin_id}
                                    name={coin.name} />
                            </Grid2>
                        )) : ''}
                    </Grid2>
                </Grid2>}
            <Grid2 container>
                <h2>Crypto Coin List</h2>
                <CoinTable coins={coins} />
            </Grid2>
        </>
    )
}