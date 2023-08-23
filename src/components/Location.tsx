import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faEarthAfrica } from '@fortawesome/free-solid-svg-icons/faEarthAfrica';

const Location = (props: { city: string, region: string, country: string, localtime: string, timezone: string, }) => {

        return (
                <div className="location__wrapper">
                        <h2 className="location__city">{props.city}</h2>
                        <div className="location__row">
                                <div className="rectangle">
                                        <FontAwesomeIcon icon={faEarthAfrica} size="2xl" />
                                        <div>
                                                {props.country}{props.region}
                                        </div>
                                </div>
                                <div className="rectangle">
                                        <FontAwesomeIcon icon={faClock} size="2xl" />
                                        <div className="location__localtime">
                                                {props.localtime}
                                                {"(" + props.timezone + ")"}
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default Location;