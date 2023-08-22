import { useState, useEffect } from "react";
import Search from './Search';
import Result from './Result';
import Location from './Location';
import Info from './Info';
import Forecast from './Forecast';
import Hourly from './Hourly';
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
  const [locationDiv, setLocationDiv] = useState<any>();
  const [currentWeatherDiv, setCurrentWeatherDiv] = useState<any>();
  const [forecastWeatherDiv, setForecastWeatherDiv] = useState<any>();
  const [hoursDiv, setHoursDiv] = useState<any>();
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
          setCities(data);
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
      setLocationDiv(
        <Location
          city={weatherData.location.name}
          region={weatherData.location.region}
          country={weatherData.location.country}
          localtime={weatherData.location.localtime}
          timezone={weatherData.location.tz_id}
        />
      );
      setCurrentWeatherDiv(
        <Info
          title={"Current weather"}
          icon={weatherData.current.condition.icon}
          header={weatherData.current.condition.text}
          lastupdate={weatherData.current.last_updated}
          timeOfDay={weatherData.current.is_day}
          tempC={weatherData.current.temp_c}
          tempF={weatherData.current.temp_f}
          feelslikeC={weatherData.current.feelslike_c}
          feelslikeF={weatherData.current.feelslike_f}
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
          icon={weatherData.forecast.forecastday[0].day.condition.icon}
          header={weatherData.forecast.forecastday[0].day.condition.text}
          maxTempC={weatherData.forecast.forecastday[0].day.maxtemp_c}
          maxTempF={weatherData.forecast.forecastday[0].day.maxtemp_f}
          minTempC={weatherData.forecast.forecastday[0].day.mintemp_c}
          minTempF={weatherData.forecast.forecastday[0].day.mintemp_f}
          avgTempC={weatherData.forecast.forecastday[0].day.avgtemp_c}
          avgTempF={weatherData.forecast.forecastday[0].day.avgtemp_f}
          maxWindMph={weatherData.forecast.forecastday[0].day.maxwind_mph}
          maxWindKph={weatherData.forecast.forecastday[0].day.maxwind_kph}
          rain={weatherData.forecast.forecastday[0].day.daily_will_it_rain}
          rainChancePercent={weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
          snow={weatherData.forecast.forecastday[0].day.daily_will_it_snow}
          snowChancePercent={weatherData.forecast.forecastday[0].day.daily_chance_of_snow}
          avgHumidity={weatherData.forecast.forecastday[0].day.avghumidity}
          uv={weatherData.forecast.forecastday[0].day.uv}
          sunrise={weatherData.forecast.forecastday[0].astro.sunrise}
          sunset={weatherData.forecast.forecastday[0].astro.sunset}
        />);
        setHoursDiv(weatherData.map((data:any) => (
          <Hourly
          time={data.forecast.forecastday[0].hour[0].time}
          icon={data.forecast.forecastday[0].hour[0].condition.icon}
          tempC={data.forecast.forecastday[0].hour[0].temp_c}
          tempF={data.forecast.forecastday[0].hour[0].temp_f}
          text={data.forecast.forecastday[0].hour[0].condition.text}
          chanceRain={data.forecast.forecastday[0].hour[0].chance_of_rain}
          chanceSnow={data.forecast.forecastday[0].hour[0].chance_of_snow}
          />)));
    }
  }, [weatherData]);

  useEffect(() => {
    if (mapCoords != undefined) {
      setMapDiv(<Map mapCoords={coordinates} />);
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
    <div className="main">
      <div className="searchpanel">
        <FontAwesomeIcon icon={faCity} />
        <Search placeholder="Insert city name here" value={keyword} onChange={handleChange} />
        <FontAwesomeIcon id="searchpanel__delete" icon={faX} onClick={removeKeyword} style={{ display: showDeleteKeywordButton == true ? 'inline-block' : 'none' }} />
        <Geolocation locFunction={locMe} />
        <div id="searchpanel__results">{citiesResults}</div>
      </div>
      <div className="data">{locationDiv}</div>
      <div className="data">{currentWeatherDiv}</div>
      <div className="data">{forecastWeatherDiv}</div>
      <div className="data">{hoursDiv}</div>
      <div className="data">{mapDiv}</div>
    </div>
  );

}
export default Main;