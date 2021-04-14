import axios from 'axios';
import { APIKEY } from '../constants/apikey';
import { useState, useEffect } from 'react';
import moment from 'moment';


function Filter({cityName}){

    //SET THE CITY CHOSEN BY THE USER
    const selectedCity = cityName;

    //DECLARE VARIABLES
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [feels, setFeels] = useState('');
    const [humidity, setHumidity] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [clouds, setClouds] = useState('');
    const [weather, setWeather] = useState([]);
    const [speed, setSpeed] = useState('');
    const [error, setError] = useState('');
   
    //GET API DATA ACCORDING TO THE USER'S CHOICE AND SET VARIABLES
    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${APIKEY}`)
        .then(response => {
            setCountry(response.data.sys.country)
            setCity(response.data.name)

            const date = new Date(response.data.dt*1000).toLocaleDateString()
            setDate(date)

            setTemperature(response.data.main.temp)
            setFeels(response.data.main.feels_like)
            setHumidity(response.data.main.humidity)

            const sunrise = moment(response.data.sys.sunrise*1000).format('LTS')
            setSunrise(sunrise)

            const sunset = moment(response.data.sys.sunset*1000).format('LTS')
            setSunset(sunset)

            setClouds(response.data.clouds.all)
            setWeather(response.data.weather)
            setSpeed(response.data.wind.speed)
        })
        .catch(err => {
            setError(err.response.message)
            setTimeout(() => {
                setError('')
            }, 3000);
        })
    },[selectedCity])

    return(
        <div>
            {error && <h3 className='text-warning'>{error}</h3>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colSpan="2"> 
                            <h3 className='alert currentLocation'>{city} / {country} </h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <th>Temperature</th>
                        <td>{temperature}&deg;C</td>
                    </tr>
                    <tr>
                        <th>Feels like</th>
                        <td>{feels}&deg;C</td>
                    </tr>
                    <tr>
                        <th>Humidity</th>
                        <td>{humidity} %</td>
                    </tr>
                    <tr>
                        <th >Wind</th>
                        <td>{speed} m/s</td>
                    </tr>
                    <tr>
                        <th>Cloudiness</th>
                        <td>{clouds}%</td>
                    </tr>
                    <tr>
                        {weather.map(inclemency => (<th key={inclemency.id}>{inclemency.main}</th>))}
                        {weather.map(inclemency => (<td key={inclemency.id}>{inclemency.description}</td>))}
                    </tr>
                    <tr>
                        <th>Sunrise</th>
                        <td>{sunrise}</td>
                    </tr>
                    <tr>
                        <th>Sunset</th>
                        <td>{sunset}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Filter;