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
import SortDropDown from "../components/sortdropdown";
import MovieTable from "../components/moviesview";
import UserDisplay from "../components/userDisplay";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import LoginModal from "../components/login/login";
import MenuDrawer from "react-native-side-drawer";


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
  const { height, width } = useWindowDimensions();

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

  useEffect(() => {
    fetchMovies();
  }, [filterSearchQuery, filterGenre, filterDateStart, filterDateEnd, sortBy]);

  useEffect(() => {

  }, [width, height])
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const toggleLogInModal = () => {
    setIsLoginModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const closeSideBar = () => {
    setSideBarVisible((wasSideBarVisible) => !wasSideBarVisible);
  }

  const MenuContent = () => {
    return(
      <SideBar isSideBarVisible={isSideBarVisible} closeSideBar={closeSideBar} />
    )
  }
  
  return (
    <View style={{width:width}}>     
      <View>
        <LoginModal isLoginModalVisible={isLoginModalVisible} setIsModalVisible={toggleLogInModal}/>
        <NavBar 
          onCloseClick={toggleLogInModal} 
          isLoginModalVisible={isLoginModalVisible} 
          closeSideBar={closeSideBar} 
          isSideBarVisible={isSideBarVisible}
        />
      </View>
      <View style={{width:width}}>
        <MenuDrawer
          open={isSideBarVisible} 
          drawerContent={MenuContent()}
          drawerPercentage={80}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          
        >
          <View>
            <View style={[styles.displayContainer]}>
              <UserDisplay />
              <SortDropDown />
            </View>
            <View>
              <MovieTable fetchMore={fetchMovies}/>
            </View>
          </View>
        </MenuDrawer>
      </View>
      
    </View>
  );
};

const inlineStyles = StyleSheet.create({
  containerStyle: {
  }
})

