import defaultBg from '../assets/default.jpg';
import clear from '../assets/clear.jpg';
import ash from '../assets/ash.jpg';
import clouds from '../assets/clouds.jpg';
import dust from '../assets/dust.jpg';
import fog from '../assets/fog.jpg';
import haze from '../assets/haze.jpg';
import mist from '../assets/mist.jpg';
import rain from '../assets/rain.jpg';
import sand from '../assets/sand.jpg';
import smoke from '../assets/smoke.jpg';
import squall from '../assets/squall.jpg';
import thunderstorm from '../assets/thunderstorm.jpg';
import tornado from '../assets/tornado.jpg';

const changeBackground = (result, setBackground, setWeatherIcon) => {
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
export default changeBackground;