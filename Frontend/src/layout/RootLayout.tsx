import { Box, Grid2, Typography } from "@mui/material";
import { styled } from '@mui/material'


const StyledBox = styled(Box)(({ theme }) => ({
    height: '250px',
    width: '250px',
    backgroundColor: theme.palette.neutral?.darker
}))

export default function RootLayout() {
    return (
        <>
            <Box sx={{ bgcolor: 'secondary.dark' }}>
                <Typography variant="h3" color="primary">Test</Typography>
            </Box>
            <div>Test</div>
            <Typography>Test</Typography>
            <StyledBox>
                <h1>gege</h1>
            </StyledBox>
        </>
    )
}