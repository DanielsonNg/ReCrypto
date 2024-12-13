import { Grid2 } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import NFTTable from "../components/NFTTable"

export type NFT = {
    asset_platform_id: 'string',
    contract_address: 'string',
    id: 'string',
    name: 'string',
    symbol: 'string'
}

export default function NftsPage() {
    const [nfts, setNfts] = useState<NFT[]>()

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:3333/nfts')
            setNfts(response.data)
        })()
    }, [])

    return (
        <>
            <Grid2 container flexDirection={'column'} >
                <Grid2>
                    <h2>NFT List</h2>
                </Grid2>
                <Grid2>
                    {nfts ? <NFTTable nfts={nfts} />
                        : 'NFT Unavailable....'}
                </Grid2>

            </Grid2>
        </>
    )
}