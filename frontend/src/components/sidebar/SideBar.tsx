import React, { FunctionComponent, } from "react";
import { StyleSheet, ScrollView,View } from "react-native";

import FilterByYear from "./FilterByYear";
import FilterGenreComp from "./FilterByGenre";
import SearchComp from './Search';


/**
 * Global SideBar
 * Menu that contains search and filter options
 */
const SideBar: FunctionComponent = () => {



  return (
    <View style={styles.animatedBox}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchComp/>
        <FilterGenreComp />
        <FilterByYear />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    backgroundColor: "#000",
    padding: 20,
    height: '100%',
    display:'flex',
  },
  scrollContainer: {
    paddingBottom:450,
  }
})
export default SideBar;
