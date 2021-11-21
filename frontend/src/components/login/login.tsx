import * as React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Portal, Text, Button, Provider, Title, TextInput, IconButton } from 'react-native-paper';
import { useAppDispatch } from '../../services/hooks';
import { loginAsUser, logOut } from './loginslice';
import { useState } from 'react';
import { Dispatch } from "redux";
import { useFonts } from '@expo-google-fonts/quicksand';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../../services/selectors';

const actionDispatch = (dispatch: Dispatch) => ({
    setUser: (query: string) => dispatch(loginAsUser(query)),
    logOut: () => dispatch(logOut()),
});
  

interface SignInProps{
  isLoginModalVisible:boolean;
  setIsModalVisible: (isModalVisible:boolean) => void;
}
  

const LoginModal:React.FC<SignInProps> = ({isLoginModalVisible, setIsModalVisible}) => {
  const { setUser, logOut } = actionDispatch(useAppDispatch());

  const [value, setValue] = useState("");
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  let [fontsLoaded] = useFonts({
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
  })

  const handleSubmit = () => {
    setUser(value);
    setIsModalVisible;
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <Modal 
        visible={isLoginModalVisible} 
        onRequestClose={() => {setIsModalVisible(!isLoginModalVisible);}}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.containerStyle}>
          <View style={styles.containerInnerStyle}>
            <View style={{flexDirection:'row-reverse'}}>
              <IconButton 
                icon="close" 
                size={30} 
                color="white" 
                onPress={()=>{setIsModalVisible(!isLoginModalVisible)}}
              />                  
            </View>
            {
              isLoggedIn
              ?  <>
                  <Title
                style={{
                  color: 'white',
                  fontFamily: 'Quicksand-Medium',
                  fontSize: 30,
                  textAlign: 'center',
                  padding: 15,
                }}
                >Sign Out</Title>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '50%',
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => logOut()}
                  color="white"
                  labelStyle={{
                    fontFamily: 'Quicksand-Regular',
                  }}
                  style={{
                    margin: 15,
                  }}
                >
                  Sign Out
                </Button>
              </View>
                </>
              : <>
              <Title
                    style={{
                      color: 'white',
                      fontFamily: 'Quicksand-Medium',
                      fontSize: 30,
                      textAlign: 'center',
                      padding: 15,
                    }}
                    >Sign In</Title>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '50%',
                    }}
                  >
                    <TextInput
                      label="Username"
                      value={value}
                      onChangeText={text => setValue(text)}
                      style={{
                        fontFamily: 'Quicksand-Regular',
                        width: '60%',
                      }}
                      activeUnderlineColor='black' 
                    />
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      color="white"
                      labelStyle={{
                        fontFamily: 'Quicksand-Regular',
                      }}
                      style={{
                        margin: 15,
                      }}
                    >
                      Log In
                    </Button>
                  </View>
              
            </>
            }
            
          </View>
        </View>
      </Modal>
    );
  }
};

export default LoginModal;

const styles = StyleSheet.create({
  containerStyle:{
    display:'flex',
    justifyContent: "center",
    alignItems: "center",
    flex:1,
  },
  containerInnerStyle:{
    backgroundColor: "black",
    borderRadius: 20,
    padding: 5,
    width:'100%',
    height:'50%',
    elevation: 2

  }
})

