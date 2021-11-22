import React,{ FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { setFilterGenres } from "../../pages/mainPageSlice";
import { FlatList, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { useFonts } from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";
import { CheckBox } from 'react-native-elements'

const actionDispatch = (dispatch: Dispatch) => ({
  setFilter: (filter:object) => dispatch(setFilterGenres(filter)),
});

const genres = [
  {id:"1", name: "Action", isChecked: false}, 
  {id: "2", name: "Adventure", isChecked: false},
  {id: "3", name: "Animation", isChecked: false},
  {id:"4" , name:"Comedy", isChecked: false},
  {id:"5" , name: "Crime", isChecked: false},
  {id:"6", name: "Documentary", isChecked: false}, 
  {id:"7", name: "Drama", isChecked: false},
  {id:"8",name: "Family", isChecked: false},
  {id:"9", name: "Fantasy", isChecked: false},
  {id:"10", name: "Horror", isChecked: false},
  {id:"11", name: "Music", isChecked: false},
  {id:"12", name: "Mystery", isChecked: false},
  {id:"13", name: "Romance", isChecked: false},
  {id:"14", name: "Science Fiction", isChecked: false}, 
  {id:"15", name: "Thriller", isChecked: false},
  {id:"16", name: "TV Movie", isChecked: false},
  {id:"17", name: "War", isChecked: false},
  {id:"18", name: "Western", isChecked: false}
]

/**
 * This is the component for filter: Genre.
 * The parent component: SideBar.
 *  
 * @param genres from state.. 
 * @returns FilterByGenre component to SideBar
 */
const FilterGenreComp: FunctionComponent = () => {
  const [selectedGenres, setSelectedGenres] = useState(genres);
  const { setFilter } = actionDispatch(useAppDispatch());

  let [fontsLoaded] = useFonts({
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
})

  const onSelectionsChange = (id:string) => {
    let temp = selectedGenres.map((genre) => {
      if (id === genre.id) {
        return { ...genre, isChecked: !genre.isChecked };
      }
      return genre;
    });
    setSelectedGenres(temp);
    updateFilters(temp);
  }

  function updateFilters(genreArray: Array<{ id: string; name: string; isChecked: boolean; }>) {
    var filteredArray = genreArray.filter(genre => genre.isChecked === true).map(({name}) => name)
    setFilter(filteredArray)
  }

  function checkChecked(id:string) {
    let temp; 
    selectedGenres.map((genre) => {
      if (id === genre.id) {
        temp = genre.isChecked;
      }
    })
    return temp;
  }

  if (!fontsLoaded){
    return <AppLoading />
  }
  else {
    return (
      <View>
        <Title
          style={{
            fontFamily:'Quicksand-Medium',
            color:'white',
            textAlign:'center',
          }}
        >Filter by genres</Title>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <CheckBox 
              textStyle={{fontFamily:'Quicksand-Regular', fontSize:18,}} 
              onPress={() => onSelectionsChange(item.id)}
              title={item.name}  
              checked={checkChecked(item.id)}
              checkedIcon="minus"
              uncheckedIcon="plus"
            />
          )}
        />
      </View>
    );
  }
};

export default FilterGenreComp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

