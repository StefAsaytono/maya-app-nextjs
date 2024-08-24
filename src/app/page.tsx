"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Stack, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styles from "./page.module.css"
import LoadingIcon from "@/assets/png/loading-logo.png"
import ShineFX from "@/assets/png/shine.png"
import PagcorLogo from "@/assets/png/pagcor.png"
import Image from "next/image";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    position: "relative",
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#c0d5ff",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: "linear-gradient(73deg, rgba(2,0,36,1) 0%, rgba(59,62,161,1) 59%, rgba(136,46,172,1) 77%, rgba(188,22,180,1) 99%)"
    },
  }));

const page = () => {
    const router = useRouter()
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
              router.push("/lobby");
              clearInterval(timer);
              return 100;
            } else {
              return prevProgress + 10;
            }
          });
        }, 800);
        return () => {
          clearInterval(timer)
        };
    }, []);

  return (
    <div className={styles.container}>
        <Box 
            sx={{ 
                width: "100%", 
                height: "100%",  
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(231,227,24,1) 0%, rgba(128,13,14,1) 24%, rgba(11,0,203,1) 100%)" 
                }}
            >
                <Stack direction="column" spacing={1} sx={{ mt: -10 }}>
                    <Box sx={{ position: "relative" }}>
                        <Image
                            src={ShineFX}
                            alt="shine"
                            loading="lazy"
                            className="rotate"
                            style={{ width: "100%", height: "auto", position: "absolute" }}
                        />
                        <Image
                            src={LoadingIcon}
                            alt="Loading Icon"
                            loading="lazy"
                            style={{ width: '100%', height: 'auto', borderRadius: '5px', position: "relative", zIndex: "1" }}
                        />
                    </Box>
                    <Box sx={{ px: 5 }}>
                        <BorderLinearProgress className="shine" variant="determinate" value={progress} />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "white", mt: 5 }}>
                            Licensed by:
                        </Typography>
                        <Image 
                            src={PagcorLogo}
                            alt="PAGCOR Logo"
                            loading="lazy"
                            style={{ width: '80px', height: 'auto', borderRadius: '5px', marginTop: 5 }}
                        />
                    </Box>
                </Stack>
        </Box>
    </div>
  )
}

export default page