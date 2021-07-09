import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addDeletedBooks,
  deleteBook,
  updateAllArraysAfterDelete,
} from "../features/booklist/bookReducer";
import { selectBookToDelete } from "../features/booklist/deleteReducer";

export const DeleteBookAlert = () => {
  const useStyles = makeStyles({
    alertContainer: {},
    titleContainer: {},
    title: { fontSize: 20, fontWeight: "bold" },
    cardTitle: { fontSize: 14 },
    card: { minWidth: "fit-content" },
    cardContent: { fontSize: 13 },
    confirmButton: { backgroundColor: "rgb(194, 234, 189)", color: "black" },
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const bookToDelete = useAppSelector(selectBookToDelete);

  const confirmButtonClicked = async () => {
    await dispatch(deleteBook(bookToDelete));
    const deleteArray = new Array<any>();
    deleteArray[0] = bookToDelete;
    dispatch(addDeletedBooks(deleteArray));
    dispatch(updateAllArraysAfterDelete(bookToDelete));
  };

  return (
    <div className={classes.alertContainer}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>
            Are you sure you want to delete this book?
          </Typography>
          <Typography className={classes.cardTitle} gutterBottom>
            {bookToDelete.Title}
          </Typography>
          <Typography className={classes.cardContent}>
            {bookToDelete.Authors}
          </Typography>
          <Typography className={classes.cardContent}>
            {bookToDelete.ISBN}
          </Typography>
          <Typography className={classes.cardContent}>
            {bookToDelete.PublishedYear}
          </Typography>
          <Button
            variant="contained"
            className={classes.confirmButton}
            onClick={confirmButtonClicked}
          >
            Confirm
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
