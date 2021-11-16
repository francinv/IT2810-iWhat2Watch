import React from "react";
import { selectUserName, selectUserIsLoggedIn } from "../../services/selectors"
import { useSelector } from "react-redux";
import {
    formatDateAsString,
    convertUnixDateToDate,
  } from "../../util/dateConverter";

interface ModalProps {
    movie: any;
    onCloseClick: () => void;
}

/**
 * This is a component for displaying the selected movie. 
 * There are also some functions for making the modal responsive.
 * 
 * @param movie to show, onCloseClick function to close/open the modal
 * @returns a Modal with MovieDetal.
 */
const MovieModal: React.FC<ModalProps> = ({movie, onCloseClick}) => {
    const userName = useSelector(selectUserName)
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    function getReducedArray(array: Array<any>): Array<any> {
        const temp = [...array]
        const index = temp.indexOf(userName, 0);
        if (index > -1) {
            temp.splice(index, 1);
        }
        console.log(temp)
        return temp;
        
    }

    return (
        <div className="modal-container" onClick={(event) => event.stopPropagation()}>
            <img src={movie?.poster} alt="Movie Poster"/>
            <div className="content-modal-container">
                <div className="content-header">
                    <h1>{movie?.title}</h1>
                    <IconButton aria-label="close" onClick={onCloseClick} className="close-modal-btn">
                        <CloseIcon sx={{color:'white'}}/>
                    </IconButton>
                     
                </div>
                <div className="content-flex">
                    <div className="col-flex left-flex">
                        <p>{movie?.overview}</p>
                    </div>
                    <div className="col-flex right-flex">
                        <h3>About the movie </h3>
                        <p><b>Release date:</b> {formatDateAsString(
                      convertUnixDateToDate(movie?.release_date)
                    )}</p>
                        <br></br>
                        <p><b>Genres:</b> {movie?.genres.join(", ")}</p>
                        <br></br>
                        {isLoggedIn ?  (<p><b>Favorited by:</b> {getReducedArray(movie?.favoritedByUser).length} other user{getReducedArray(movie?.favoritedByUser).length === 1 ? "." : "s."}</p>)
                        : null}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MovieModal;