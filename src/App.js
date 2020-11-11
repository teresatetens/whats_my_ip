import React, { useState, useEffect} from 'react';
import './App.css';
import { Grid } from "@material-ui/core";
import Header from './Header';
import MapView from './MapView';
import CountryView from './CountryView';
import Content from './Content';


const App = () => {
  const [userData, setUserData] = useState(null);  
  console.log({userData: userData})

  // alt const myIpUrl = 'https://geo.ipify.org/api/v1?apiKey=at_Fnw1c1PCQgTZaDiSipFrHGqv4ds8v'
  const myIpUrl = 'https://geo.ipify.org/api/v1?apiKey=at_zWWkYf0iupaITlxj6wnkkUtme0WyQ'
  useEffect(() => {
    fetch(myIpUrl)
      .then(res => res.json())
      .then((data) => setUserData(data))
      .catch(error => console.error('ERROR', error))
  },[])


  return (
    <>
      <Grid container direction = "column">
          <Grid item>
                  {userData &&
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
      </div> 
    </>
  ); 
}
export default App;