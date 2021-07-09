import { useEffect } from "react";
import "./App.css";
import { AddBook } from "./Components/addBook";
import { ShowBooklist } from "./Components/ShowBooklist";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import background from "./Components/Images/background3.png";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchBookListTwo,
  fetchAvailableBooks,
  selectLoadingState,
} from "./features/booklist/bookReducer";
import { CircularProgress } from "@material-ui/core";
import { ShowRecentlyDeleted } from "./Components/ShowRecentlyDeleted";
import { AddLibraryCard } from "./Components/AddLibraryCard";
import { CheckedOutContainer } from "./Components/CheckedOutContainer";
import { ErrorLoadingPage } from "./Components/ErrorLoadingPage";

function App() {
  const useStyles = makeStyles({
    NavBarWrapper: {
      height: "9vh",
      flex: "0 1 auto",
    },
    PageWrapper: {
      display: "flex",
      flexFlow: "column",
      height: "100vh",
      backgroundImage: "url(" + background + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100vh 80vh",
      backgroundPosition: "right bottom",
    },
    MainContentWrapper: {
      flex: "1 1 column",
      maxHeight: "91vh",
      boxSizing: "border-box",
      flexDirection: "column",
      width: "100vw",
      overflowX: "hidden",
      maxWidth: "100%",
    },
    SpinningCircle: {
      position: "absolute",
      top: "45%",
      left: "45%",
    },
  });

  const classes = useStyles();

  const status = useAppSelector(selectLoadingState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchBookListTwo());
      await dispatch(fetchAvailableBooks());
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className={classes.PageWrapper}>
        <div className={classes.NavBarWrapper}>
          <NavBar />
        </div>
        <Switch>
          <Route path="/AddBook">
            <div className={classes.MainContentWrapper}>
              <AddBook />
            </div>
          </Route>
          <Route path="/AddLibraryCard">
            <div className={classes.MainContentWrapper}>
              <AddLibraryCard />
            </div>
          </Route>
          <Route path="/RecentlyDeleted">
            <div className={classes.MainContentWrapper}>
              <ShowRecentlyDeleted />
            </div>
          </Route>
          <Route path="/ReturnBooks">
            <div className={classes.MainContentWrapper}>
              <CheckedOutContainer />
            </div>
          </Route>
          <Route path="/">
            <div className={classes.MainContentWrapper}>
              {status === "loading" ? (
                <CircularProgress className={classes.SpinningCircle} />
              ) : status === "idle" ? (
                <ShowBooklist />
              ) : (
                <ErrorLoadingPage />
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
