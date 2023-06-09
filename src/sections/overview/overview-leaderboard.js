//Avatar es un componente MUI, incluir creo o ver si queda mejor con imagen normal
//avatars estan en /assets/avatars
import {
    Box,
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
    <Card sx={{height: "100%"}}>
        <CardHeader title="Leaderboard" />
        <List>
            
        </List>
    </Card>
    )
}