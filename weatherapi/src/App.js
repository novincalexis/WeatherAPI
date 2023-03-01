import { useState } from 'react';
import axios from 'axios';
import './App.css';

const Api = '07c39328eb134ed3add233858230602 ';

function App() {
  const [city, setCity] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [icon, setIcon] = useState('');
  const [isDay, setIsDay] = useState(true);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${Api}&q=${city}&lang=fr`)
    .then((response) => {
      setWeatherCondition(response.data.current.condition.text);
      setTemperature(response.data.current.temp_c);
      setWindSpeed(response.data.current.wind_kph);
      setHumidity(response.data.current.humidity);
      const date = new Date(response.data.location.localtime);
      const options = { hour: 'numeric', minute: 'numeric', hour12: false };
      setLocalTime(date.toLocaleTimeString('fr-FR', options));
      setIcon(response.data.current.condition.icon);
      setIsDay(response.data.current.is_day);
      setCountry(response.data.location.country);
      setRegion(response.data.location.region);
      

      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <header className='search'>
        <h1>Application météo</h1>
        <form onSubmit={handleFormSubmit}>
          <label>
            <input type="text" value={city} placeholder="Rechercher une ville..." onChange={handleInputChange} />
          </label>
          <button type="submit">Rechercher</button>
        </form>
        <div className='search-details'>
          {country && <p>Pays : {country}</p>}
          {region && <p>Région : {region}</p>}
        </div>
      </header>

      {weatherCondition && temperature && windSpeed && humidity && localTime && icon && (
        <div className='infos'>
          <div className='weather'>
            <img src={icon} alt="Icone condition météorologique" />
            <span>{weatherCondition}
            </span>
          </div>
          <div className='infos-weather'>
            <p>Vitesse du vent : </p><span>{windSpeed} km/h</span>
          </div>
          <div className='infos-weather'>
            <p>Température : </p><span>{temperature} degrés Celsius</span>
          </div>
          <div className='infos-weather'>
            <p>Pourcentage d'humidité : </p><span>{humidity}%</span>
          </div>
          <div className='infos-locale'>
            <span>{isDay ? 'Il fait jour' : 'Il fait nuit'}</span>
          </div>
          <div className='infos-weather'>
            <p>Heure locale : </p><span>{localTime}</span>
          </div>
        </div>
      )}

      <footer>
        <p>Application météo réalisée par <a href="https://github.com/novincalexis/WeatherAPI">Alexis NOVINC</a></p>
        <button className='modal-btn' onClick={() => setShowModal(true)}>Me contacter</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={hideModal}>&times;</span>
              <p>Envoyez-moi un email à l'adresse suivante : <a href={`mailto:contact@example.com`}>contact@example.com</a></p>
            </div>
          </div>
        )}

      </footer>
    </div>
  );
}

export default App;