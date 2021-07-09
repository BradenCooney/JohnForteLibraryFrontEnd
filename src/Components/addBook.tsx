import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import { AuthorEntry } from "./AuthorEntry";
import React, { useState } from "react";
import "./Styles/addBook.css";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { addBookToList } from "../features/booklist/bookReducer";

export const AddBook = () => {
  const useStyles = makeStyles({
    formStyle: {
      marginLeft: "25%",
      marginTop: "15vh",
      width: "80vh",
      height: "inehrit",
    },
    textField: {
      width: "30vh",
      marginTop: 0,
      marginRight: 0,
      flexShrink: 1,
    },
    button: {
      marginTop: "10vh",
    },
    root: {
      maxHeight: "inherit",
      boxSizing: "border-box",
      overflowY: "scroll",
      display: "flex",
    },
  });

  const classes = useStyles();

  const [count, setCount] = useState(0);
  const [names, setNames] = useState([""]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await dispatch(
      addBookToList({
        Title: title,
        Authors: names,
        PublishedYear: year,
        ISBN: isbn,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setErrorMessage("The book was added successfully");
      setOpen(true);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setTitle("");
      setNames([""]);
      setIsbn("");
      setYear(0);
      setCount(0);
    } else {
      setErrorMessage("There was an issue adding the book. Please try again.");
      setOpen(true);
    }
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let authors = names;
    let index = event.target.id;
    authors[parseInt(index)] = event.target.value;
    setNames(authors);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber < 0) {
      setYear(0);
    } else {
      setYear(parseInt(event.target.value));
    }
  };

  const removeHandler = () => {
    console.log(count);
    if (count > 0) {
      console.log("!");
      setCount(count - 1);
      names.pop();
      setNames(names);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root} id="root">
      <form
        className={classes.formStyle}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <h1>Add a book</h1>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              id="title"
              name="title"
              label="Book Title"
              value={title}
              className={classes.textField}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="ISBN"
              name="ISBN0"
              key={0}
              value={isbn}
              label="ISBN"
              onChange={handleIsbnChange}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              label="Year Published"
              value={year}
              type="number"
              className={classes.textField}
              onChange={handleYearChange}
            />
          </Grid>
          <Grid item xs>
            <AuthorEntry index={0} changeHandler={handleAuthorChange} key={0} />
          </Grid>
          <Grid item xs>
            <IconButton onClick={() => setCount(count + 1)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={removeHandler}>
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs>
            {[...Array(count)].map((_, i) => (
              <AuthorEntry
                index={i + 1}
                changeHandler={handleAuthorChange}
                key={i + 1}
              />
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message={errorMessage}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const Form = connect(null, useAppDispatch)(AddBook);
export default Form;
