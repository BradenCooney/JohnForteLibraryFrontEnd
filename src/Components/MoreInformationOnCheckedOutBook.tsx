import { IconButton, makeStyles } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { useAppDispatch } from "../app/hooks";
import {
  fetchPatronInfo,
  setPatronInfoResponseOpen,
} from "../features/booklist/bookReducer";
import { BackdropPatronInfo } from "./BackdropPatronInfo";

type MoreInfoProps = {
  bookId: number;
};

export const MoreInformationOnCheckedOutBook = ({ bookId }: MoreInfoProps) => {
  const useStyles = makeStyles({
    iconContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
  });

  const dispatch = useAppDispatch();

  const HandleMoreInfoClicked = async () => {
    await dispatch(fetchPatronInfo(bookId));
    dispatch(setPatronInfoResponseOpen(true));
  };

  const classes = useStyles();

  return (
    <div className={classes.iconContainer}>
      <IconButton onClick={HandleMoreInfoClicked}>
        <PermIdentityIcon />
      </IconButton>
      <BackdropPatronInfo />
    </div>
  );
};
