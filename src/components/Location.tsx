import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faEarthAfrica } from '@fortawesome/free-solid-svg-icons/faEarthAfrica';

const Location = (props: { city: string, region: string, country: string, localtime: string, timezone: string, }) => {

        return (
                <div className="info">
                        <h2 className="info__city">{props.city}</h2>
                        <div className="info__row">
                                <div className="info__panel info__panel--half">
                                        <FontAwesomeIcon icon={faEarthAfrica} size="2xl" />
                                        <div>
                                                {props.region} {props.country}
                                        </div>
                                </div>
                                <div className="info__panel info__panel--half">
                                        <FontAwesomeIcon icon={faClock} size="2xl" />
                                        <div className="info__localtime">
                                                {props.localtime}
                                                {"(" + props.timezone + ")"}
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default Location;