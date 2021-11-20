import React, { FunctionComponent, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ScrollView, SafeAreaView, View } from "react-native";

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
      <ScrollView style={styles.animatedBox} contentContainerStyle={styles.scrollContainer}>
        <SearchComp/>
        <FilterGenreComp />
        <FilterByYear />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    backgroundColor: "#000",
    padding: 20,
    height: '100%',
  },
  scrollContainer: {
    paddingBottom:500,
  }
})
export default SideBar;
