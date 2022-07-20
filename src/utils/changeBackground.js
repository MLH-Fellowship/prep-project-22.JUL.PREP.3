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
    const weatherMetaData = {}
    switch (weather) {
        case 'clear':
            weatherMetaData.backgroundImg=clear
            break;

        case 'ash':
            weatherMetaData.backgroundImg=ash
            break;

        case 'clouds':
            weatherMetaData.backgroundImg=clouds
            break;

        case 'dust':
            weatherMetaData.backgroundImg=dust
            break;

        case 'fog':
            weatherMetaData.backgroundImg=fog
            break;

        case 'haze':
            weatherMetaData.backgroundImg=haze
            break;

        case 'mist':
            weatherMetaData.backgroundImg=mist
            break;

        case 'rain':
            weatherMetaData.backgroundImg=rain
            break;

        case 'sand':
            weatherMetaData.backgroundImg=sand
            break;

        case 'smoke':
            weatherMetaData.backgroundImg=smoke
            break;

        case 'squall':
            weatherMetaData.backgroundImg=squall
            break;

        case 'thunderstorm':
            weatherMetaData.backgroundImg=thunderstorm
            break;

        case 'tornado':
            weatherMetaData.backgroundImg=tornado
            break;

        default:
            weatherMetaData.backgroundImg=defaultBg
            break;
    }
    weatherMetaData.weatherIcon=icon

    return weatherMetaData;
};
export default changeBackground;