'use client'

import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'

export default function Topbar(props: any) {
    const router = useRouter()
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon onClick={() => router.push(`/${sessionStorage.getItem('link') === null ? 'lobby' : sessionStorage.getItem('link') }`) } />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}