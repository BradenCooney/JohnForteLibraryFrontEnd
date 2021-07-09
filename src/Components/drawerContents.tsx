import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCardIcon from "@material-ui/icons/Payment";
import ReplayIcon from "@material-ui/icons/Replay";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setPatronBooksToEmpty } from "../features/booklist/bookReducer";

type contentsProps = {
  drawerToggler: Function;
};

export const DrawerContents = ({ drawerToggler }: contentsProps) => {
  const useStyles = makeStyles({
    drawerContentStyle: {
      width: 250,
    },
    link: {
      color: "inherit",
      textDecoration: "inherit",
    },
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleReturnClicked = () => {
    dispatch(setPatronBooksToEmpty());
  };

  return (
    <div
      className={classes.drawerContentStyle}
      role="presentation"
      onClick={drawerToggler(false)}
      onKeyDown={drawerToggler(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/AddBook">
          <ListItemIcon>
            <LibraryAddIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText>Add Books</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/AddLibraryCard">
          <ListItemIcon>
            <AddCardIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText>Add Library Card</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={handleReturnClicked}
          component={Link}
          to="/ReturnBooks"
        >
          <ListItemIcon>
            <ReplayIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText>Return Books</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/RecentlyDeleted">
          <ListItemIcon>
            <DeleteIcon style={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText>Recently Deleted</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};
