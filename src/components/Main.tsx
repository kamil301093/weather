import { useState, useEffect } from "react";
import Search from './Search';
import Result from './Result';
import Info from './Info';
import Loading from './Loading';
import NoResults from './NoResults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons/faCity';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';

const Main = () => {

        const [cities, setCities] = useState([]);
        const [citiesResults, setCitiesResults] = useState<any>([]);
        const [keyword, setKeyword] = useState<string>("");
        const [showDeleteKeywordButton, setShowDeleteKeywordButton] = useState<boolean>(false);
        const [coordinates, setCoordinates] = useState<string>("");
        const [activeCity, setActiveCity] = useState<string>("");
        const [currentWeather, setCurrentWeather] = useState<any>([]);
        const [currentWeatherDiv, setCurrentWeatherDiv] = useState<any>();

        const handleChange = (e: any) => {
                let value = e.target.value;
                setKeyword(value);
        }

        const getCoords = (cit: string, lt: any, ln: any) => {
                const ltPlusLn = '' + lt + ',' + ln + '';
                setCoordinates(ltPlusLn);
                setActiveCity(cit);
                setKeyword("");
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
                                setCitiesResults(cities.map((ct: any) => (<Result city={ct.name} country={ct.country} coordsFunction={() => getCoords(ct.name, ct.lat, ct.lon)} />)));
                        } else {
                                setCitiesResults(<NoResults/>);
                        }
                } else {
                        setCitiesResults("");
                }
        }, [cities]);

        useEffect(() => {
                if (coordinates !== "") {
                        let url = 'http://api.weatherapi.com/v1/current.json?key=cfb427d15f6e4de9951181216232004&q=' + coordinates;
                        fetch(url)
                                .then(response => {
                                        return response.json()
                                })
                                .then(data => {
                                        setCurrentWeather(data.current);console.log(data);
                                });
                }
        }, [coordinates]);

        useEffect(() => {
                console.log(currentWeather)
                if (currentWeather === "" || currentWeather === "undefined" || currentWeather.length === 0) {
                } else {
                        setCurrentWeatherDiv(<Info city={activeCity} icon={currentWeather.condition.icon} header={currentWeather.condition.text} lastupdate={currentWeather.last_updated} timeOfDay={currentWeather.is_day} tempC={currentWeather.temp_c} tempF={currentWeather.temp_f} feelslikeC={currentWeather.feelslike_c} feelslikeF={currentWeather.feelslike_f} cloud={currentWeather.cloud} uv={currentWeather.uv} windDir={currentWeather.wind_dir} windMph={currentWeather.wind_mph} windKph={currentWeather.wind_kph} humidity={currentWeather.humidity} pressureM={currentWeather.pressure_mb} pressureI={currentWeather.pressure_in} />);
                }
        }, [currentWeather]);

        return (
                <div className="searchpanel">
                        <FontAwesomeIcon icon={faCity} />
                        <Search placeholder="Insert city name here" value={keyword} onChange={handleChange} />
                        <FontAwesomeIcon id="searchpanel__delete" icon={faX} onClick={removeKeyword} style={{ display: showDeleteKeywordButton == true ? 'inline-block' : 'none' }} />
                        <div id="searchpanel__results">{citiesResults}</div>
                        <div className="searchpanel__weatherdata">{currentWeatherDiv}</div>
                </div>
        );

}
export default Main;