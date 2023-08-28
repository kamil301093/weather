import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { useState } from 'react';

const Info = (props: { title: string; date: any, icon: string, header: string, maxTempC: number, maxTempF: number, minTempC: number, minTempF: number, avgTempC: number, avgTempF: number, maxWindMph: number, maxWindKph: number, rain: number, rainChancePercent: number, snow: number, snowChancePercent: number, avgHumidity: number, uv: number, sunrise: string, sunset: string }) => {

        const willItRain = (yesOrNow: number) => {
                let chance: string;
                if (yesOrNow == 1) {
                        chance = "yes";
                } else {
                        chance = "no";
                }
                return chance;
        }

        const rainChance = willItRain(props.rain);
        const snowChance = willItRain(props.snow);

        const [showUvWarning, setShowUvWarning] = useState<boolean>(false);

        const showWarning = (uvLevel: number) => {
                let warning: string;
                if (uvLevel <= 2) {
                        warning = "low, no danger for the average person";
                } else if (uvLevel > 2 && uvLevel <= 5) {
                        warning = "moderate, stay in shade when the Sun is strongest";
                } else if (uvLevel > 5 && uvLevel <= 7) {
                        warning = "high, protection against skin and eye damage is needed";
                } else if (uvLevel > 7 && uvLevel <= 10) {
                        warning = "very high, take extra precautions because unprotected skin and eyes will be damaged!";
                } else {
                        warning = "extreme, take all precautions because unprotected skin and eyes can burn in minutes!";
                }
                return warning;
        }

        const uvWarning = showWarning(props.uv);

        const toggleWarning = () => {
                if (showUvWarning == false) {
                        setShowUvWarning(true);
                } else if (showUvWarning == true) {
                        setShowUvWarning(false);
                }
        }

        const closeWarning = () => {
                setShowUvWarning(false);
        }

        return (
                <div className="forecast__wrapper">
                        <h3 className="forecast__subtitle">{props.title} for {props.date}</h3>
                        <div className="forecast__info rectangle">
                                <div>
                                        <img className="info__img" src={props.icon} alt="weather icon" />
                                        {props.header}
                                </div>
                                <div>
                                        <h3 className="forecast__header">{props.maxTempC + " C (" + props.maxTempF + " F)"}</h3>
                                        <div className="forecast__min">min {props.minTempC + " C (" + props.minTempF + " F)"}</div>
                                </div>
                        </div>

                        <div className="forecast__panel rectangle">
                                <div className="forecast__row">
                                        <div className="forecast__name">avg temp</div>
                                        <div className="forecast__data">{props.avgTempC + " C (" + props.avgTempF + " F)"}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">max wind</div>
                                        <div className="forecast__data">{props.maxWindKph + " kph (" + props.maxWindMph + " mph)"}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">will it rain?</div>
                                        <div className="forecast__data">{rainChance + " (" + props.rainChancePercent + "% chance)"}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">will it snow?</div>
                                        <div className="forecast__data">{snowChance + " (" + props.snowChancePercent + "% chance)"}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">avg humidity</div>
                                        <div className="forecast__data">{props.avgHumidity + "%"}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">UV (1-11 scale)</div>
                                        <div className="forecast__data">
                                                {props.uv}
                                                <FontAwesomeIcon className="forecast__uv-icon" icon={faCircleInfo} onClick={toggleWarning} />
                                                <div className="forecast__uv-warning" style={{ visibility: showUvWarning == true ? 'visible' : 'hidden' }}>
                                                        <a className="forecast__uv-warning-close" onClick={closeWarning}><FontAwesomeIcon icon={faXmark} size="sm" /></a>
                                                        <div className="forecast__uv-warning-text">{uvWarning}</div>
                                                </div>
                                        </div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">sunrise</div>
                                        <div className="forecast__data">{props.sunrise}</div>
                                </div>
                                <hr className="forecast__hr" />
                                <div className="forecast__row">
                                        <div className="forecast__name">sunset</div>
                                        <div className="forecast__data">{props.sunset}</div>
                                </div>
                        </div>
                </div>
        )
}

export default Info;