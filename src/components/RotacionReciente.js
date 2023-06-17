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
  import {useEffect, useState} from 'react';
  import axios from 'axios';

export default function RotacionReciente() {

    const id = localStorage.getItem('sessionUser');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [data, setData] = useState([]);
    const [ultimaRotacion, setUltimaRotacion] = useState([]);
  
    const [isLoading, setIsLoading] = useState(true);
  
    const getHistorialUrl = `http://localhost:5000/getHistoricoTrainee/${id}`;
  
  
    useEffect(() => {
    
      const fetchData = async () => {
        try {
          const response = await axios.get(getHistorialUrl);
            setData(response.data); 
          setUltimaRotacion(response.data[response.data.length-1]);
          console.log(ultimaRotacion);
          setIsLoading(false); 
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false); 
        }
      };
    
      fetchData();
    }, []);

    function calculateFechaFin(fechaInicial, dias) {
        const initialDate = new Date(fechaInicial);
        const fechaFin = new Date(initialDate.getTime() + (dias * 24 * 60 * 60 * 1000));
        return fechaFin.toLocaleDateString();
      }

    if (isLoading) {
        return <p>Loading...</p>; 
      }

    return (
        <Card sx={{height:"100%"}}>
            <CardHeader title="Rotación más reciente"/>
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
                                <Rating name="read-only" value={ultimaRotacion.calificacion} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container flexDirection="column" spacing={2}>
                            <Grid item>
                                Comentario:
                            </Grid>
                            <Grid item>
                                {ultimaRotacion.comentario}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                            <Grid container flexDirection="row" justifyContent="space-between" style={{color:"grey"}}>
                                <Grid item>
                                    Fecha inicial: {calculateFechaFin(ultimaRotacion.fechaInicial, 0)}
                                </Grid>
                                <Grid item>
                                    Fecha fin: {calculateFechaFin(ultimaRotacion.fechaInicial, 20)}
                                </Grid>
                            </Grid>
                        </Grid>
                    
                    
                </Grid>
                
                
            </CardContent>
        </Card>
    )
}