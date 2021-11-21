import React,{ FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectNextPage,
  selectFilterSearch,
  selectFilterGenre,
  selectFilterDateStart,
  selectFilterDateEnd,
  selectSortByCriteria,
} from "../services/selectors";
import MovieService from "../services/index";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar/SideBar";
import { Dispatch } from "redux";
import { setMovies } from "./mainPageSlice";
import { searchMovies } from "../services/__generated__/searchMovies";
import { useAppDispatch } from "../services/hooks";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SortDropDown from "../components/sortdropdown";
import MovieTable from "../components/moviesview";
import UserDisplay from "../components/userDisplay";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import LoginModal from "../components/login/login";


const actionDispatch = (dispatch: Dispatch) => ({
  setMovies: (movies: searchMovies["getMoviesBySearch"]) =>
    dispatch(setMovies(movies)),
});

/**
 * This is our main component. This is the page the user sees when they use our app.
 * This component uses both redux and fetch from the database. We have functions for fetching
 * and also setting states. 
 */

export const MainPage: FunctionComponent = () => {
  const nextPage = useSelector(selectNextPage);
  const filterSearchQuery = useSelector(selectFilterSearch);
  const filterGenre = useSelector(selectFilterGenre);
  const filterDateStart = useSelector(selectFilterDateStart);
  const filterDateEnd = useSelector(selectFilterDateEnd);
  const sortBy = useSelector(selectSortByCriteria);

  const { setMovies } = actionDispatch(useAppDispatch());

  const fetchMovies = async () => {
    const movies = await MovieService.getMoviesBySearch(
      nextPage,
      filterSearchQuery,
      filterGenre,
      filterDateStart,
      filterDateEnd,
      sortBy
    ).catch((error) => {
      console.log("Error", error);
    });

    if (movies) {
      setMovies(movies);
    }
  };

  function fetchMore() {
    fetchMovies();
  }

  useEffect(() => {
    fetchMovies();
  }, [filterSearchQuery, filterGenre, filterDateStart, filterDateEnd, sortBy]);

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const toggleLogInModal = () => {
    setIsLoginModalVisible((wasModalVisible) => !wasModalVisible);
  };

  
  return (
    <View>
      <View>
        <NavBar onCloseClick={toggleLogInModal} isLoginModalVisible={isLoginModalVisible}/>
        <LoginModal isLoginModalVisible={isLoginModalVisible} setIsModalVisible={toggleLogInModal}/>
      </View>
      <View style={[styles.displayContainer]}>
        <UserDisplay />
        <SortDropDown />
      </View>
      <View>
        <MovieTable/>
      </View>
    </View>
  );
};

