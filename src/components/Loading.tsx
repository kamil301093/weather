import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Loading = () => {
        return (
                <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
        )
}

export default Loading;