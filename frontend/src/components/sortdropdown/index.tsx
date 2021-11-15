import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./index.css";
import { SortBy } from "../../util/sortingTypes";
import { Dispatch } from "redux";

import { useEffect } from "react";

import { setSortByCriteria } from "../../pages/mainPageSlice";
import { useAppDispatch } from "../../services/hooks";

const actionDispatch = (dispatch: Dispatch) => ({
  setCriteria: (criteria: string) => dispatch(setSortByCriteria(criteria)),
});

/**
 * This is a simple function for SelectComponent.
 * The component gives the user possibility to sort the movies based on their wish.
 * This component is a MUI component with custom css. 
 * 
 */
export default function SortDropDown() {
  const [sortBy, setSortBy] = React.useState("");

  const handleSortBy = (event: SelectChangeEvent) => {
    console.log("QWsortQuery", sortBy);
    console.log("Eventvalue", event.target.value);
    setSortBy(event.target.value);
  };
  const { setCriteria } = actionDispatch(useAppDispatch());

  useEffect(() => {
    setCriteria(sortBy);
  }, [sortBy]);

  return (
    <Box className="select-container" sx={{ display: "flex", minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sort-drop-down"
          value={sortBy}
          label="Sort by"
          onChange={handleSortBy}
        >
          <MenuItem value={SortBy.AlphabeticalAsc}>Title (Increasing)</MenuItem>
          <MenuItem value={SortBy.AlphabeticalDesc}>
            Title (Decreasing)
          </MenuItem>
          <MenuItem value={SortBy.YearAsc}>Release Year (Increasing)</MenuItem>
          <MenuItem value={SortBy.YearDesc}>Release Year (Decreasing)</MenuItem>
          <MenuItem value={SortBy.Clear}>None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
