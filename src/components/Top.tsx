'use client'

import { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Container,
    Typography,
    MenuItem,
    Menu,
    Avatar,
    Tooltip,
    Chip
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function Top(props: any) {
    const [anchorElUser, setAnchorElUser] = useState<null>(null);
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const handleClickFAQ = () => {
        handleCloseUserMenu()
        props.handleClickFAQ()
    }
    return(
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Fastwin
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Chip
                            label={`PHP ${props.balance.toFixed(2)}`}
                            onDelete={props.handleClick}
                            deleteIcon={<AddCircleIcon style={{ color: '#ffffff' }} />}
                            variant="outlined"
                            sx={{ mr: 1, color: '#fff' }}
                        />
                        <Tooltip title="Settings">
                            <Chip
                                avatar={<Avatar alt="Profile" src={`data:image/jpeg; base64, ${props.guestPhoto}`} />}
                                label={props.user ? props.user : "-"}
                                variant="outlined"
                                onClick={handleOpenUserMenu}
                                sx={{ color: '#fff' }}
                            />
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Withdraw</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClickFAQ}>
                            <Typography textAlign="center">Help & Support</Typography>
                        </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}