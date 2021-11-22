import * as React from "react";

import { Appbar } from "react-native-paper";
import { useFonts} from '@expo-google-fonts/quicksand';
import AppLoading from "expo-app-loading";


interface NavBarProps{
  onCloseClick: () => void;
  closeSideBar: () => void;
  isSideBarVisible:boolean;
}

/**
 * This is the header for our app. We use AppBar component from MUI.
 * The component both have the search function and userLogIn.
 * 
 * @returns header to show.
 */
const NavBar: React.FC<NavBarProps> = ({onCloseClick, closeSideBar, isSideBarVisible}) => {
 

  let [fontsLoaded] = useFonts({
    'Quicksand-SemiBold': require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  })

  const getIcon = () => {
    if (isSideBarVisible) {
      return "menu-open"
    } else {
      return "menu"
    }
  }

  if (!fontsLoaded) {
    return (<AppLoading />)
  }
  else {
    return (
      <Appbar.Header style={{backgroundColor:'black'}}>
        <Appbar.Action 
          icon={getIcon()}
          onPress={closeSideBar}
        />
        <Appbar.Content title="What To Watch?" titleStyle={{fontFamily:'Quicksand-SemiBold', fontSize:30}}/>
        <Appbar.Action icon="account" onPress={onCloseClick} />
      </Appbar.Header>
    );
  }
}

export default NavBar;

