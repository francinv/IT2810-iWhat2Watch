import React, { useState } from 'react';

import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import MovieService from "../../services/index";

interface FavButtonProps {
    isFavorited: boolean;
    userName: string;
    id: string;
}

/**
 * This is a component for favoriting a movie. We take in three props. 
 * This component is connected to the database.
 * 
 * @param isFavorited, userName, id 
 * @returns a button with Heart. 
 */
const FavButton: React.FC<FavButtonProps> =({isFavorited, userName, id}) => {

    const [favorited, setFavorited] = useState(isFavorited);

    const setFavorite = async () => {
        if (userName !== undefined) {
          const response = await MovieService.setMovieAsFavorite(
            userName,
            id
          ).catch((error) => {
            console.log("Error", error);
          })
        }
      }
    
    const removeFavorite = async () => {
    if (userName !== undefined) {
        const response = await MovieService.removeFavorite(
        userName,
        id
        ).catch((error) => {
        console.log("Error", error);
        })
    }
    }

    function clickFavorite(didUserFavorite: boolean) {
        if (didUserFavorite) {
            setFavorite();
        }
        else {
            removeFavorite();
        }
        setFavorited(!favorited);
      }



    return(
        <>
            <button className="btn-fav" onClick={() => 
                {clickFavorite(!favorited)
                console.log("Set favorite as", !favorited)}}>
                <FontAwesomeIcon icon={faHeart} color={favorited ? 'red' : 'lightgray'}></FontAwesomeIcon>
            </button>
        </>
    )
}

export default FavButton;
