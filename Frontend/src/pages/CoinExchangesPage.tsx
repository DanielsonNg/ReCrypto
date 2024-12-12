import { Grid2 } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ExchangesTable from "../components/ExhangesTable"

export type Exchange = {
    rank: number,
    id: string,
    name: string,
    image: string,
    volume24: number,
    volume24normalized:number,
    year: number,
    trust: number,
}

export default function CoinExchangesPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [exchanges, setExchanges] = useState<Exchange[]>([])

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get(`http://localhost:3333/exchanges`)
                .then((response) => {
                    setExchanges(response.data.exchanges)
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
                    <h2>Exchanges List</h2>
                    <ExchangesTable exchanges={exchanges} />
                </Grid2>}
        </>
    )
}