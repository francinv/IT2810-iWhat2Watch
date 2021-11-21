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
  const [startDate, setStateStartDate] = useState<number>(1635203598);
  const [endDate, setStateEndDate] = useState<number>(1635203598);

  const [starttemp, setStartTemp] = useState<Date | null>(new Date());
  const [endtemp, setEndTemp] = useState<Date | null>(new Date());

  let [fontsLoaded] = useFonts({
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
  })

  const { setDates } = actionDispatch(useAppDispatch());

  function setStartYear(year: any | null) {
    if (year !== null) {
      setStateStartDate(convertDateToUnixDate(new Date(year)));
    }
  }
  function setEndYear(year: any | null) {
    if (year !== null) {
      setStateEndDate(convertDateToUnixDate(new Date(year)));
    }
  }

  function setFilters() {
    if (endDate > startDate) {
      setDates([startDate, endDate]);
      console.log("HJ", startDate, endDate);
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
        />
        <TextInput
          label="To"
          keyboardType="numeric"
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
