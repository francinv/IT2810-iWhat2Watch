import React from 'react';
import { useSelector } from 'react-redux';
import {selectUserIsLoggedIn, selectUserName} from '../../services/selectors';
import './index.css';

/**
 * This is a simple component that displays the username of the logged in user.
 * We use redux to determine the logged in user.
 */
const UserDisplay: React.FC = () => {
    const username = useSelector(selectUserName);
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    if (!isLoggedIn){
        return null;
    }
    return(
        <div className="name-display">
            <h2><b>Hello</b> {username}!</h2>
        </div>
    )
}

export default UserDisplay;
