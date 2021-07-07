import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  checkoutBook,
  removeFromAvailableBooks,
  removeFromFilteredBooks,
  selectCheckoutedBook,
  selectCheckoutResponseOpen,
  selectDueDate,
  setCheckedoutBook,
  setCheckoutResponseOpen,
  setDueDate,
} from "../features/booklist/bookReducer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type CheckoutButtonProps = {
  Id: number;
  Title: string;
  Authors: any;
  ISBN: any;
  PublishedYear: any;
};

export const CheckoutButton = ({
  Id,
  Title,
  Authors,
  ISBN,
  PublishedYear,
}: CheckoutButtonProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      buttonWrapper: { flexGrow: 0 },
      buttonStyle: {
        height: "30%",
        color: "darkGreen",
        borderColor: "darkGreen",
        "&:hover": {
          backgroundColor: "rgb(194, 234, 189)",
        },
      },
      backdrop: {
        zIndex: 1,
        color: "rgb(52, 52, 52)",
        backgroundColor: "rgba(52, 52, 52, 0.2)",
      },
      inputField: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(5),
        width: "55%",
      },
      multilineColor: {
        color: "black",
      },
      labelStyles: {
        color: "black",
      },
      popupTitle: {
        padding: theme.spacing(5),
      },
      closeIcon: {
        color: "black",
        alignSelf: "flex-end",
        padding: 2,
      },
      responseBackdrop: {
        zIndex: 1,
        color: "rgb(52, 52, 52)",
        backgroundColor: "rgba(52, 52, 52, 0.2)",
      },
      paper: {
        display: "flex",
        flexDirection: "column",
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "black",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "black",
        },
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const responseOpen = useAppSelector(selectCheckoutResponseOpen);
  const checkedoutBook = useAppSelector(selectCheckoutedBook);
  const dueDate = useAppSelector(selectDueDate);
  const [libraryCardNumber, setLibraryCardNumber] = useState("");

  const handleCheckoutButtonClick = (event: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setCheckoutResponseOpen(false));
  };

  const handleXClick = () => {
    setOpen(false);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLibraryCardNumber(event.target.value);
  };

  const handleFinalCheckoutClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let checkoutData = {
      BookId: Id,
      CardNumber: libraryCardNumber,
    };

    const response = await dispatch(checkoutBook(checkoutData));
    const book = {
      Id: Id,
      Title: Title,
      Authors: Authors,
      ISBN: ISBN,
      PublishedYear: PublishedYear,
    };
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(removeFromAvailableBooks(book));
      dispatch(removeFromFilteredBooks(book));
      dispatch(setCheckoutResponseOpen(true));
      dispatch(setCheckedoutBook(book));
      dispatch(setDueDate(response.payload.dueDate));
    }
  };

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.buttonStyle}
        onClick={handleCheckoutButtonClick}
      >
        Checkout Book
      </Button>
      <Backdrop className={classes.backdrop} open={open}>
        <Paper elevation={5} className={classes.paper}>
          <IconButton
            size="small"
            onClick={handleXClick}
            className={classes.closeIcon}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" className={classes.popupTitle}>
            Enter the Patron's library card number:
          </Typography>
          <form onSubmit={handleFinalCheckoutClick}>
            <TextField
              label="Library Card Number"
              type="name"
              onChange={handleCardNumberChange}
              value={libraryCardNumber}
              className={classes.inputField}
              variant="standard"
              required={true}
              InputProps={{
                className: classes.multilineColor,
              }}
              InputLabelProps={{ className: classes.labelStyles }}
            />
            <Button
              className={classes.buttonStyle}
              variant="outlined"
              type="submit"
            >
              Checkout
            </Button>
          </form>
        </Paper>
      </Backdrop>
      <Backdrop
        className={classes.responseBackdrop}
        open={responseOpen}
        onClick={handleClose}
      >
        <Paper elevation={5} className={classes.paper}>
          <Typography variant="h5" className={classes.popupTitle}>
            {checkedoutBook.Title} was checked out successfully.
          </Typography>
          <Typography variant="body2" className={classes.popupTitle}>
            The due date is {dueDate}
          </Typography>
        </Paper>
      </Backdrop>
    </div>
  );
};
export default CheckoutButton;
