'use client'

import { useState, useEffect } from 'react'
import {
    Box,
    BottomNavigation,
    BottomNavigationAction
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import { ArrList } from '@/types/types';
import { useRouter } from 'next/navigation'

export default function Bot(props: any) {
    const router = useRouter()
    const size = useWindowSize();
    
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState<object | any>({
          width: undefined,
          height: undefined,
        });
      
        useEffect(() => {
            function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            }

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowSize;
    }

    const arrList: ArrList = [
        { label: "Home", icon: <HomeIcon />, link: 'lobby' },
        { label: "Promo", icon: <RedeemIcon />, link: 'promotion' },
        { label: "Transactions", icon: <MonetizationOnIcon />, link: 'transaction' },
        { label: "Account", icon: <AccountCircleIcon />, link: 'account' }
    ]

    const handleClickLink = (e: any, link: string) => {
        e.preventDefault()
        sessionStorage.setItem('link', window.location.pathname.replace('/', ""))
        router.push(`/${link}`)
    }

    return(
        <Box sx={{ width: size.width >= 414 ? 414 : size.width, position: 'absolute', bottom: 0, zIndex: 1000 }}>
            <BottomNavigation
                showLabels
                value={props.val}
                sx={{ background: '#f8f8f8', py: 4 }}
            >
                {arrList.map((resp, index) => {
                    return(
                        <BottomNavigationAction key={index} label={resp.label} icon={resp.icon} onClick={(e) => handleClickLink(e, resp.link)} />
                    )
                })}
            </BottomNavigation>
        </Box>
    )
}