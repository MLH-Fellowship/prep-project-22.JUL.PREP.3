import { useEffect, useState } from 'react';
import './App.css';
import logo from './mlh-prep.png';
import { Helmet } from 'react-helmet';
import defaultBg from './assets/default.jpg';
import clear from './assets/clear.jpg';
import ash from './assets/ash.jpg';
import clouds from './assets/clouds.jpg';
import dust from './assets/dust.jpg';
import fog from './assets/fog.jpg';
import haze from './assets/haze.jpg';
import mist from './assets/mist.jpg';
import rain from './assets/rain.jpg';
import sand from './assets/sand.jpg';
import smoke from './assets/smoke.jpg';
import squall from './assets/squall.jpg';
import thunderstorm from './assets/thunderstorm.jpg';
import tornado from './assets/tornado.jpg';

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState('New York City');
    const [results, setResults] = useState(null);

    const [weatherIcon, setWeatherIcon] = useState(''); //hook for updating the weather icon
    const [background, setBackground] = useState(defaultBg); //default.jpg will be the default background picture in our assets

    const changeBackground = (result) => {
        const weather = result.weather[0].main.toLowerCase();
        const icon = result.weather[0].icon;
        setBackground(`/assets/${weather}.jpg`);
        switch (weather) {
            case 'clear':
                setBackground(`${clear}`);
                break;

            case 'ash':
                setBackground(`${ash}`);
                break;

            case 'clouds':
                setBackground(`${clouds}`);
                break;

            case 'dust':
                setBackground(`${dust}`);
                break;

            case 'fog':
                setBackground(`${fog}`);
                break;

            case 'haze':
                setBackground(`${haze}`);
                break;

            case 'mist':
                setBackground(`${mist}`);
                break;

            case 'rain':
                setBackground(`${rain}`);
                break;

            case 'sand':
                setBackground(`${sand}`);
                break;

            case 'smoke':
                setBackground(`${smoke}`);
                break;

            case 'squall':
                setBackground(`${squall}`);
                break;

            case 'thunderstorm':
                setBackground(`${thunderstorm}`);
                break;

            case 'tornado':
                setBackground(`${tornado}`);
                break;

            default:
                setBackground(`${defaultBg}`);
                break;
        }
        setWeatherIcon(icon);
    };
    useEffect(() => {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' +
                city +
                '&units=metric' +
                '&appid=' +
                process.env.REACT_APP_APIKEY
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result['cod'] !== 200) {
                        setIsLoaded(false);
                    } else {
                        setIsLoaded(true);
                        setResults(result);
                        //Inside this function we can make a switch case on results, and change the background picture
                        //to different sources based on the temperature provided
                        changeBackground(result);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [city]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <Helmet>
                    <style>{`body { background-image: url('${background}'); background-repeat: no-repeat;
  background-size: cover; }`}</style>
                </Helmet>
                <img className='logo' src={logo} alt='MLH Prep Logo'></img>
                <div>
                    <h2>Enter a city below 👇</h2>
                    <input
                        type='text'
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <div className='Results'>
                        {!isLoaded && <h2>Loading...</h2>}
                        {console.log(results)}
                        {isLoaded && results && (
                            <>
                                <h3>
                                    {results.weather[0].main}{' '}
                                    <span>
                                        <img
                                            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                                            alt='Weather Icon'
                                        />
                                    </span>
                                </h3>
                                <p>Feels like {results.main.feels_like}°C</p>
                                <i>
                                    <p>
                                        {results.name}, {results.sys.country}
                                    </p>
                                </i>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default App;
