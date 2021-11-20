import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import {selectUserIsLoggedIn, selectUserName} from '../../services/selectors';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
/**
 * This is a simple component that displays the username of the logged in user.
 * We use redux to determine the logged in user.
 */
const UserDisplay: React.FC = () => {
    const username = useSelector(selectUserName);
    const isLoggedIn = React.useState(true);

    const [fontsLoaded] = useFonts({
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf')
    })

    if (!isLoggedIn){
        return null;
    } 
    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return(
            <View style={styles.displayContainer}>
                <Text style={styles.titleDisplay}> 
                    Hello, {username}!
                </Text>
            </View>
        )
    }
}

export default UserDisplay;


const styles = StyleSheet.create({
    titleDisplay: {
        fontWeight: 'bold',
        fontSize: 28,
        margin: 10,
        fontFamily: 'Quicksand-Medium',
    },
    displayContainer: {
        zIndex:0,
    }
})