const Info = (props: { title: string; icon: string, header: string, maxTempC: number, maxTempF: number, minTempC: number, minTempF: number, avgTempC: number, avgTempF: number, maxWindMph: number, maxWindKph: number, rain: number, rainChancePercent: number, snow: number, snowChancePercent: number, avgHumidity: number, uv: number, sunrise: string, sunset: string }) => {

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

        const showWarning = (uvLevel:number) => {
                let warning:string;
                if (uvLevel <= 2) {
                        warning = "low, no danger";
                } else if (uvLevel > 2 && uvLevel <= 5) {
                        warning = "moderate, stay in shade when the Sun is strongest";
                } else if (uvLevel > 5 && uvLevel <= 7) {
                        warning = "high, risk of harm from unprotected sun exposure";
                } else if (uvLevel > 7 && uvLevel <= 10) {
                        warning = "very high, very high risk of harm from unprotected sun exposure";
                } else {
                        warning = "extreme, extreme risk of harm from unprotected sun exposure!";
                }
                return warning;
        }

        const uvWarning = showWarning(props.uv);

        return (
                <div className="info">
                        <h3 className="info__subtitle">{props.title}</h3>
                        <div className="info__row">
                                <div className="info__panel info__panel--big">
                                        <div>
                                                <img className="info__img" src={props.icon} alt="weather icon" />
                                                {props.header}
                                        </div>
                                        <div>
                                                <h3 className="info__header">{props.maxTempC + " C (" + props.maxTempF + " F)"}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">min temp</div>
                                <div className="info__data">{props.minTempC + " C (" + props.minTempF + " F)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">avg temp</div>
                                <div className="info__data">{props.avgTempC + " C (" + props.avgTempF + " F)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">max wind</div>
                                <div className="info__data">{props.maxWindKph + " kph (" + props.maxWindMph + " mph)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">will it rain?</div>
                                <div className="info__data">{rainChance + " (" + props.rainChancePercent + "% chance)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">will it snow?</div>
                                <div className="info__data">{snowChance + " (" + props.snowChancePercent + "% chance)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">avg humidity</div>
                                <div className="info__data">{props.avgHumidity + "%"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">UV (1-11 scale)</div>
                                <div className="info__data">{props.uv + " (" + uvWarning + ")"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">sunrise</div>
                                <div className="info__data">{props.sunrise}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">sunset</div>
                                <div className="info__data">{props.sunset}</div>
                        </div>
                </div>
        )
}

export default Info;