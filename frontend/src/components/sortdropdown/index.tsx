import React, { useState } from "react";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { setSortByCriteria } from "../../pages/mainPageSlice";
import { useAppDispatch } from "../../services/hooks";
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { Entypo } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";

const actionDispatch = (dispatch: Dispatch) => ({
  setCriteria: (criteria: string) => dispatch(setSortByCriteria(criteria)),
});

/**
 * This is a simple function for SelectComponent.
 * The component gives the user possibility to sort the movies based on their wish.
 * This component is a MUI component with custom css. 
 * 
 */
export default function SortDropDown() {
  const [sortBy, setSortBy] = useState('');
  const { setCriteria } = actionDispatch(useAppDispatch());

  let [fontsLoaded] = useFonts({
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
  })
  useEffect(() => {
    setCriteria(sortBy);
  }, [sortBy]);

  if (!fontsLoaded) {
    return <AppLoading />
  } 
  else {
    return (
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSortBy(value)}
          placeholder={{label:'Sort By', value: '', color:'black'}}
          value={sortBy}
          items={[
            {label: 'Title (Ascending)', value: 'title' },
            {label: 'Title (Decreasing)', value: '-title' },
            {label: 'Release Year (Increasing)', value: 'release_date' },
            {label: 'Release Year (Decreasing)', value: '-release_date' },
          ]}
          style={pickerSelectStyles}
          Icon={() => {
            return(
              <Entypo name="chevron-down" size={30} color="black" style={{top:5, right:5}}/>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdownContainer: {
      margin: 10,
      width: 'auto',
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily:'Quicksand-Regular',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily:'Quicksand-Regular',
  },
  placeholder: {
    color: 'black',
  },
  
});
