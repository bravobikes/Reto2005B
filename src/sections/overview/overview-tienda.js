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
import { TarjetaCompra } from 'src/components/TarjetaCompra';
export default function Tienda() {
    const players = [{username: "algo", puntosTotales: 123, img: "/assets/avatars/avatar-alcides-antonio.png"}];
    return (        
            <Card sx={{height:"100%"}}>
                <CardHeader title="Tienda"/>
                <Grid container sx={{marginLeft:"1.5%"}}>
                    {/* creo que mejos, si no es los primeros 3 no agregar margin pero puede que se vea bien no se */}
                    <Grid item xs={12} sm={4}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                </Grid>
           
                
                
            </Card>
   
    )
}



