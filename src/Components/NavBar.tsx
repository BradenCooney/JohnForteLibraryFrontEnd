import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DrawerComponent } from "./DrawerComponent";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import libraryLogo from "./Images/book.png";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);

  const toggleSideNav = (isOpen: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideNavIsOpen(isOpen);
  };

  const useStyles = makeStyles({
    libraryLogo: {
      backgroundColor: "transparent",
      height: "5vh",
      color: "inherit",
      textDecoration: "inherit",
    },
    h6: {
      height: "5vh",
      marginLeft: "3vh",
      color: "white",
      textDecoration: "none",
    },
    root: {
      height: "9vh",
      minHeight: "fit-content",
    },
    appBar: {
      backgroundColor: "rgb(46, 134, 171)",
      height: "inherit",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSideNav(true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img
                src={libraryLogo}
                className={classes.libraryLogo}
                alt="Library logo"
              ></img>
            </Link>
            <Typography
              variant="h6"
              className={classes.h6}
              component={Link}
              to="/"
            >
              John Forte Library Software
            </Typography>
          </Toolbar>
        </AppBar>
        <DrawerComponent isOpen={sideNavIsOpen} drawerToggler={toggleSideNav} />
      </div>
    </div>
  );
};
