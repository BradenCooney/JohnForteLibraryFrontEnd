import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";

type AuthorInputProps = {
  index: number;
  changeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

export const AuthorEntry = ({ index, changeHandler }: AuthorInputProps) => {
  const useStyles = makeStyles({
    root: {
      width: "inherit",
    },
    textField: {
      width: "30vh",
      marginTop: 0,
      marginRight: 0,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs>
        <TextField
          id={"" + index}
          name="author"
          label="Author Name"
          className={classes.textField}
          onChange={changeHandler}
        />
      </Grid>
    </div>
  );
};

export default AuthorEntry;
