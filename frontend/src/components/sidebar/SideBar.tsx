import { FunctionComponent, useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  SubMenu,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";

//import icons from react icons
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

//import icons from material ui icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { FilterByYear } from "./FilterByYear";
import { FilterByGenre } from "./FilterByGenre";
/**
 * Global SideBar
 */
const SideBar: FunctionComponent = () => {
  //inspired by: https://medium.com/how-to-react/create-a-sidebar-menu-in-react-js-3463b306ca9a

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const onResizeAutoMenuCollapse = () => {
    let sidebar = document.body.querySelector(".pro-sidebar");
    let width = document.body.clientWidth;
    if(width <= 580){
      setMenuCollapse(true);
    }
    if (width > 580){
      setMenuCollapse(false);
    }
  }

  window.addEventListener("resize", onResizeAutoMenuCollapse);
  return (
    <div className="sidebar" id="side-bar">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
          <div className="logotext">
            <p>{menuCollapse ? <FilterAltIcon /> : "Filtering options"}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <SubMenu title="Genre" icon={<MovieFilterIcon />} id="genre-selection-checkbox-submenu">
              <FilterByGenre genres={["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "Thriller", "TV Movie", "War", "Western"]} />
            </SubMenu>
            <SubMenu title="Year" icon={<CalendarTodayIcon />} id="year-selection-datepicker-submenu">
              <FilterByYear />
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
