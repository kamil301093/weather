import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faEarthAfrica } from '@fortawesome/free-solid-svg-icons/faEarthAfrica';

const Location = (props: { city: string, region: string, country: string, localtime: string, timezone: string, }) => {

        return (
                <div className="location__wrapper">
                        <h2 className="location__city">{props.city}</h2>
                        <div className="location__row">
                                <div className="location__item rectangle rectangle--half">
                                        <FontAwesomeIcon icon={faEarthAfrica} size="2xl" />
                                        <div className="location__text" >
                                                <div className="location__country">
                                                        {props.country}
                                                </div>
                                                <div className="location__region">
                                                        {props.region}
                                                </div>
                                        </div>
                                </div>
                                <div className="location__item rectangle rectangle--half">
                                        <FontAwesomeIcon icon={faClock} size="2xl" />
                                        <div className="location__text" >
                                                <div className="location__localtime">
                                                        {props.localtime}
                                                        {"(" + props.timezone + ")"}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default Location;