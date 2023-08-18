import { useState, useEffect } from "react";
import Search from './Search';
import Result from './Result';
import Info from './Info';
import Loading from './Loading';
import NoResults from './NoResults';
import Geolocation from './Geolocation';
import Map from './Map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons/faCity';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';

const Main = () => {

        const [cities, setCities] = useState([]);
        const [citiesResults, setCitiesResults] = useState<any>([]);
        const [keyword, setKeyword] = useState<string>("");
        const [showDeleteKeywordButton, setShowDeleteKeywordButton] = useState<boolean>(false);
        const [coordinates, setCoordinates] = useState<any>("");
        const [currentWeather, setCurrentWeather] = useState<any>([]);
        const [currentWeatherDiv, setCurrentWeatherDiv] = useState<any>();
        const [forecastWeather, setForecastWeather] = useState<any>([]);
        const [forecastWeatherDiv, setForecastWeatherDiv] = useState<any>();
        const [mapCoords, setMapCoords] = useState<any>();
        const [mapDiv, setMapDiv] = useState<any>();

        const handleChange = (e: any) => {
                let value = e.target.value;
                setKeyword(value);
        }

        const getCoords = (lt: any, ln: any) => {
                const ltPlusLn = '' + lt + ',' + ln + '';
                setCoordinates(ltPlusLn);
                removeKeyword();
        }

        const removeKeyword = () => {
                setKeyword("");
        }

        useEffect(() => {
                if (keyword.length > 0) {
                        setCitiesResults(<Loading />);
                        setShowDeleteKeywordButton(true);
                        let url = 'http://api.weatherapi.com/v1/search.json?key=cfb427d15f6e4de9951181216232004&q=' + keyword;
                        fetch(url)
                                .then(response => {
                                        return response.json()
                                })
                                .then(data => {
                                        setCities(data); console.log(data);
                                })
                } else {
                        setCitiesResults("");
                        setShowDeleteKeywordButton(false);
                }
        }, [keyword]);

        useEffect(() => {
                if (keyword.length > 0) {
                        if (cities.length > 0) {
                                setCitiesResults(cities.map((ct: any) => (<Result city={ct.name} country={ct.country} coordsFunction={() => getCoords(ct.lat, ct.lon)} />)));
                        } else {
                                setCitiesResults(<NoResults />);
                        }
                } else {
                        setCitiesResults("");
                }
        }, [cities]);
        /*
        {
  "location": {
    "name": "Warsy",
    "region": "Picardie",
    "country": "France",
    "lat": 49.7,
    "lon": 2.65,
    "tz_id": "Europe/Paris",
    "localtime_epoch": 1692341180,
    "localtime": "2023-08-18 8:46"
  },
  "current": {
    "last_updated_epoch": 1692340200,
    "last_updated": "2023-08-18 08:30",
    "temp_c": 17,
    "temp_f": 62.6,
    "is_day": 1,
    "condition": {
      "text": "Mist",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png",
      "code": 1030
    },
    "wind_mph": 10.5,
    "wind_kph": 16.9,
    "wind_degree": 100,
    "wind_dir": "E",
    "pressure_mb": 1015,
    "pressure_in": 29.97,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 94,
    "cloud": 75,
    "feelslike_c": 17,
    "feelslike_f": 62.6,
    "vis_km": 3,
    "vis_miles": 1,
    "uv": 6,
    "gust_mph": 9.4,
    "gust_kph": 15.1
  },
  "forecast": {
    "forecastday": [
      {
        "date": "2023-08-18",
        "date_epoch": 1692316800,
        "day": {
          "maxtemp_c": 29.9,
          "maxtemp_f": 85.8,
          "mintemp_c": 15.9,
          "mintemp_f": 60.6,
          "avgtemp_c": 21.8,
          "avgtemp_f": 71.3,
          "maxwind_mph": 8.9,
          "maxwind_kph": 14.4,
          "totalprecip_mm": 2.2,
          "totalprecip_in": 0.09,
          "totalsnow_cm": 0,
          "avgvis_km": 8.2,
          "avgvis_miles": 5,
          "avghumidity": 78,
          "daily_will_it_rain": 1,
          "daily_chance_of_rain": 82,
          "daily_will_it_snow": 0,
          "daily_chance_of_snow": 0,
          "condition": {
            "text": "Patchy rain possible",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
            "code": 1063
          },
          "uv": 5
        },
        "astro": {
          "sunrise": "06:45 AM",
          "sunset": "09:04 PM",
          "moonrise": "08:35 AM",
          "moonset": "10:05 PM",
          "moon_phase": "Waxing Crescent",
          "moon_illumination": "2",
          "is_moon_up": 0,
          "is_sun_up": 0
        },
        "hour": [
          {
            "time_epoch": 1692309600,
            "time": "2023-08-18 00:00",
            "temp_c": 17.2,
            "temp_f": 63,
            "is_day": 0,
            "condition": {
              "text": "Clear",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
              "code": 1000
            },
            "wind_mph": 8.7,
            "wind_kph": 14,
            "wind_degree": 64,
            "wind_dir": "ENE",
            "pressure_mb": 1016,
            "pressure_in": 30.01,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 87,
            "cloud": 11,
            "feelslike_c": 17.2,
            "feelslike_f": 63,
            "windchill_c": 17.2,
            "windchill_f": 63,
            "heatindex_c": 17.2,
            "heatindex_f": 63,
            "dewpoint_c": 15,
            "dewpoint_f": 59,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 17.4,
            "gust_kph": 28.1,
            "uv": 1
          },
          {
            "time_epoch": 1692313200,
            "time": "2023-08-18 01:00",
            "temp_c": 16.6,
            "temp_f": 61.9,
            "is_day": 0,
            "condition": {
              "text": "Clear",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
              "code": 1000
            },
            "wind_mph": 8.3,
            "wind_kph": 13.3,
            "wind_degree": 67,
            "wind_dir": "ENE",
            "pressure_mb": 1016,
            "pressure_in": 29.99,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 90,
            "cloud": 19,
            "feelslike_c": 16.6,
            "feelslike_f": 61.9,
            "windchill_c": 16.6,
            "windchill_f": 61.9,
            "heatindex_c": 16.6,
            "heatindex_f": 61.9,
            "dewpoint_c": 15,
            "dewpoint_f": 59,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 17.2,
            "gust_kph": 27.7,
            "uv": 1
          },
          {
            "time_epoch": 1692316800,
            "time": "2023-08-18 02:00",
            "temp_c": 16.1,
            "temp_f": 61,
            "is_day": 0,
            "condition": {
              "text": "Mist",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
              "code": 1030
            },
            "wind_mph": 7.4,
            "wind_kph": 11.9,
            "wind_degree": 66,
            "wind_dir": "ENE",
            "pressure_mb": 1015,
            "pressure_in": 29.98,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 94,
            "cloud": 11,
            "feelslike_c": 16.1,
            "feelslike_f": 61,
            "windchill_c": 16.1,
            "windchill_f": 61,
            "heatindex_c": 16.1,
            "heatindex_f": 61,
            "dewpoint_c": 15.2,
            "dewpoint_f": 59.4,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 2,
            "vis_miles": 1,
            "gust_mph": 15.4,
            "gust_kph": 24.8,
            "uv": 1
          },
          {
            "time_epoch": 1692320400,
            "time": "2023-08-18 03:00",
            "temp_c": 16,
            "temp_f": 60.8,
            "is_day": 0,
            "condition": {
              "text": "Mist",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
              "code": 1030
            },
            "wind_mph": 7.4,
            "wind_kph": 11.9,
            "wind_degree": 74,
            "wind_dir": "ENE",
            "pressure_mb": 1015,
            "pressure_in": 29.97,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 96,
            "cloud": 19,
            "feelslike_c": 16,
            "feelslike_f": 60.8,
            "windchill_c": 16,
            "windchill_f": 60.8,
            "heatindex_c": 16,
            "heatindex_f": 60.8,
            "dewpoint_c": 15.3,
            "dewpoint_f": 59.5,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 2,
            "vis_miles": 1,
            "gust_mph": 15.4,
            "gust_kph": 24.8,
            "uv": 1
          },
          {
            "time_epoch": 1692324000,
            "time": "2023-08-18 04:00",
            "temp_c": 16,
            "temp_f": 60.8,
            "is_day": 0,
            "condition": {
              "text": "Mist",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
              "code": 1030
            },
            "wind_mph": 7.4,
            "wind_kph": 11.9,
            "wind_degree": 75,
            "wind_dir": "ENE",
            "pressure_mb": 1015,
            "pressure_in": 29.96,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 96,
            "cloud": 27,
            "feelslike_c": 16,
            "feelslike_f": 60.8,
            "windchill_c": 16,
            "windchill_f": 60.8,
            "heatindex_c": 16,
            "heatindex_f": 60.8,
            "dewpoint_c": 15.4,
            "dewpoint_f": 59.7,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 2,
            "vis_miles": 1,
            "gust_mph": 15.4,
            "gust_kph": 24.8,
            "uv": 1
          },
          {
            "time_epoch": 1692327600,
            "time": "2023-08-18 05:00",
            "temp_c": 15.9,
            "temp_f": 60.6,
            "is_day": 0,
            "condition": {
              "text": "Mist",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
              "code": 1030
            },
            "wind_mph": 7.6,
            "wind_kph": 12.2,
            "wind_degree": 69,
            "wind_dir": "ENE",
            "pressure_mb": 1014,
            "pressure_in": 29.94,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 97,
            "cloud": 27,
            "feelslike_c": 15.9,
            "feelslike_f": 60.6,
            "windchill_c": 15.9,
            "windchill_f": 60.6,
            "heatindex_c": 15.9,
            "heatindex_f": 60.6,
            "dewpoint_c": 15.3,
            "dewpoint_f": 59.5,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 2,
            "vis_miles": 1,
            "gust_mph": 15.9,
            "gust_kph": 25.6,
            "uv": 1
          },
          {
            "time_epoch": 1692331200,
            "time": "2023-08-18 06:00",
            "temp_c": 15.9,
            "temp_f": 60.6,
            "is_day": 0,
            "condition": {
              "text": "Mist",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
              "code": 1030
            },
            "wind_mph": 6.7,
            "wind_kph": 10.8,
            "wind_degree": 70,
            "wind_dir": "ENE",
            "pressure_mb": 1014,
            "pressure_in": 29.94,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 97,
            "cloud": 25,
            "feelslike_c": 15.9,
            "feelslike_f": 60.6,
            "windchill_c": 15.9,
            "windchill_f": 60.6,
            "heatindex_c": 15.9,
            "heatindex_f": 60.6,
            "dewpoint_c": 15.3,
            "dewpoint_f": 59.5,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 2,
            "vis_miles": 1,
            "gust_mph": 14.1,
            "gust_kph": 22.7,
            "uv": 1
          },
          {
            "time_epoch": 1692334800,
            "time": "2023-08-18 07:00",
            "temp_c": 17.3,
            "temp_f": 63.1,
            "is_day": 1,
            "condition": {
              "text": "Sunny",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
              "code": 1000
            },
            "wind_mph": 5.6,
            "wind_kph": 9,
            "wind_degree": 81,
            "wind_dir": "E",
            "pressure_mb": 1014,
            "pressure_in": 29.95,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 91,
            "cloud": 24,
            "feelslike_c": 17.2,
            "feelslike_f": 63,
            "windchill_c": 17.2,
            "windchill_f": 63,
            "heatindex_c": 17.2,
            "heatindex_f": 63,
            "dewpoint_c": 15.8,
            "dewpoint_f": 60.4,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 10.3,
            "gust_kph": 16.6,
            "uv": 5
          },
          {
            "time_epoch": 1692338400,
            "time": "2023-08-18 08:00",
            "temp_c": 20,
            "temp_f": 68,
            "is_day": 1,
            "condition": {
              "text": "Sunny",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
              "code": 1000
            },
            "wind_mph": 7.2,
            "wind_kph": 11.5,
            "wind_degree": 96,
            "wind_dir": "E",
            "pressure_mb": 1014,
            "pressure_in": 29.94,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 82,
            "cloud": 18,
            "feelslike_c": 20,
            "feelslike_f": 68,
            "windchill_c": 20,
            "windchill_f": 68,
            "heatindex_c": 20,
            "heatindex_f": 68,
            "dewpoint_c": 16.9,
            "dewpoint_f": 62.4,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 9.4,
            "gust_kph": 15.1,
            "uv": 6
          },
          {
            "time_epoch": 1692342000,
            "time": "2023-08-18 09:00",
            "temp_c": 21.7,
            "temp_f": 71.1,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 6,
            "wind_kph": 9.7,
            "wind_degree": 98,
            "wind_dir": "E",
            "pressure_mb": 1014,
            "pressure_in": 29.95,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 78,
            "cloud": 54,
            "feelslike_c": 21.7,
            "feelslike_f": 71.1,
            "windchill_c": 21.7,
            "windchill_f": 71.1,
            "heatindex_c": 24.4,
            "heatindex_f": 75.9,
            "dewpoint_c": 17.6,
            "dewpoint_f": 63.7,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 7.2,
            "gust_kph": 11.5,
            "uv": 6
          },
          {
            "time_epoch": 1692345600,
            "time": "2023-08-18 10:00",
            "temp_c": 22.5,
            "temp_f": 72.5,
            "is_day": 1,
            "condition": {
              "text": "Light rain shower",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
              "code": 1240
            },
            "wind_mph": 5.6,
            "wind_kph": 9,
            "wind_degree": 96,
            "wind_dir": "E",
            "pressure_mb": 1014,
            "pressure_in": 29.95,
            "precip_mm": 0.8,
            "precip_in": 0.03,
            "humidity": 77,
            "cloud": 87,
            "feelslike_c": 24.8,
            "feelslike_f": 76.6,
            "windchill_c": 22.5,
            "windchill_f": 72.5,
            "heatindex_c": 24.8,
            "heatindex_f": 76.6,
            "dewpoint_c": 18.2,
            "dewpoint_f": 64.8,
            "will_it_rain": 0,
            "chance_of_rain": 67,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.9,
            "gust_kph": 11.2,
            "uv": 5
          },
          {
            "time_epoch": 1692349200,
            "time": "2023-08-18 11:00",
            "temp_c": 22.9,
            "temp_f": 73.2,
            "is_day": 1,
            "condition": {
              "text": "Light rain shower",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
              "code": 1240
            },
            "wind_mph": 5.1,
            "wind_kph": 8.3,
            "wind_degree": 114,
            "wind_dir": "ESE",
            "pressure_mb": 1014,
            "pressure_in": 29.94,
            "precip_mm": 0.2,
            "precip_in": 0.01,
            "humidity": 78,
            "cloud": 53,
            "feelslike_c": 25,
            "feelslike_f": 77,
            "windchill_c": 22.9,
            "windchill_f": 73.2,
            "heatindex_c": 25,
            "heatindex_f": 77,
            "dewpoint_c": 18.9,
            "dewpoint_f": 66,
            "will_it_rain": 0,
            "chance_of_rain": 69,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.7,
            "gust_kph": 10.8,
            "uv": 5
          },
          {
            "time_epoch": 1692352800,
            "time": "2023-08-18 12:00",
            "temp_c": 22.8,
            "temp_f": 73,
            "is_day": 1,
            "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
              "code": 1063
            },
            "wind_mph": 5.8,
            "wind_kph": 9.4,
            "wind_degree": 98,
            "wind_dir": "E",
            "pressure_mb": 1013,
            "pressure_in": 29.92,
            "precip_mm": 0.2,
            "precip_in": 0.01,
            "humidity": 80,
            "cloud": 83,
            "feelslike_c": 25,
            "feelslike_f": 77,
            "windchill_c": 22.8,
            "windchill_f": 73,
            "heatindex_c": 25,
            "heatindex_f": 77,
            "dewpoint_c": 19.1,
            "dewpoint_f": 66.4,
            "will_it_rain": 1,
            "chance_of_rain": 76,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 9,
            "vis_miles": 5,
            "gust_mph": 8.7,
            "gust_kph": 14,
            "uv": 5
          },
          {
            "time_epoch": 1692356400,
            "time": "2023-08-18 13:00",
            "temp_c": 26.4,
            "temp_f": 79.5,
            "is_day": 1,
            "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
              "code": 1063
            },
            "wind_mph": 8.9,
            "wind_kph": 14.4,
            "wind_degree": 109,
            "wind_dir": "ESE",
            "pressure_mb": 1012,
            "pressure_in": 29.89,
            "precip_mm": 0.7,
            "precip_in": 0.03,
            "humidity": 65,
            "cloud": 73,
            "feelslike_c": 28,
            "feelslike_f": 82.4,
            "windchill_c": 26.4,
            "windchill_f": 79.5,
            "heatindex_c": 28,
            "heatindex_f": 82.4,
            "dewpoint_c": 19.3,
            "dewpoint_f": 66.7,
            "will_it_rain": 1,
            "chance_of_rain": 77,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 9,
            "vis_miles": 5,
            "gust_mph": 11.2,
            "gust_kph": 18,
            "uv": 6
          },
          {
            "time_epoch": 1692360000,
            "time": "2023-08-18 14:00",
            "temp_c": 28,
            "temp_f": 82.4,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 6,
            "wind_kph": 9.7,
            "wind_degree": 143,
            "wind_dir": "SE",
            "pressure_mb": 1012,
            "pressure_in": 29.89,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 59,
            "cloud": 26,
            "feelslike_c": 29.6,
            "feelslike_f": 85.3,
            "windchill_c": 28,
            "windchill_f": 82.4,
            "heatindex_c": 29.6,
            "heatindex_f": 85.3,
            "dewpoint_c": 19.2,
            "dewpoint_f": 66.6,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 7.4,
            "gust_kph": 11.9,
            "uv": 7
          },
          {
            "time_epoch": 1692363600,
            "time": "2023-08-18 15:00",
            "temp_c": 27.4,
            "temp_f": 81.3,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 4,
            "wind_kph": 6.5,
            "wind_degree": 155,
            "wind_dir": "SSE",
            "pressure_mb": 1012,
            "pressure_in": 29.87,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 62,
            "cloud": 32,
            "feelslike_c": 29,
            "feelslike_f": 84.2,
            "windchill_c": 27.4,
            "windchill_f": 81.3,
            "heatindex_c": 29,
            "heatindex_f": 84.2,
            "dewpoint_c": 19.5,
            "dewpoint_f": 67.1,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.3,
            "gust_kph": 10.1,
            "uv": 7
          },
          {
            "time_epoch": 1692367200,
            "time": "2023-08-18 16:00",
            "temp_c": 29.9,
            "temp_f": 85.8,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 7.2,
            "wind_kph": 11.5,
            "wind_degree": 164,
            "wind_dir": "SSE",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 51,
            "cloud": 26,
            "feelslike_c": 31.5,
            "feelslike_f": 88.7,
            "windchill_c": 29.9,
            "windchill_f": 85.8,
            "heatindex_c": 31.5,
            "heatindex_f": 88.7,
            "dewpoint_c": 18.7,
            "dewpoint_f": 65.7,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 8.7,
            "gust_kph": 14,
            "uv": 7
          },
          {
            "time_epoch": 1692370800,
            "time": "2023-08-18 17:00",
            "temp_c": 27.3,
            "temp_f": 81.1,
            "is_day": 1,
            "condition": {
              "text": "Sunny",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
              "code": 1000
            },
            "wind_mph": 3.6,
            "wind_kph": 5.8,
            "wind_degree": 241,
            "wind_dir": "WSW",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 63,
            "cloud": 19,
            "feelslike_c": 29,
            "feelslike_f": 84.2,
            "windchill_c": 27.3,
            "windchill_f": 81.1,
            "heatindex_c": 29,
            "heatindex_f": 84.2,
            "dewpoint_c": 19.6,
            "dewpoint_f": 67.3,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.3,
            "gust_kph": 10.1,
            "uv": 7
          },
          {
            "time_epoch": 1692374400,
            "time": "2023-08-18 18:00",
            "temp_c": 27,
            "temp_f": 80.6,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 3.8,
            "wind_kph": 6.1,
            "wind_degree": 241,
            "wind_dir": "WSW",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 65,
            "cloud": 44,
            "feelslike_c": 28.8,
            "feelslike_f": 83.8,
            "windchill_c": 27,
            "windchill_f": 80.6,
            "heatindex_c": 28.8,
            "heatindex_f": 83.8,
            "dewpoint_c": 19.9,
            "dewpoint_f": 67.8,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.3,
            "gust_kph": 10.1,
            "uv": 7
          },
          {
            "time_epoch": 1692378000,
            "time": "2023-08-18 19:00",
            "temp_c": 25.7,
            "temp_f": 78.3,
            "is_day": 1,
            "condition": {
              "text": "Sunny",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
              "code": 1000
            },
            "wind_mph": 2.5,
            "wind_kph": 4,
            "wind_degree": 189,
            "wind_dir": "S",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 69,
            "cloud": 22,
            "feelslike_c": 27.3,
            "feelslike_f": 81.1,
            "windchill_c": 25.7,
            "windchill_f": 78.3,
            "heatindex_c": 27.3,
            "heatindex_f": 81.1,
            "dewpoint_c": 19.4,
            "dewpoint_f": 66.9,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 4.7,
            "gust_kph": 7.6,
            "uv": 7
          },
          {
            "time_epoch": 1692381600,
            "time": "2023-08-18 20:00",
            "temp_c": 23.6,
            "temp_f": 74.5,
            "is_day": 1,
            "condition": {
              "text": "Sunny",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
              "code": 1000
            },
            "wind_mph": 3.4,
            "wind_kph": 5.4,
            "wind_degree": 171,
            "wind_dir": "S",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 72,
            "cloud": 16,
            "feelslike_c": 25.4,
            "feelslike_f": 77.7,
            "windchill_c": 23.6,
            "windchill_f": 74.5,
            "heatindex_c": 25.4,
            "heatindex_f": 77.7,
            "dewpoint_c": 18.4,
            "dewpoint_f": 65.1,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 6.9,
            "gust_kph": 11.2,
            "uv": 6
          },
          {
            "time_epoch": 1692385200,
            "time": "2023-08-18 21:00",
            "temp_c": 23.1,
            "temp_f": 73.6,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 4.5,
            "wind_kph": 7.2,
            "wind_degree": 171,
            "wind_dir": "S",
            "pressure_mb": 1011,
            "pressure_in": 29.85,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 72,
            "cloud": 29,
            "feelslike_c": 25,
            "feelslike_f": 77,
            "windchill_c": 23.1,
            "windchill_f": 73.6,
            "heatindex_c": 25,
            "heatindex_f": 77,
            "dewpoint_c": 17.8,
            "dewpoint_f": 64,
            "will_it_rain": 0,
            "chance_of_rain": 0,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 9.4,
            "gust_kph": 15.1,
            "uv": 6
          },
          {
            "time_epoch": 1692388800,
            "time": "2023-08-18 22:00",
            "temp_c": 22.7,
            "temp_f": 72.9,
            "is_day": 0,
            "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
              "code": 1063
            },
            "wind_mph": 4.9,
            "wind_kph": 7.9,
            "wind_degree": 146,
            "wind_dir": "SSE",
            "pressure_mb": 1011,
            "pressure_in": 29.84,
            "precip_mm": 0.2,
            "precip_in": 0.01,
            "humidity": 72,
            "cloud": 71,
            "feelslike_c": 24.8,
            "feelslike_f": 76.6,
            "windchill_c": 22.7,
            "windchill_f": 72.9,
            "heatindex_c": 24.8,
            "heatindex_f": 76.6,
            "dewpoint_c": 17.5,
            "dewpoint_f": 63.5,
            "will_it_rain": 0,
            "chance_of_rain": 69,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 9,
            "vis_miles": 5,
            "gust_mph": 10.3,
            "gust_kph": 16.6,
            "uv": 1
          },
          {
            "time_epoch": 1692392400,
            "time": "2023-08-18 23:00",
            "temp_c": 22.1,
            "temp_f": 71.8,
            "is_day": 0,
            "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
              "code": 1063
            },
            "wind_mph": 4.5,
            "wind_kph": 7.2,
            "wind_degree": 165,
            "wind_dir": "SSE",
            "pressure_mb": 1010,
            "pressure_in": 29.84,
            "precip_mm": 0.1,
            "precip_in": 0,
            "humidity": 74,
            "cloud": 76,
            "feelslike_c": 24.6,
            "feelslike_f": 76.3,
            "windchill_c": 22.1,
            "windchill_f": 71.8,
            "heatindex_c": 24.6,
            "heatindex_f": 76.3,
            "dewpoint_c": 17.4,
            "dewpoint_f": 63.3,
            "will_it_rain": 1,
            "chance_of_rain": 82,
            "will_it_snow": 0,
            "chance_of_snow": 0,
            "vis_km": 10,
            "vis_miles": 6,
            "gust_mph": 9.4,
            "gust_kph": 15.1,
            "uv": 1
          }
        ]
      }
    ]
  }
}
*/
        useEffect(() => {
                if (coordinates !== "") {
                        let url1 = 'http://api.weatherapi.com/v1/current.json?key=cfb427d15f6e4de9951181216232004&q=' + coordinates;
                        let url2 = 'http://api.weatherapi.com/v1/forecast.json?key=cfb427d15f6e4de9951181216232004&q=' + coordinates;
                        fetch(url1)
                                .then(response => {
                                        return response.json()
                                })
                                .then(data => {
                                        setCurrentWeather(data);
                                });

                        fetch(url2)
                                .then(response => {
                                        return response.json()
                                })
                                .then(data => {
                                        setForecastWeather(data);console.log(data);
                                });
                        setMapCoords(coordinates);
                }
        }, [coordinates]);

        useEffect(() => {
                console.log(currentWeather)
                if (currentWeather === "" || currentWeather === "undefined" || currentWeather.length === 0) {
                        setCurrentWeatherDiv("");
                } else {
                        setCurrentWeatherDiv(
                                <Info
                                        city={currentWeather.location.name}
                                        icon={currentWeather.current.condition.icon}
                                        header={currentWeather.current.condition.text}
                                        region={currentWeather.location.region}
                                        country={currentWeather.location.country}
                                        localtime={currentWeather.location.localtime}
                                        timezone={currentWeather.location.tz_id}
                                        lastupdate={currentWeather.current.last_updated}
                                        timeOfDay={currentWeather.current.is_day}
                                        tempC={currentWeather.current.temp_c}
                                        tempF={currentWeather.current.temp_f}
                                        feelslikeC={currentWeather.current.feelslike_c}
                                        feelslikeF={currentWeather.feelslike_f}
                                        cloud={currentWeather.current.cloud}
                                        uv={currentWeather.current.uv}
                                        windDir={currentWeather.current.wind_dir}
                                        windMph={currentWeather.current.wind_mph}
                                        windKph={currentWeather.current.wind_kph}
                                        humidity={currentWeather.current.humidity}
                                        pressureM={currentWeather.current.pressure_mb}
                                        pressureI={currentWeather.current.pressure_in}
                                />);
                }
        }, [currentWeather]);

        useEffect(() => {
                console.log(forecastWeather)
                if (forecastWeather === "" || forecastWeather === "undefined" || forecastWeather.length === 0) {
                        setForecastWeatherDiv("");
                } else {
                        setForecastWeatherDiv(
                                <Info
                                        city={forecastWeather.location.name}
                                        icon={forecastWeather.forecast.condition.icon}
                                        header={forecastWeather.forecast.condition.text}
                                        region={forecastWeather.location.region}
                                        country={forecastWeather.location.country}
                                        localtime={forecastWeather.location.localtime}
                                        timezone={forecastWeather.location.tz_id}
                                        lastupdate={forecastWeather.forecast.last_updated}
                                        timeOfDay={forecastWeather.forecast.is_day}
                                        tempC={forecastWeather.forecast.temp_c}
                                        tempF={forecastWeather.forecast.temp_f}
                                        feelslikeC={forecastWeather.forecast.feelslike_c}
                                        feelslikeF={forecastWeather.feelslike_f}
                                        cloud={forecastWeather.forecast.cloud}
                                        uv={forecastWeather.forecast.uv}
                                        windDir={forecastWeather.forecast.wind_dir}
                                        windMph={forecastWeather.forecast.wind_mph}
                                        windKph={forecastWeather.forecast.wind_kph}
                                        humidity={forecastWeather.forecast.humidity}
                                        pressureM={forecastWeather.forecast.pressure_mb}
                                        pressureI={forecastWeather.forecast.pressure_in}
                                />);
                }
        }, [forecastWeather]);

        useEffect(() => {
                if (mapCoords != undefined) {
                        setMapDiv(<Map mapCoords={coordinates} />); console.log(mapDiv)
                } else {
                        setMapDiv("");
                }
        }, [mapCoords]);

        function locMe() {
                navigator.geolocation.getCurrentPosition(function (position) {
                        const ltPlusLn = '' + position.coords.latitude + ',' + position.coords.longitude + '';
                        setCoordinates(ltPlusLn);
                });
        }

        return (
                <div className="searchpanel">
                        <FontAwesomeIcon icon={faCity} />
                        <Search placeholder="Insert city name here" value={keyword} onChange={handleChange} />
                        <FontAwesomeIcon id="searchpanel__delete" icon={faX} onClick={removeKeyword} style={{ display: showDeleteKeywordButton == true ? 'inline-block' : 'none' }} />
                        <Geolocation locFunction={locMe} />
                        <div id="searchpanel__results">{citiesResults}</div>
                        <div className="searchpanel__weatherdata">{currentWeatherDiv}</div>
                        <div className="searchpanel__weatherdata">{forecastWeatherDiv}</div>
                        {mapDiv}
                </div>
        );

}
export default Main;