import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
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
        <IconButton
          icon = "heart"
          onPress={() => 
            {clickFavorite(!favorited)}}
          color={favorited ? 'red' : 'lightgray'} 
        />
    )
}

export default FavButton;
