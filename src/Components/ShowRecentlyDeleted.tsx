import { makeStyles, Typography } from "@material-ui/core";
import { useAppSelector } from "../app/hooks";
import { selectDeletedBooks } from "../features/booklist/bookReducer";
import { DisplayBook } from "./DisplayBook";

export const ShowRecentlyDeleted = () => {
  const useStyles = makeStyles({
    recentlyDeletedContainer: {},
    NoResultsText: {
      display: "flex",
      top: "30%",
      left: 0,
      bottom: "30%",
      right: 0,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 30,
    },
  });

  const classes = useStyles();
  const recentlyDeletedBooks = useAppSelector(selectDeletedBooks);

  return (
    <div className={classes.recentlyDeletedContainer}>
      {recentlyDeletedBooks.length > 0 ? (
        recentlyDeletedBooks.map((book: any) => {
          return (
            <DisplayBook
              key={book.Id.toString()}
              Id={book.Id}
              Title={book.Title}
              Authors={book.Authors}
              ISBN={book.ISBN}
              PublishedYear={book.PublishedYear}
            />
          );
        })
      ) : (
        <Typography className={classes.NoResultsText}>
          There are no books in your recently deleted
        </Typography>
      )}
    </div>
  );
};
