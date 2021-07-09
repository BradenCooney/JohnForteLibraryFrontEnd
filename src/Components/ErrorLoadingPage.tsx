import { makeStyles, Typography } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  fetchBookListTwo,
  fetchAvailableBooks,
} from "../features/booklist/bookReducer";

export const ErrorLoadingPage = () => {
  const useStyles = makeStyles({
    bugIcon: {
      fontSize: 52,
    },
    bugText: {
      fontSize: "1.3rem",
    },
    bugContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
    },
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await dispatch(fetchBookListTwo());
        await dispatch(fetchAvailableBooks());
      };

      fetchData();
    }, 30000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.bugContainer}>
      <BugReportIcon className={classes.bugIcon} />
      <Typography className={classes.bugText}>
        Sorry, there was an issue loading the page right now. Please try again
        later.
      </Typography>
    </div>
  );
};
