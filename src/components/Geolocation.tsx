import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons/faLocationCrosshairs';

const Geolocation = (props: { locFunction: any }) => {
    return (
        <div className="geolocation">
            <a onClick={props.locFunction}><FontAwesomeIcon icon={faLocationCrosshairs}/></a>
        </div>
    )
}

export default Geolocation;
