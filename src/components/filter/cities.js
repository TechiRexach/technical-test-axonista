import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './filter';

function Cities(props){

    //DECLARE VARIABLES
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    //GET API DATA AND SET VARIABLES
    useEffect(() => {
        setLoading('Loading...')
        axios.get('https://countriesnow.space/api/v0.1/countries')
        .then(response => {
            setCountries(response.data.data)
            setSuccess('Do you want to compare?')
            setLoading(false)
        })
        .catch(err => {
            setError('Something went wrong, try again please', err)
            setTimeout(() => {
                setError('')
            }, 3000);
        })
    },[])

    //GET COUNTRY SELECTED BY THE USER
    const handleChangeCountry = (event) => {
        event.preventDefault()
        setCountry(
            event.target.value
        )
    }
    
    //GET CITIES OF THE SELECTED COUNTRY
    useEffect(() => {
        const foundCountry = countries.find(oneCountry => oneCountry.country === country)
        if(foundCountry){
            setCities(foundCountry.cities)
        }   
    },[country])

    //GET CITY SELECTED BY THE USER
    const handleSelectCity = (event) => {
        event.preventDefault()
        setCity(
            event.target.value
        )
    }

    return(
        <div>
            {loading && <h1>{loading}</h1>}
            {success && <h3>{success}</h3>}
            <div className="mb-3 country">
            <select type='text' name='countries' onChange={handleChangeCountry} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                <option defaultValue disabled>Choose a country</option>
                {countries && countries.map(oneCountry => (
                    
                    <option key={oneCountry.country} name='country' value={oneCountry.country}>{oneCountry.country}</option> 
                ))}
            </select>
            </div>
            <div className="mb-3 city">
            <select type='text' name='cities' onChange={handleSelectCity} className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option defaultValue disabled>Choose a city</option>
                {cities && cities.map(oneCity => (
                    <option key={oneCity.country} name='selectedCity' value={oneCity}>{oneCity}</option> 
                ))}
            </select>
            </div>
            {error && <h3 className='text-warning'>{error}</h3>} 
            {city && <Filter cityName={city}/>}
        </div>
    )

}

export default Cities;