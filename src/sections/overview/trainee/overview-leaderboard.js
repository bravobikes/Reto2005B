
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
  import {useState, useEffect} from 'react';
export default function Leaderboard(props) {
    const players = [{username: "algo", puntosTotales: 123, img: "/assets/avatars/avatar-alcides-antonio.png"}];
    const url = 'http://localhost:5000/getpeople';
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchInfo();
    }, []);
    const fetchInfo = async () => {
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setData(jsonData);
        } catch(error) {
            console.error('Error fetching data:',error)
        }
    }
    console.log(props.data)
    return (
            <Card sx={{height: "100%"}}>
                <CardHeader title="Leaderboard" />
                <List>
                    {data.slice(0, 5).map((item, index) => (
                        <ListItem divider={1}>
                            <Box
                            component="img"
                            src={"/assets/avatars/avatar-alcides-antonio.png"}
                            sx={{
                            borderRadius: "50%",
                            height: 48,
                            width: 48,
                            marginRight: "5%"
                            }}
                            />
                            <ListItemText primary={item.Name} secondary={`${item.Age} puntos`}/>
                        </ListItem>
                    ))}
                    
                </List>
            </Card>
        
            
   
    )
}