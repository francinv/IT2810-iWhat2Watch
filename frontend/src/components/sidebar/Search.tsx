import React, { useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { setSearchQuery } from "../../pages/mainPageSlice";
import { FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Searchbar, Title } from "react-native-paper";
import { useFonts } from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";
import FilterByGenre from "./FilterByGenre";


const actionDispatch = (dispatch: Dispatch) => ({
    setSearch: (query: string) => dispatch(setSearchQuery(query)),
});

const SearchComp: FunctionComponent = () => {
    const [localSearch, setLocalSearch] = useState<string>("");
    const { setSearch } = actionDispatch(useAppDispatch());
    let [fontsLoaded] = useFonts({
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    })

    const searchEvent = () => {
      setSearch(localSearch);
    }

    const onChangeSearch = (query:string) => setLocalSearch(query);

    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return (
            <View style={{margin:10}}>
                <Title
                    style={{
                        color: 'white',
                        fontFamily: 'Quicksand-Medium',
                        margin: 10,
                        textAlign: 'center',
                    }}
                >Search here</Title>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={onChangeSearch}
                    value={localSearch}
                    iconColor="black"
                    inputStyle={{
                        fontFamily: 'Quicksand-Regular',
                        color: 'black',
                    }} />
                <Button
                    onPress={searchEvent}
                    mode="contained"
                    color="white"
                    labelStyle={{
                        fontFamily: 'Quicksand-Regular',
                    }}
                    style={{
                        margin: 15,
                    }}
                >
                    Search
                </Button>
            </View>
        );
    }
}

export default SearchComp;