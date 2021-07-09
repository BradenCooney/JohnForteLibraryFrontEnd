import {
  Backdrop,
  Button,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectPatronInfo,
  selectPatronInfoResponse,
  setPatronInfoResponseOpen,
} from "../features/booklist/bookReducer";

export const BackdropPatronInfo = () => {
  const useStyles = makeStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      padding: 40,
    },
    backdrop: {
      zIndex: 1,
      color: "rgb(52, 52, 52)",
      backgroundColor: "rgba(52, 52, 52, 0.2)",
    },
    okButton: { backgroundColor: "rgb(194, 234, 189)", color: "black" },
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectPatronInfoResponse);
  const patronInfo = useAppSelector(selectPatronInfo);

  const handleCloseBackdrop = (event: any) => {
    if (event.target.id !== "noClose")
      dispatch(setPatronInfoResponseOpen(false));
  };

  return (
    <Backdrop
      className={classes.backdrop}
      open={open}
      onClick={handleCloseBackdrop}
    >
      <Paper elevation={5} className={classes.paper} id="noClose">
        <Typography id="noClose">Who checked out the book:</Typography>
        <Typography style={{ paddingTop: 10 }} id="noClose">
          {patronInfo.checkedOutInfo.name}
        </Typography>
        <Typography id="noClose">
          {patronInfo.checkedOutInfo.address}
        </Typography>
        <Typography id="noClose">
          {patronInfo.checkedOutInfo.cardNumber}
        </Typography>
        <Typography style={{ paddingTop: 10 }} id="noClose">
          The book was checked out on {patronInfo.checkedOutDate}
        </Typography>
        <Typography id="noClose">
          The due date is {patronInfo.dueDate}
        </Typography>
        <Button className={classes.okButton}>Ok</Button>
      </Paper>
    </Backdrop>
  );
};
