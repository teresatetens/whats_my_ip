import React, { useState, useEffect} from 'react';
import {DateTime} from 'luxon';

const CountryView = ({userData}) => {
    const {flag, countryCode, officialName, language, originalName, capital} = userData;
      //console.log({country: countryInfo})

    const myTime = DateTime.local();
    //console.log({Time: myTime});

 
    // const countryUrl = `https://restcountries.eu/rest/v2/alpha/${userCode}`

    // useEffect(() => {
    // fetch(countryUrl)
    //     .then(res => res.json())
    //     .then((data) => setCountryInfo(data))
    //     .catch(error => console.error('ERROR', error))
    // },[])

    return(
    <>
        <div>
            { userData &&
            <>
                <img className = "flag" src = {flag} alt = "flag"/>
                <p>Country Code: {countryCode}</p>
                <p>Official name: {officialName}</p>
                <p>In {language} it is called {originalName}</p>
                <p>The capital is {capital}</p>
                <p>Local time: {myTime.c.year}-{myTime.c.month}-{myTime.c.day} {myTime.c.hour}:{myTime.c.minute}:{myTime.c.second} </p>
            </>
            }
        </div>        
    </>
    )
}
export default CountryView;