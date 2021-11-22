import React, { useState } from "react";
import { selectUserIsLoggedIn, selectUserName } from "../../services/selectors"
import { useSelector } from "react-redux";
import {
    formatDateAsString,
    convertUnixDateToDate,
  } from "../../util/dateConverter";
import { Modal, View, Text, StyleSheet, Image, ScrollView} from "react-native";
import { IconButton } from "react-native-paper";
import { useFonts } from "expo-font";
import { searchMovies_getMoviesBySearch } from "../../services/__generated__/searchMovies";

interface ModalProps {
    movie: searchMovies_getMoviesBySearch;
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible:boolean) => void;
}

/**
 * This is a component for displaying the selected movie. 
 * There are also some functions for making the modal responsive.
 * 
 * @param movie to show, onCloseClick function to close/open the modal
 * @returns a Modal with MovieDetal.
 */
const MovieModal: React.FC<ModalProps> = ({movie, setIsModalVisible, isModalVisible}:ModalProps) => {
    const userName = useSelector(selectUserName)
    const isLoggedIn = useSelector(selectUserIsLoggedIn)
    const [fontsLoaded] = useFonts({
        'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-SemiBold': require('../../assets/fonts/Quicksand-Medium.ttf'),
    })

    /* Returns an array with the current user (username) removed */
    function getReducedArray(array: Array<string>): Array<string> {
        if (userName === undefined) {
            return []
        }
        const temp = [...array]
        const index = temp.indexOf(userName, 0);
        if (index > -1) {
            temp.splice(index, 1);
        }
        return temp;
    }

    /* Shows the modal based on the prop value from parent component */
    if(isModalVisible){
        return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={
                        () => {setIsModalVisible(!isModalVisible);
                    }}

                >
                    <View style={[styles.modalOuterContainer]}>
                        <View style={styles.modalView}>
                            <View style={styles.icon}>
                                <IconButton 
                                    icon="close" 
                                    size={30} 
                                    color="white" 
                                    onPress={()=>{setIsModalVisible(!isModalVisible)}}
                                    /* style={styles.icon}*/
                                />
                            </View>
                            <View style={styles.headerContainer}>
                                <Image 
                                    source={{
                                        uri: movie?.poster
                                    }}
                                    style={{height:400, width:'62%',}}
                                />
                                <View style={{height:'100%', width: '50%', padding:5,}}>
                                    <Text style={[styles.text, styles.modalTitle]}>{movie?.title}</Text>
                                    <View style={styles.about}>
                                        <View style={styles.aboutContentContainer}>
                                            <Text style={[styles.text, styles.abouttitles]}>Release date:</Text>
                                            <Text style={[styles.text]}>
                                                {formatDateAsString(convertUnixDateToDate(movie?.release_date))}
                                            </Text>
                                        </View>
                                        <View style={styles.aboutContentContainer}>
                                            <Text style={[styles.text, styles.abouttitles]}>Genres:</Text>
                                            <Text style={[styles.text]}>{movie?.genres.join(", ")}</Text>
                                        </View>
                                        {   isLoggedIn
                                            ?   <View style={styles.aboutContentContainer}>
                                                    <Text style={[styles.text, styles.abouttitles]}>Favorited by:</Text>
                                                    <Text style={[styles.text]}> 
                                                        {getReducedArray(movie?.favoritedByUser).length} other user{getReducedArray(movie?.favoritedByUser).length === 1 ? "." : "s."}
                                                    </Text>
                                                </View>
                                            : null
                                        }
                                    </View>
                                </View>
                            </View>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                                <View style={styles.overView}>
                                    <Text style={[styles.text, styles.contentTitle]}>Overview:</Text>
                                    <Text style={[styles.text, styles.overviewText]}>{movie?.overview}</Text>        
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
        );
    }
    else {
        return null;
    }
}

export default MovieModal;

const styles = StyleSheet.create({
    modalOuterContainer: {
        display:'flex',
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        marginTop: 22,
    },
    modalView: {
        backgroundColor: "black",
        borderRadius: 20,
        padding: 5,
        width:'100%',
        height:'100%',
        elevation: 5
    },
    icon: {
        flexDirection:'row-reverse',
    },
    text: {
        color:'white',
        fontFamily:'Quicksand-Regular',
    },
    modalTitle: {
        fontFamily:'Quicksand-Medium',
        fontSize: 30,
        width:'100%',
        marginLeft:5,
    },
    headerContainer: {
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    contentContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        padding:20,
    },
    overView: {
        marginRight:10,
        display:'flex',
        alignItems:'flex-start',
    },
    contentTitle: {
        fontSize:21.4,
        fontFamily:'Quicksand-Medium',
    },
    overviewText: {
        fontSize:20,
    },
    about: {
        width:'50%',
        justifyContent:'flex-end',
    },
    abouttitles: {
        fontFamily:'Quicksand-Medium',
        paddingRight:5,
    },
    aboutContentContainer: {
        display:'flex',
        flexDirection:'row',
        padding: 10,
    }


})