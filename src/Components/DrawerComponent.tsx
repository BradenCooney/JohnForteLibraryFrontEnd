import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { DrawerContents } from "./drawerContents";

type SidenavProps = {
  isOpen: boolean;
  drawerToggler: Function;
};

export const DrawerComponent = ({ isOpen, drawerToggler }: SidenavProps) => {
  const useStyles = makeStyles({
    drawerStyle: {
      backgroundColor: "rgb(194, 234, 189)",
      color: "black",
    },
  });

  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.drawerStyle }}
      anchor="left"
      open={isOpen}
      onClose={drawerToggler(false)}
    >
      <DrawerContents drawerToggler={drawerToggler} />
    </Drawer>
  );
};
