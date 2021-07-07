import {
  Checkbox,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectAllAvailableBooks,
  selectAllBooks,
  selectAvailableChecked,
  selectOverdueChecked,
  selectSearchFilter,
  setFilteredBooks,
  setAvailableChecked,
  setOverdueChecked,
} from "../features/booklist/bookReducer";
import BookWithIdForState from "../types/BookWithIdForState";

export const SearchBar = () => {
  const useStyles = makeStyles({
    root: {
      width: "40%",
      height: "fit-content",
      display: "flex",
      flexDirection: "row",
    },
    input: { flex: 1 },
    iconButton: { padding: "5px 20px 5px 20px" },
    searchBar: {
      flexGrow: 2,
      flexBasis: "10vw",
      width: "40%",
    },
    availableText: { justifyContent: "center", alignItems: "center" },
    availableCheckContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
      },
    },
    overdueCheckContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
      },
    },
    overdueChecked: {},
  });
  const classes = useStyles();
  const books = useAppSelector(selectAllBooks);
  const filter = useAppSelector(selectSearchFilter);
  const availableBooks = useAppSelector(selectAllAvailableBooks);
  const checked = useAppSelector(selectAvailableChecked);
  const overdueChecked = useAppSelector(selectOverdueChecked);
  const [searchText, setSearchText] = useState("");
  const [nuetralBooks, setNuetralBooks] = useState(availableBooks);
  const dispatch = useAppDispatch();
  var overdueBooks = books;
  overdueBooks = overdueBooks.filter(
    (book: BookWithIdForState) => book.isOverdue === true
  );

  const filterBooksFromSearch = () => {
    dispatch(
      setFilteredBooks(
        nuetralBooks.filter((book: any) =>
          book[filter]
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      )
    );
  };

  const searchFieldChanged = (e: React.ChangeEvent<any>) => {
    setSearchText(e.target.value);
  };

  const handleCheckedChange = () => {
    dispatch(setAvailableChecked(!checked));
    dispatch(setOverdueChecked(false));
    if (checked) {
      setNuetralBooks(books);
      dispatch(setFilteredBooks(books));
    } else {
      setNuetralBooks(availableBooks);
      dispatch(setFilteredBooks(availableBooks));
    }
  };

  const handleOverdueChange = () => {
    dispatch(setOverdueChecked(!overdueChecked));
    dispatch(setAvailableChecked(false));
    if (overdueChecked) {
      setNuetralBooks(books);
      dispatch(setFilteredBooks(books));
    } else {
      setNuetralBooks(overdueBooks);
      dispatch(setFilteredBooks(overdueBooks));
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      filterBooksFromSearch();
    }
  };

  let options: string[] = [];
  if (filter === "authors") {
    for (let book of nuetralBooks) {
      let authors = book.authors;
      for (let author of authors) {
        options.push(author);
      }
    }
  } else {
    options = nuetralBooks.map((option: any) => option[filter].toString());
  }
  let unique = Array.from(new Set(options));
  unique.sort((a: any, b: any) => a - b);

  return (
    <div className={classes.root} onKeyDown={handleKeyDown}>
      {/* <InputBase className={classes.input} placeholder="Search for Books" /> */}
      <Autocomplete
        freeSolo
        options={unique}
        onInputChange={(event, value: any) => setSearchText(value)}
        className={classes.searchBar}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for"
            margin="normal"
            variant="outlined"
            value={searchText}
            onChange={searchFieldChanged}
          />
        )}
      />
      <div
        className={classes.availableCheckContainer}
        onClick={handleCheckedChange}
      >
        <Checkbox checked={checked} />
        <p className={classes.availableText}>Available</p>
      </div>
      <div
        className={classes.overdueCheckContainer}
        onClick={handleOverdueChange}
      >
        <Checkbox checked={overdueChecked} onChange={handleOverdueChange} />
        <Typography>Overdue Books</Typography>
      </div>
      <IconButton
        type="submit"
        onClick={filterBooksFromSearch}
        className={classes.iconButton}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
