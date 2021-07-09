import { makeStyles } from "@material-ui/core/styles";
import { DisplayBook } from "./DisplayBook";
import { SearchBarContainer } from "./SearchBarContainer";
import { useAppSelector } from "../app/hooks";
import { selectFilteredBooks } from "../features/booklist/bookReducer";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

export const ShowBooklist = () => {
  const useStyles = makeStyles({
    root: {
      maxHeight: "inherit",
      boxSizing: "border-box",
      overflowY: "auto",
      overflowX: "hidden",
    },
    bookContainer: {
      minHeight: "fit-content",
    },
    Pagination: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "4vh",
      paddingBottom: "2vh",
    },
  });
  const [page, setPage] = useState(1);
  const [booksPerPage] = useState(5);

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  let books = useAppSelector(selectFilteredBooks);

  useEffect(() => {
    setPage(1);
  }, [books]);

  let books2 = books.slice((page - 1) * booksPerPage, booksPerPage * page);
  const classes = useStyles();
  const count = Math.ceil(books.length / booksPerPage);

  const displayBooks = books2.map((book: any) => {
    return (
      <Container
        maxWidth="lg"
        className={classes.bookContainer}
        key={book.bookId.toString()}
      >
        <DisplayBook
          key={book.bookId.toString()}
          Id={book.bookId}
          Title={book.title}
          Authors={book.authors}
          ISBN={book.isbn}
          PublishedYear={book.publishedYear}
          isOverdue={book.isOverdue}
        />
      </Container>
    );
  });

  return (
    <div className={classes.root}>
      <SearchBarContainer />
      {displayBooks}
      <Pagination
        count={count}
        page={page}
        onChange={pageChange}
        className={classes.Pagination}
      />
    </div>
  );
};
