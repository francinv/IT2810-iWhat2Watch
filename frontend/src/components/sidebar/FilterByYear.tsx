import React, { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { setFilterDates } from "../../pages/mainPageSlice";
import { convertDateToUnixDate } from "../../util/dateConverter";
import { View } from "react-native";
import { Title, TextInput, Button} from "react-native-paper";
import { useFonts } from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";

const actionDispatch = (dispatch: Dispatch) => ({
  setDates: (year: [number, number]) => dispatch(setFilterDates(year)),
});

/**
 * This is the component for the filter: Year.
 * The parent component are: SideBar.
 * 
 * @returns FilterByYear component.
 */
const FilterByYear: FunctionComponent = () => {

  const [startDate, setStartYear] = useState<number>(1635203598);
  const [endDate, setEndYear] = useState<number>(1635203598);

  let [fontsLoaded] = useFonts({
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
  })

  const { setDates } = actionDispatch(useAppDispatch());

  function setFilters() {
    if (endDate > startDate) {
      setDates([startDate, endDate]);
    }
  }

  if (!fontsLoaded) {
    return <AppLoading/>
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
        >Filter by year</Title>
        <TextInput
          label="From"
          keyboardType="numeric"
          placeholder="Type year here"
          maxLength={4}
          onChangeText={(newValue) => {
            setStartYear(convertDateToUnixDate(new Date(newValue)))}}
        />
        <TextInput
          label="To"
          keyboardType="numeric"
          placeholder="Type year here"
          maxLength={4}
          onChangeText={(newValue) => {
            setEndYear(convertDateToUnixDate(new Date(newValue)))}}
        />
        <Button
          onPress={setFilters}
          mode="contained"
          color="white"
          labelStyle={{
            fontFamily: 'Quicksand-Regular',
          }}
          style={{
            margin:5,
          }}
        >
          Filter
        </Button>     
      </View>
    );
  }
};

export default FilterByYear;
