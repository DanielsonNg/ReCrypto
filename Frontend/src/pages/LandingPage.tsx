import { Grid2 } from "@mui/material";
import CoinTable from "../components/Table";

export default function LandingPage() {
    return (
        <>
            <Grid2 container>
                <h2>Crypto Coin List</h2>
                <CoinTable />
            </Grid2>
        </>
    )
}