import { makeStyles } from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  changeFilter,
  selectSearchFilter,
} from "../features/booklist/bookReducer";

export const SearchBarFilter = () => {
  const useStyles = makeStyles({
    selectEmpty: { marginLeft: "3vh", marginRight: "3vh" },
  });
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectSearchFilter);

  const setNewStateFilter = (e: any) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <NativeSelect
      name="searchCategory"
      className={classes.selectEmpty}
      onChange={setNewStateFilter}
      defaultValue={filter}
    >
      <option value="title">Title</option>
      <option value="authors">Author</option>
      <option value="isbn">ISBN</option>
      <option value="publishedYear">Publish Year</option>
    </NativeSelect>
  );
};
