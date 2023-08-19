import { useState, useEffect } from "react";
import Search from './Search';
import Result from './Result';
import Info from './Info';
import Forecast from './Forecast';
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
  const [weatherData, setWeatherData] = useState<any>([]);
  const [currentWeatherDiv, setCurrentWeatherDiv] = useState<any>();
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

  useEffect(() => {
    if (coordinates !== "") {
      let url = 'http://api.weatherapi.com/v1/forecast.json?key=cfb427d15f6e4de9951181216232004&q=' + coordinates;
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setWeatherData(data);
        });
      setMapCoords(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    console.log(weatherData)
    if (weatherData === "" || weatherData === "undefined" || weatherData.length === 0) {
      setCurrentWeatherDiv("");
    } else {
      setCurrentWeatherDiv(
        <Info
          title={"Current weather"}
          city={weatherData.location.name}
          icon={weatherData.current.condition.icon}
          header={weatherData.current.condition.text}
          region={weatherData.location.region}
          country={weatherData.location.country}
          localtime={weatherData.location.localtime}
          timezone={weatherData.location.tz_id}
          lastupdate={weatherData.current.last_updated}
          timeOfDay={weatherData.current.is_day}
          tempC={weatherData.current.temp_c}
          tempF={weatherData.current.temp_f}
          feelslikeC={weatherData.current.feelslike_c}
          feelslikeF={weatherData.feelslike_f}
          cloud={weatherData.current.cloud}
          uv={weatherData.current.uv}
          windDir={weatherData.current.wind_dir}
          windMph={weatherData.current.wind_mph}
          windKph={weatherData.current.wind_kph}
          humidity={weatherData.current.humidity}
          pressureM={weatherData.current.pressure_mb}
          pressureI={weatherData.current.pressure_in}
        />);
      setForecastWeatherDiv(
        <Forecast
          title={"Forecast"}
          icon={weatherData.forecast.forecastday.day.condition.icon}
          header={weatherData.current.condition.text}
          maxTempC={weatherData.forecast.forecastday.day.maxtemp_c}
          maxTempF={weatherData.forecast.forecastday.day.maxtemp_f}
          minTempC={weatherData.forecast.forecastday.day.mintemp_c}
          minTempF={weatherData.forecast.forecastday.day.mintemp_f}
          avgTempC={weatherData.forecast.forecastday.day.avgtemp_c}
          avgTempF={weatherData.forecast.forecastday.day.avgtemp_f}
          maxWindMph={weatherData.forecast.forecastday.day.maxwind_mph}
          maxWindKph={weatherData.forecast.forecastday.day.maxwind_kph}
          avgHumidity={weatherData.forecast.forecastday.day.avghumidity}
          uv={weatherData.forecast.forecastday.day.uv}
        />);
    }
  }, [weatherData]);

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