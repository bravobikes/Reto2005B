import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Rating,
    CardHeader,
    Divider,
    Grid,
    Typography
  } from '@mui/material';
export default function HistRotaciones() {
    return (
        <Card style={{marginTop:"5%"}}>
            <CardHeader title="Rotaciones historicas"/>
            <CardContent sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}>
                {/* poner un Grid con las cosas que quiero agregar */}
                <Card style={{padding:"2%", width:"100%"}}>
                    <Grid container flexDirection="column" spacing={2}>
                        <Grid item>
                            <Grid container flexDirection="row" justifyContent="space-between">
                                <Grid item>
                                <span style={{fontWeight:"bold"}}>Nombre de la rotacion</span>
                                </Grid>
                                <Grid item>
                                    <Rating name="read-only" value={3} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>Esto es otro comentario pero para una de las rotaciones historicas</span>
                        </Grid>
                        <Grid item>
                            <Grid container flexDirection="row" justifyContent="space-between" style={{color:"grey"}}>
                                <Grid item>
                                    Fecha inicial: 08/09/2002
                                </Grid>
                                <Grid item>
                                    Fecha fin: 05/11/2016
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                
            </CardContent>
        </Card>
    )
}