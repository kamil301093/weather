import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons/faLocationCrosshairs';

const Geolocation = (props: { locFunction: any }) => {
    return (
            <a className="searchpanel__geolocation" onClick={props.locFunction}><FontAwesomeIcon icon={faLocationCrosshairs} size="xl"/></a>
    )
}

export default Geolocation;
