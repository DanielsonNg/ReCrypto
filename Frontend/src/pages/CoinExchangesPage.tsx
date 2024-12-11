import { Grid2 } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ExchangesTable from "../components/ExhangesTable"

export default function CoinExchangesPage() {
    const [loading, setLoading] = useState(false)
    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        // axios.
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
                    {/* <ExchangesTable exchanges={exchanges} /> */}
                </Grid2> }
        </>
    )
}