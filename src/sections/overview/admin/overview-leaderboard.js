//Avatar es un componente MUI, incluir creo o ver si queda mejor con imagen normal
//avatars estan en /assets/avatars
import {
    Box,
    Grid,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon
  } from '@mui/material';
export default function Leaderboard() {
    const players = [{username: "algo", puntosTotales: 123, img: "/assets/avatars/avatar-alcides-antonio.png"}];
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
            <Card sx={{height: "100%"}}>
                <CardHeader title="Leaderboard" />
                <List>
                    <ListItem divider={1}>
                        <ListItemText primary="sebramirez" secondary="500 puntos"/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="idk" secondary="100 puntos" />
                    </ListItem>
                </List>
            </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
            <Card sx={{height:"100%"}}>
                <CardHeader title="Cursos/Instrucciones?"/>
                <List>
                    <ListItem>
                        
                    </ListItem>
                </List>
            </Card>
        </Grid>
            
    </Grid>
   
    )
}