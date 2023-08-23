import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Loading = () => {
        return (
                <div className="loading">
                        <FontAwesomeIcon className="loading__icon" icon={faSpinner} size="xl" spinPulse />
                </div>
        )
}

export default Loading;