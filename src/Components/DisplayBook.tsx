import { makeStyles, Paper, Grid, Button, Tooltip } from "@material-ui/core/";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import missingbook from "./Images/missingbook.png";
import {
  setDeleteAlertVisibility,
  setBookToDelete,
} from "../features/booklist/deleteReducer";
import { selectDeleteAlertVisibility } from "../features/booklist/deleteReducer";
import { DeleteBookAlert } from "./DeleteBookAlert";
import Backdrop from "@material-ui/core/Backdrop";
import {
  addBookToList,
  fetchPatronInfo,
  returnBook,
  selectAllAvailableBooks,
  setPatronInfoResponseOpen,
  updateAllArraysAfterRestore,
  addBookToAvailable,
} from "../features/booklist/bookReducer";
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import CheckoutButton from "./CheckoutButton";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { MoreInformationOnCheckedOutBook } from "./MoreInformationOnCheckedOutBook";

type bookFromProps = {
  Id: number;
  Title: string;
  Authors: string[];
  ISBN: string;
  PublishedYear: number;
  isOverdue?: boolean;
};

export const DisplayBook = ({
  Id,
  Title,
  Authors,
  ISBN,
  PublishedYear,
  isOverdue,
}: bookFromProps) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      minWidth: "100%",
      height: "30vh",
      margin: "auto",
      padding: "3vh",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "rgb(245, 245 245)",
      paddingTop: "1vh",
      minHeight: "fit-content",
      width: "70%",
      position: "relative",
    },
    bookCover: {
      paddingLeft: "1vh",
      paddingRight: 0,
      height: "27vh",
      maxHeight: "30vh",
      maxWidth: "18vh",
    },
    bookInformation: {
      marginLeft: "3vh",
      flexGrow: 1,
      flexBasis: 0,
      flexShrink: 1,
    },
    imageContainer: {
      width: "max-content",
      height: "fill",
      maxHeight: "max-content",
      maxWith: "max-content",
      float: "left",
    },
    textContent: {
      paddingTop: "0",
      marginTop: 0,
      width: "auto",
      "& h2": {
        fontWeight: "normal",
        marginTop: 0,
        marginBottom: "1vh",
        fontSize: "larger",
      },
    },
    Title: {
      marginBottom: 0,
      marginTop: 0,
      overflowWrap: "break-word",
      wordBreak: "break-word",
      whiteSpace: "initial",
    },
    authors: {},
    isbn: {},
    year: {},
    paperContainer: {
      flexFlow: "row",
    },
    deleteButton: {
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "flex-end",
      flexGrow: 0,
      width: "100%",
      marginTop: 12,
    },
    deleteButtonContainer: {
      paddingRight: "1vh",
      paddingLeft: 5,
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    backdrop: {
      zIndex: 1,
      color: "rgb(52, 52, 52)",
      backgroundColor: "rgba(52, 52, 52, 0.2)",
    },
    restoreButton: {
      backgroundColor: "rgb(194, 234, 189)",
      color: "black",
      alignSelf: "flex-end",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexGrow: 0,
    },
    overDueIcon: {
      position: "absolute",
      fontSize: "74px",
      left: "88%",
      top: "66%",
      color: "red",
    },
  });
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const availableBooks = useAppSelector(selectAllAvailableBooks);
  let authors = Authors.join(", ");

  let imageSource =
    "http://covers.openlibrary.org/b/isbn/" + ISBN + "-L.jpg?default=false";
  const setDefaultImage = (e: any) => {
    e.target.onError = null;
    e.target.src = missingbook;
  };

  const DeleteButtonClicked = () => {
    dispatch(setDeleteAlertVisibility(true));
    const newAuthors = Array<string>(authors);
    const book = {
      Id: Id,
      Title: Title,
      Authors: newAuthors,
      ISBN: ISBN,
      PublishedYear: PublishedYear,
    };
    dispatch(setBookToDelete(book));
  };

  const RestoreButtonClicked = async () => {
    const newAuthors = Array<string>(authors);
    const book = {
      Id: Id,
      Title: Title,
      Authors: newAuthors,
      ISBN: ISBN,
      PublishedYear: PublishedYear,
    };
    await dispatch(addBookToList(book));
    dispatch(updateAllArraysAfterRestore(book));
    setOpen(true);
    setMessage("Your book was restored successfully!");
  };

  const ReturnButtonClicked = async () => {
    const response = await dispatch(returnBook(Id));
    if (response.meta.requestStatus === "fulfilled") {
      setMessage("Your book was returned successfully!");
    } else {
      setMessage(
        "There was an issue trying to return that book, please try again later."
      );
    }

    setOpen(true);
    const newAuthors = Array<string>(authors);
    const book = {
      bookId: Id,
      title: Title,
      authors: newAuthors,
      isbn: ISBN,
      publishedYear: PublishedYear,
      isOverdue: false,
    };

    dispatch(addBookToAvailable(book));
  };

  const handleBackDropClose = () => {
    dispatch(setDeleteAlertVisibility(false));
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBookCardClick = async (event: any) => {
    if (
      event.target.id !== "clickable" ||
      availableBooks.some((b: any) => b.bookId === Id)
    )
      return;
    await dispatch(fetchPatronInfo(Id));
    dispatch(setPatronInfoResponseOpen(true));
  };

  return (
    <div className={classes.root} key={Id}>
      <Paper
        elevation={3}
        variant="outlined"
        className={classes.paper}
        onClick={handleBookCardClick}
        id="clickable"
        key={Id}
      >
        <Grid
          container
          spacing={0}
          className={classes.paperContainer}
          id="clickable"
        >
          <Grid item className={classes.imageContainer} id="clickable">
            <img
              src={imageSource}
              onError={setDefaultImage}
              className={classes.bookCover}
              alt="Book Cover"
              id="clickable"
            />
          </Grid>
          <Grid item className={classes.bookInformation} id="clickable">
            <div id="clickable">
              <h1 className={classes.Title} id="clickable">
                {Title}
              </h1>
              <div className={classes.textContent} id="clickable">
                <h2 className={classes.authors} id="clickable">
                  {authors}
                </h2>
                <h2 className={classes.isbn} id="clickable">
                  {ISBN}
                </h2>
                <h2 className={classes.year} id="clickable">
                  {PublishedYear}
                </h2>
              </div>
            </div>
          </Grid>
          <Grid item className={classes.deleteButtonContainer} id="clickable">
            {window.location.pathname === "/" ? (
              <div>
                {availableBooks.some((book: any) => book.bookId === Id) ? (
                  <CheckoutButton
                    Id={Id}
                    Title={Title}
                    Authors={Authors}
                    ISBN={ISBN}
                    PublishedYear={PublishedYear}
                  />
                ) : (
                  <MoreInformationOnCheckedOutBook bookId={Id} />
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.deleteButton}
                  onClick={DeleteButtonClicked}
                >
                  Delete Book
                </Button>
              </div>
            ) : window.location.pathname === "/RecentlyDeleted" ? (
              <Button
                variant="contained"
                className={classes.restoreButton}
                onClick={RestoreButtonClicked}
              >
                Restore
              </Button>
            ) : (
              <div>
                <MoreInformationOnCheckedOutBook bookId={Id} />
                <Button
                  variant="contained"
                  className={classes.restoreButton}
                  onClick={ReturnButtonClicked}
                >
                  Return
                </Button>
              </div>
            )}
            {isOverdue ? (
              <Tooltip title="Book is Overdue">
                <NewReleasesIcon
                  fontSize="large"
                  className={classes.overDueIcon}
                  stroke="black"
                  strokeWidth={0.5}
                  id="clickable"
                />
              </Tooltip>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Paper>
      <Backdrop
        className={classes.backdrop}
        open={useAppSelector(selectDeleteAlertVisibility)}
        onClick={handleBackDropClose}
        id="clickable"
      >
        <DeleteBookAlert />
      </Backdrop>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        id="clickable"
      />
    </div>
  );
};
