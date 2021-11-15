import * as React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { selectMovies, selectUserIsLoggedIn, selectUserName } from "../../services/selectors";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BaseModalWrapper from "../moviedetail/BaseModalWrapper";
import {
  formatDateAsString,
  convertUnixDateToDate,
} from "../../util/dateConverter";

import { searchMovies_getMoviesBySearch } from "../../services/__generated__/searchMovies"
import FavButton from "../favButton";

interface MovieTableProps {
  onBackDropClick: () => void;
  isModalVisible: boolean;
}

/**
 * This is a component displaying all the movies. 
 * We are using MUI Card components and rendering 
 * them based on movies fetched form the database.
 */

const MovieTable: React.FC<MovieTableProps> = ({
  isModalVisible,
  onBackDropClick,
}) => {
  const movies = useSelector(selectMovies);
  const isLoggedIn = useSelector(selectUserIsLoggedIn)
  const userName = useSelector(selectUserName)
  const [modalMovie, setModalMovie] = useState(null!);

  function isFavorited(movie: searchMovies_getMoviesBySearch): boolean {
    if (movie === null || !userName ) {
      return false;
    }
    return movie.favoritedByUser.includes(userName)
  }

  return (
    <>
      <BaseModalWrapper isModalVisible={isModalVisible} movie={modalMovie!} onCloseClick={onBackDropClick}/>
      <div className="container">
      {
        movies?.map((movie: any) => (
          
            <Card sx={{ maxWidth: 345, height:'100%'}}>
              <CardActionArea className="movie-item-card" onClick={()=>{
                setModalMovie(movie);
                onBackDropClick();
              }}>
                <CardMedia
                  component="img"
                  height="auto"
                  width="auto"
                  image={movie?.poster}
                  alt="Movie poster"
                />
              </CardActionArea>
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie?.title}
                  </Typography>
                  {isLoggedIn ? <FavButton isFavorited={isFavorited(movie)} userName={userName !== undefined ? userName : ""} id={movie.id}/> : null}
                  <Typography variant="body2" color="text.secondary">
                    Release date: {formatDateAsString(
                      convertUnixDateToDate(movie?.release_date)
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(movie.genres.length > 1 ? "Genres: " : "Genre: ")} {movie?.genres.join(", ")}
                  </Typography>
                </CardContent>
            </Card>
        ))}
      </div>
  </>  
  )
}

export default MovieTable;
