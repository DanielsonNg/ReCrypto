import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2, Pagination, PaginationProps, TableHead } from '@mui/material';
import cg from '../assets/CG.png'
import { useNavigate } from 'react-router-dom';
import { NFT } from '../pages/NftsPage';

type NFTProps = {
    nfts: NFT[]
}

export default function NFTTable({ nfts }: NFTProps) {
    const [page, setPage] = React.useState(0);
    const [nftPerPage, setRowsPerPage] = React.useState(25);

    const handleChange: PaginationProps['onChange'] = (event, value) => {
        setPage(value - 1);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * nftPerPage - nfts.length) : 0;

    const navigate = useNavigate()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>NFT</TableCell>
                        <TableCell>Ecosystem</TableCell>
                        <TableCell>Contract Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(nftPerPage > 0
                        ? nfts.slice(page * nftPerPage, page * nftPerPage + nftPerPage)
                        : nfts
                    ).map((nft, index) => (
                        <TableRow key={nft.id} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/nft/${nft.id}`)}>
                            <TableCell component="th" scope="row" style={{ width: 10 }}>
                                {index + 1}
                            </TableCell>
                            <TableCell style={{ width: '30px' }} >
                                <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {nft.name} {nft.symbol}
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: 30 }} >
                                {nft.asset_platform_id}
                            </TableCell>
                            <TableCell>
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {nft.contract_address?.length >= 1 ? nft.contract_address : 'Address Unavailable'}
                                </Grid2>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align='right' width={'100%'} colSpan={5}>
                            <Pagination
                                sx={{
                                    display: 'flex', justifyContent: 'center'
                                }}
                                count={nfts.length / nftPerPage}
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell onClick={() => window.open('https://www.coingecko.com/en/api')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '150px', cursor: 'pointer' }} colSpan={1}> Powered by nftGecko  <img src={cg} loading='lazy' style={{ width: '30px' }} /></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
}
