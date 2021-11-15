import { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button, { ButtonProps } from "@mui/material/Button";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "../../services/hooks";
import { Dispatch } from "redux";
import { setFilterGenres } from "../../pages/mainPageSlice";

export interface FilterByGenreProps {
  genres: string[];
}

const FilterButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  "&:hover": {
    backgroundColor: "#cccccc",
    color: "#000",
  },
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setFilter: (filter: string[]) => dispatch(setFilterGenres(filter)),
});

/**
 * This is the component for filter: Genre.
 * The parent component: SideBar.
 *  
 * @param genres from state.. 
 * @returns FilterByGenre component to SideBar
 */
export const FilterByGenre: FunctionComponent<FilterByGenreProps> = ({
  genres,
}: FilterByGenreProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { setFilter } = actionDispatch(useAppDispatch());

  const changeBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const temp = [...selectedGenres];
      temp.push(event.target.name);
      setSelectedGenres(temp);
    }
    if (!event.target.checked) {
      const index = selectedGenres.indexOf(event.target.name, 0);
      if (index > -1) {
        const temp = [...selectedGenres];
        temp.splice(index, 1);
        setSelectedGenres(temp);
      }
    }
  };

  function updateFilters() {
    setFilter(selectedGenres)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <FormGroup>
        {genres.map((genre: string) => (
          <FormControlLabel
            control={
              <Checkbox
                name={genre}
                onChange={(e) => {
                  changeBox(e);
                }}
                sx={{
                  color: "#fff",
                  "&.Mui-checked": {
                    color: "#fff",
                  },
                  "&:hover": {
                    color: "#cccccc",
                  },
                }}
              />
            }
            label={genre}
            key={genre}
          />
        ))}
        {
          <FilterButton
            variant="contained"
            endIcon={<MovieCreationOutlinedIcon />}
            onClick={() => {
              updateFilters();
            }}
          >
            Filter
          </FilterButton>
        }
      </FormGroup>
    </Box>
  );
};
