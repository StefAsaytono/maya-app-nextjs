
import styles from "../page.module.css";
import Topbar from '@/components/Topbar';
import Bot from '@/components/Bot';
import { Grid } from "@mui/material";

export default function Promo() {
    return(
        <>
            <main className={styles.container}>
                <Topbar title={'Promotions'} />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: '100%' }}
                >
                    No Available Promo!
                </Grid>
                <Bot val={1} />
            </main>
        </>
    )
}