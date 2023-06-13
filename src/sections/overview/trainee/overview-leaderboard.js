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
            <Card sx={{height: "100%"}}>
                <CardHeader title="Leaderboard" />
                <List>
                    {/* usar una funcion para checar que no sea el ultimo ListItem cuando tenga arreglo */}
                    <ListItem divider={1}>
                        <ListItemAvatar>
                            <Box
                            component="img"
                            src={"/assets/avatars/avatar-alcides-antonio.png"}
                            sx={{
                            borderRadius: "50%",
                            height: 48,
                            width: 48
                            }}
                        />
                        </ListItemAvatar>
                        <ListItemText primary="sebramirez" secondary="500 puntos"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Box
                             component="img"
                            //  cambiar el src de cada uno de estos a la propiedad del objeto
                             src={"/assets/avatars/avatar-anika-visser.png"}
                             sx={{
                                borderRadius: "50%",
                                height:48,
                                width:48
                             }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary="idk" secondary="100 puntos" />
                    </ListItem>
                </List>
            </Card>
        
            
   
    )
}