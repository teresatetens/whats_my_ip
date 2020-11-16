import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
//Map related
import 'leaflet/dist/leaflet.css';
import { TileLayer, MapContainer } from 'react-leaflet';
import Leaflet from 'leaflet';
//Time 
import {DateTime} from 'luxon';
//Style with Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
require('dotenv').config()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  const apiKey = process.env.REACT_APP_IPIFY_API_KEY
  const myIpUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`
  
  const [userData, setUserData] = useState();  
  console.log({userData: userData})

  useEffect(() => {
    const ipData = axios.get(myIpUrl);    
    const countryData = ipData.then((result)=>
                        axios.get(`https://restcountries.eu/rest/v2/alpha/${result.data.location.country}`)
    )
    console.log({ipData: ipData})
    console.log({countryData: countryData})
    return Promise.all([ipData, countryData]).then(([ip, country]) => {
        setUserData({
          ip: ip.data.ip,
          lat:ip.data.location.lat,
          lng:ip.data.location.lng,
          city:ip.data.location.city,
          flag:country.data.flag,
          countryCode:country.data.altSpellings[0],
          officialName:country.data.altSpellings[1],
          originalName:country.data.altSpellings[2],
          language:country.data.languages[0].name,
          capital:country.data.capital,
          isLoaded: true
        });
      })
  },[])

  return (
  <>
  {userData && (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation = {3}>   
        <Grid container style={{paddingBottom:10}} >    
            <MapContainer center={[userData.lat, userData.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={userData.flag} />
              </ButtonBase>          
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                      Your IP Address is: {userData.ip}             
                  </Typography>
                  <Typography variant="body2" color="textSecondary" >
                      You live in {userData.city}, {userData.officialName}.
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      In {userData.language}, it is called: '{userData.originalName}'.
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      Now is {DateTime.local().toLocaleString()}, {DateTime.local().toLocaleString(DateTime.TIME_SIMPLE)}.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary" style={{ cursor: 'pointer' }}>
                      Your Coordinates: {userData.lat}, {userData.lng}
                  </Typography>                
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                    {userData.countryCode}
                </Typography>              
              </Grid>
            </Grid>
          </Grid>
      </Paper>
    </div> 
    )}  
  </>
  ); 
}
export default App;