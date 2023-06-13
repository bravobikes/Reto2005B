//Avatar es un componente MUI, incluir creo o ver si queda mejor con imagen normal
//avatars estan en /assets/avatars
import {
    Box,
    Grid,
    Button,
    Card,
    CardActions,
    CardHeader,
    Typography,
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
                <CardHeader title={
                    <Typography variant="h5" component="div">
{/*                     
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="gold" className="bi bi-coin" viewBox="0 0 16 16">
                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                    </svg>
                    Tienda */}
                    <Grid container spacing={1} justifyContent="space-between" flexDirection="row">
                        <Grid item>
                            Tienda
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} justifyContent="center" flexDirection="row">
                                <Grid item>
                                    {/* aqui cambiar la cantidad de monedas a las monedas que tiene el usuario */}
                                    <div sx={{width:"1.5em", height:"1.5em"}}>13</div>
                                    
                                </Grid>
                                <Grid item>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="gold" className="bi bi-coin" viewBox="0 0 16 16">
                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                    </svg>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    
                  </Typography>
                }/>
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
                    {/* agregar margin abajo de los ultimos 3 con javascript */}
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%", marginBottom:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%", marginBottom:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{marginTop:"4%", marginBottom:"4%"}}>
                        <TarjetaCompra/>
                    </Grid>
                </Grid>
           
                
                
            </Card>
   
    )
}

