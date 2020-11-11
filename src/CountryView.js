import React, { useState, useEffect} from 'react';
import {DateTime} from 'luxon';

const CountryView = ({userData}) => {
    const userCode = userData.location.country
    const [countryInfo, setCountryInfo] =useState(null);
    //console.log({country: countryInfo})

    const myTime = DateTime.local();
    //console.log({Time: myTime});

 
    const countryUrl = `https://restcountries.eu/rest/v2/alpha/${userCode}`

    useEffect(() => {
    fetch(countryUrl)
        .then(res => res.json())
        .then((data) => setCountryInfo(data))
        .catch(error => console.error('ERROR', error))
    },[])

    return(
    <>
        <div>
            { countryInfo &&
            <>
                <img className = "flag" src = {countryInfo.flag} alt = "flag"/>
                <p>Country Code: {countryInfo.altSpellings[0]}</p>
                <p>Official name: {countryInfo.altSpellings[1]}</p>
                <p>In {countryInfo.languages[0].name} it is called {countryInfo.altSpellings[2]}</p>
                <p>The capital is {countryInfo.capital}</p>
                <p>Local time: {myTime.c.year}-{myTime.c.month}-{myTime.c.day} {myTime.c.hour}:{myTime.c.minute}:{myTime.c.second} </p>
            </>
            }
        </div>        
    </>
    )
}
export default CountryView;