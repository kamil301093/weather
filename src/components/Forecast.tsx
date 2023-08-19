const Info = (props: { title: string; icon: string, header: string, maxTempC: number, maxTempF: number, minTempC: number, minTempF: number, avgTempC: number, avgTempF: number, maxWindMph: number, maxWindKph: number, avgHumidity: number, uv: number }) => {
        return (
                <div className="info"><div className="info__row">
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
                        <h3 className="info__subtitle">{props.title}</h3>
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
                                <div className="info__title">avg humidity</div>
                                <div className="info__data">{props.avgHumidity + "%"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">UV (1-11 scale)</div>
                                <div className="info__data">{props.uv}</div>
                        </div>
                </div>
        )
}

export default Info;