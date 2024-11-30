import { Grid2 } from "@mui/material";

type TrendingCoinProps = {
    small: string,
    id: string,
    coin_id: number,
    rank: number,
    price: Float32Array,
    symbol: string,
    name: string
}

export default function TrendingCoinCard({ small, id, coin_id, rank, price, symbol, name }: TrendingCoinProps) {
    return (
        <>
            <Grid2 sx={{ display: 'flex', alignItems: 'center'}} gap={1}>
                <img style={{ borderRadius: '10px', height: '100%' }} src={small}></img>
                <Grid2 flexDirection={'column'} >
                    {symbol} # {rank}
                    {/* <Grid2>
                        {symbol}
                    </Grid2>
                    <Grid2>
                        #{rank}
                    </Grid2> */}
                </Grid2>
            </Grid2>
        </>
    )
}