import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, LogBox } from "react-native";

import FilterByYear from "./FilterByYear";
import FilterGenreComp from "./FilterByGenre";
import SearchComp from './Search';


/**
 * Global SideBar
 */

interface SideBarProps {
  isSideBarVisible: boolean;
  closeSideBar: () => void;
}

const SideBar: FunctionComponent<SideBarProps> = ({isSideBarVisible, closeSideBar}) => {



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
