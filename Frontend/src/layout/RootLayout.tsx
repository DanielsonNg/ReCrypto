import { Box, Grid2 } from "@mui/material";
import { styled } from '@mui/material'


const StyledBox = styled(Box)(({ theme }) => ({
    height:'250px',
    width:'250px',
    backgroundColor: theme.palette.neutral?.darker
}))

export default function RootLayout() {
    return (
        <>
            <Box sx={{ bgcolor: 'secondary.dark' }}>
                <h1>TestLayout</h1>
            </Box>
            <StyledBox>
                <h1>gege</h1>
            </StyledBox>
        </>
    )
}