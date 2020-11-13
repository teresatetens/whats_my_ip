import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import {DateTime} from 'luxon';
import Grid from '@material-ui/core/Grid';
import { TileLayer, MapContainer } from 'react-leaflet';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import MapView from './MapView';
import CountryView from './CountryView';
import Content from './Content';

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
  const myIpUrl = 'https://geo.ipify.org/api/v1?apiKey=at_zWWkYf0iupaITlxj6wnkkUtme0WyQ'
  const myTime = DateTime.local();
  const [userData, setUserData] = useState();  
  console.log({userData: userData})

  const {ip, lat, lng, city, flag, countryCode, officialName, language, originalName, capital} = userData;
  const position = [lat, lng]


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
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <MapContainer center={userData && position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
    </Grid>
      {/* <Grid container direction = "column">
          <Grid item>
                  {userData && // userData.isLoaded && does not work
                  <Header userData = {userData}/>
                  }
          </Grid>
          <Grid item>
              <Grid item xs = {false} sm = {2}/>
              <Grid item xs = {12} sm = {6}>
                  {userData &&
                  <Content userData = {userData}/>
                  }
              </Grid>
              <Grid item xs = {false} sm = {2}/>
          </Grid>
      </Grid> 
      <div className = "myMap">
            {userData &&
            <>
                <MapView userData = {userData}/>
            </>
            }
      </div> 
      <div className = "myCountry">
            {userData &&
            <>
                <CountryView userData = {userData}/>
            </>
            }
      </div>  */}
  
    {/* <div className={classes.root}>
      <Paper className={classes.paper}>
      { userData &&   
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
      }
        <Grid container spacing={2}>
          <Grid item>
          { userData &&  
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={flag} />
            </ButtonBase>
          }
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              { userData &&  
              <>
                <Typography gutterBottom variant="subtitle1">
                    Your IP Address is: {ip}             
                </Typography>
                <Typography variant="body2" gutterBottom>
                    You live in {city}, {officialName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    In {language}, {originalName}
                </Typography>
                </>
              }
              </Grid>
              <Grid item>
              { userData && 
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Your Coordinates: {lat}, {lng}
                </Typography>                
              }
              </Grid>
            </Grid>
            <Grid item>
            { userData && 
              <Typography variant="subtitle1">
                  {countryCode}
              </Typography>              
              }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div> 
  }  */}
  </>
  ); 
}
export default App;