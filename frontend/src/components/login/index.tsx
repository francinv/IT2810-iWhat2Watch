import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dispatch } from "redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import { useAppDispatch } from '../../services/hooks';
import { letterSpacing } from '@mui/system';
import { loginAsUser } from './loginslice';
import { useState } from 'react';

const theme = createTheme();

const actionDispatch = (dispatch: Dispatch) => ({
  setUser: (query: string) => dispatch(loginAsUser(query)),
});

interface SignInProps{
  isLoginModalVisible:boolean;
  onCloseClick: () => void;
}

/**
 * This is the component for LogIn. The component will show a login form. And setUser based on username. 
 * This component use redux to update state. 
 * 
 * @param isLoginModalVisible, onCloseClick
 * @returns a login form if isLoginModalVisible = false, if not it will return nothing.
 */
const SignIn: React.FC<SignInProps> = ({isLoginModalVisible, onCloseClick}) => {
  const { setUser } = actionDispatch(useAppDispatch());

  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    setUser(value);
    onCloseClick();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  if (!isLoginModalVisible) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className="sign-in-container" component="div" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={value}
              autoComplete="username"
              variant="standard"
              autoFocus
              className="input-sign"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="btn-small submit-sign"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
