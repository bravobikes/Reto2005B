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
export default function RotacionReciente() {
    return (
        <Card sx={{height:"100%"}}>
            <CardHeader title="Rotacion más reciente"/>
            <CardContent sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}>
                <Grid container flexDirection="column" spacing={4}>
                    <Grid item>
                        <Grid container flexDirection="column" spacing={2}>
                            <Grid item>
                                Calificación:
                            </Grid>
                            <Grid item>
                                <Rating name="read-only" value={3} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container flexDirection="column" spacing={2}>
                            <Grid item>
                                Comentario:
                            </Grid>
                            <Grid item>
                                Esto es un ejemplo de un comentario que alguien podria dejar, no me deja poner lorem en VSCode porque es javascript pero mas o menos se veria asi si alguien fuera a poner un comentario de la evaluacion de la rotacion
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>
                
                
            </CardContent>
        </Card>
    )
}