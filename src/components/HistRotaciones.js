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

export default function HistRotaciones() {

    const id = localStorage.getItem('sessionUser');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [data, setData] = useState([]);
    // const courses = useCourses(data, page, rowsPerPage);
    // const coursesIds = useCoursesIds(courses);
    // const coursesSelection = useSelection(coursesIds);
  
    const [isLoading, setIsLoading] = useState(true);
  
    const getHistorialUrl = `http://localhost:5000/getHistoricoTrainee/${id}`;
  
  
    useEffect(() => {
      // console.log('Before fetch:', data);
    
      const fetchData = async () => {
        try {
          const response = await axios.get(getHistorialUrl);
          setData(response.data); // Update state using the previous state
          // console.log('After setData:', response.data[response.data.length-1]);
          setIsLoading(false); // Update loading state
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false); // Update loading state even if an error occurs
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
        return <p>Loading...</p>; // Add a loading state while the id is undefined
      }

    return (
        <Card style={{marginTop:"5%"}}>
            <CardHeader title="Rotaciones historicas"/>
            <CardContent sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}>
                {/* poner un Grid con las cosas que quiero agregar */}


                {data.map((rotacion, index) => (
                <Card style={{padding:"2%", width:"100%", marginBottom:5}}>

                    <Grid container flexDirection="column" spacing={2}>
                        <Grid item>
                            <Grid container flexDirection="row" justifyContent="space-between">
                                <Grid item>
                                <span style={{fontWeight:"bold"}}>Calificacion</span>
                                </Grid>
                                <Grid item>
                                    <Rating name="read-only" value={rotacion.calificacion} readOnly />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>{rotacion.comentario}</span>
                        </Grid>
                        <Grid item>
                            <Grid container flexDirection="row" justifyContent="space-between" style={{color:"grey"}}>
                            <Grid item>
                                    {/* Fecha inicial: 08/09/2002 */}
                                    Fecha inicial: {calculateFechaFin(rotacion.fechaInicial, 0)}
                                </Grid>
                                {/* con javascript hacer que esto no se vea si no tiene fecha fin */}
                                <Grid item>
                                    Fecha fin: {calculateFechaFin(rotacion.fechaInicial, 20)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                    ))}



                
            </CardContent>
        </Card>
    )
}