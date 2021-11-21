import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { useAppDispatch } from '../../services/hooks';
import { loginAsUser } from './loginslice';
import { useState } from 'react';
import { Dispatch } from "redux";



const actionDispatch = (dispatch: Dispatch) => ({
    setUser: (query: string) => dispatch(loginAsUser(query)),
  });
  

interface SignInProps{
    isLoginModalVisible:boolean;
    setIsModalVisible: (isModalVisible:boolean) => void;
  }
  

const LoginModal= () => {
        const { setUser } = actionDispatch(useAppDispatch());
      /*
        const [value, setValue] = useState("");
      
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.log(value);
          setUser(value);
          hideModal();
        };
      
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }
      
        if (!isLoginModalVisible) {
          return null;
        }
        */
  
const [visible, setVisible] = useState(false);

  const showModal = () => {
    //isLoginModalVisible = true;  
    setVisible(true);
  }
  const hideModal = () => {
      //isLoginModalVisible = false;
      setVisible(false);
  }
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 10}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default LoginModal;



