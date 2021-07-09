import { makeStyles } from "@material-ui/core/styles";
import { SearchBarFilter } from "./SearchBarFilter";
import { SearchBar } from "./SearchBar";

export const SearchBarContainer = () => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "5vh",
      margin: "auto",
      padding: "3vh 25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchBarFilter />
      <SearchBar />
    </div>
  );
};
