import {
  Container,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchCheckedOutBooks,
  selectPatronBooks,
} from "../features/booklist/bookReducer";
import SearchIcon from "@material-ui/icons/Search";
import { DisplayBook } from "./DisplayBook";
import { Pagination } from "@material-ui/lab";

export const CheckedOutContainer = () => {
  const useStyles = makeStyles({
    returnContainer: {
      maxHeight: "inherit",
      boxSizing: "border-box",
      overflowY: "auto",
    },
    searchBarContainer: {
      width: "30%",
      height: "5vh",
      margin: "auto",
      padding: "3vh 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchBar: {
      flexGrow: 2,
      flexBasis: "10vw",
      width: "40%",
    },
    searchIcon: { padding: 5 },
    noResults: { display: "flex", justifyContent: "center" },
    Pagination: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "4vh",
      paddingBottom: "2vh",
    },
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const books = useAppSelector(selectPatronBooks);

  const [page, setPage] = useState(1);
  const [booksPerPage] = useState(5);

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  let books2 = books.slice((page - 1) * booksPerPage, booksPerPage * page);
  const count = Math.ceil(books.length / booksPerPage);

  const handleSearchClick = (event: any) => {
    event.preventDefault();
    dispatch(fetchCheckedOutBooks(cardNumber));
  };

  const handleSearchChange = (event: React.ChangeEvent<any>) => {
    setCardNumber(event.target.value);
  };

  return (
    <div className={classes.returnContainer}>
      <form onSubmit={handleSearchClick} className={classes.searchBarContainer}>
        <TextField
          label="Search a card number"
          value={cardNumber}
          onChange={handleSearchChange}
          className={classes.searchBar}
        />
        <IconButton type="submit" className={classes.searchIcon}>
          <SearchIcon />
        </IconButton>
      </form>
      <div>
        {books2.length > 0 ? (
          books2.map((book: any) => {
            return (
              <Container maxWidth="lg" key={book.bookId.toString()}>
                <DisplayBook
                  Id={book.bookId}
                  Title={book.title}
                  Authors={book.authors}
                  ISBN={book.isbn}
                  PublishedYear={book.publishedYear}
                  isOverdue={book.isOverdue}
                />
              </Container>
            );
          })
        ) : (
          <Typography className={classes.noResults}>
            Use the search bar to search for books
          </Typography>
        )}
      </div>
      <Pagination
        count={count}
        page={page}
        onChange={pageChange}
        className={classes.Pagination}
      />
    </div>
  );
};
