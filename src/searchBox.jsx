import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [diet, setDiet] = useState("");
  const [mealType, setMealType] = useState("");

  const diets = ["balanced", "high-fiber", "high-protein"];
  const meals = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

  const handleSearch = () => {
    onSearch({ q: searchText, diet: diet, mealType: mealType }, false);
  };

  const handleReset = () => {
    setSearchText("");
    onSearch({ searchText: "", diet: "" }, true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%", py: 3, px: 0 }}
    >
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        sx={{ width: "100%" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        gap="20px"
        width="100%"
      >
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          startIcon={<RestartAltIcon />}
        >
          Reset
        </Button>
        <TextField
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={diet}
          label="Diet"
          onChange={(e) => {
            setDiet(e.target.value);
          }}
          size="small"
          sx={{ width: "150px" }}
          select
        >
          <MenuItem key={"none"} value={""}>
            None
          </MenuItem>
          {diets.map((d) => {
            return (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mealType}
          label="Meal Type"
          onChange={(e) => {
            setMealType(e.target.value);
          }}
          size="small"
          sx={{ width: "150px" }}
          select
        >
          <MenuItem key={"none"} value={""}>
            None
          </MenuItem>
          {meals.map((d) => {
            return (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
    </Box>
  );
};

export default SearchBox;
