import { FunctionComponent, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { setFilterDates } from "../../pages/mainPageSlice";
import "./index.css";
import { convertDateToUnixDate } from "../../util/dateConverter";

const actionDispatch = (dispatch: Dispatch) => ({
  setDates: (year: [number, number]) => dispatch(setFilterDates(year)),
});

/**
 * This is the component for the filter: Year.
 * The parent component are: SideBar.
 * 
 * @returns FilterByYear component.
 */
export const FilterByYear: FunctionComponent = () => {
  const [startDate, setStateStartDate] = useState<number>(1635203598);
  const [endDate, setStateEndDate] = useState<number>(1635203598);

  const [starttemp, setStartTemp] = useState<Date | null>(new Date());
  const [endtemp, setEndTemp] = useState<Date | null>(new Date());

  const { setDates } = actionDispatch(useAppDispatch());

  const FilterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      backgroundColor: "#cccccc",
      color: "#000",
    },
  }));

  function setStartYear(year: any | null) {
    if (year !== null) {
      setStateStartDate(convertDateToUnixDate(new Date(year)));
    }
  }
  function setEndYear(year: any | null) {
    if (year !== null) {
      setStateEndDate(convertDateToUnixDate(new Date(year)));
    }
  }

  function setFilters() {
    if (endDate > startDate) {
      setDates([startDate, endDate]);
      console.log("HJ", startDate, endDate);
    }
  }

  return (
    <>
      <Box className="year-container" sx={{ display: "flex" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="From"
            value={starttemp}
            onChange={(newValue) => {
              setStartYear(newValue);
              setStartTemp(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
            className="date-picker-class"
          />
          <DatePicker
            views={["year"]}
            label="To"
            value={endtemp}
            onChange={(newValue) => {
              setEndYear(newValue);
              setEndTemp(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
            className="date-picker-class"
          />
        </LocalizationProvider>
      </Box>
      <div className="button-container">
        <FilterButton
          variant="contained"
          endIcon={<MovieCreationOutlinedIcon />}
          onClick={() => setFilters()}
        >
          Filter
        </FilterButton>
      </div>
    </>
  );
};
