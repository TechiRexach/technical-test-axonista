import { useState } from 'react';
import CurrentWeather from '../current/current';

function UserPosition(props){

    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    //GET USER LOCATION
    navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
    })
 
    return(
        <CurrentWeather latitude={lat} longitude={lon}/>
    )
}

export default UserPosition;
