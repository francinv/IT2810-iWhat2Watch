import * as React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "./index.css";
import { alpha, styled } from "@mui/material/styles";
import {
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { setSearchQuery } from "../../pages/mainPageSlice";
import { logOut } from "../login/loginslice"
import { selectUserIsLoggedIn } from "../../services/selectors";
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import SignIn from "../login";
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "1rem",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color:theme.palette.common.white,
  backgroundColor:theme.palette.common.black,
  borderRadius:"0px",
  paddingTop:"10px",
  border:"0.5px solid white",
  transition:"background-color 0.75s",
  borderTopRightRadius:"4px",
  borderBottomRightRadius:"4px",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color:theme.palette.common.black,
    transition:"background-color 0.75s",
  },
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setSearch: (query: string) => dispatch(setSearchQuery(query)),
  setLogOut: () => dispatch(logOut()),
});

interface NavBarProps{
  isLoginModalVisible:boolean;
  onCloseClick: () => void;
}

/**
 * This is the header for our app. We use AppBar component from MUI.
 * The component both have the search function and userLogIn.
 * 
 * @param isLoginModalVisible, onCloseClick 
 * @returns header to show.
 */
const NavBar: React.FC<NavBarProps> = ({isLoginModalVisible, onCloseClick}) => {
  const [localSearch, setLocalSearch] = React.useState<string>("");
  const { setSearch, setLogOut} = actionDispatch(useAppDispatch());
  const isLoggedIn = useSelector(selectUserIsLoggedIn)

  const searchEvent = () => {
    setSearch(localSearch);
  }


  const keyPress = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.keyCode === 13) {
      setSearch(localSearch);
    }
  };

  function inputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setLocalSearch(event.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SignIn  isLoginModalVisible={isLoginModalVisible} onCloseClick={onCloseClick}/>
      <AppBar className="navBar" id="nav-bar">
        <Toolbar>
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "left",
            }}
            className="text-navbar"
          >
            What to Watch?
          </Typography>
          <Search className="search-div" id="search-field-in-navbar">
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={keyPress}
              onChange={(event) => {
                inputChange(event);
              }}
              autoFocus={true}
              className="input-search"
            />
            <StyledIconButton onClick={searchEvent}>
              <SearchIcon />
            </StyledIconButton>
          </Search>
          {isLoggedIn 
              ? <button className="sign-btn" onClick={()=> {setLogOut()
                window.location.reload()}}> <FontAwesomeIcon icon={faUser}/> <p className="btn-text">Sign out</p> </button>
              : <button className="sign-btn" onClick={onCloseClick}> <FontAwesomeIcon icon={faUser} /> <p className="btn-text">Sign in</p> </button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
