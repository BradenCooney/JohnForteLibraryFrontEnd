import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import API from "../../app/api";
import Book from "../../types/book";
import BookWithIdForState from "../../types/BookWithIdForState";
import BookWithId from "../../types/bookWithId";
import { Card } from "../../types/card";

interface BookState {
  books: Array<any>;
  status: "idle" | "loading" | "failed";
  error: any;
  filterForSearch: string;
  availableBooks: Array<any>;
  filteredBooks: Array<any>;
  deletedBooks: Array<any>;
  patronBooks: Array<any>;
  addedCardNumber: {};
  checkoutResponseOpen: boolean;
  patronInfoResponseOpen: boolean;
  checkedoutBook: any;
  dueDate: any;
  patronInfo: {};
  availableChecked: boolean;
  overdueChecked: boolean;
}

const initialState: BookState = {
  books: [],
  status: "loading",
  error: null,
  filterForSearch: "title",
  availableBooks: [],
  filteredBooks: [],
  deletedBooks: [],
  patronBooks: [],
  addedCardNumber: {},
  checkoutResponseOpen: false,
  patronInfoResponseOpen: false,
  checkedoutBook: {},
  dueDate: "",
  patronInfo: {
    checkedOutInfo: {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      cardNumber: "",
    },
    dueDate: "",
    checkedOutDate: "",
  },
  availableChecked: true,
  overdueChecked: false,
};

export const fetchBookListTwo = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const data = await API.get("/Book");
    //const { data, error, isLoading } = await useGetAllBooksQuery(false);
    return data.data;
  }
);

export const fetchAvailableBooks = createAsyncThunk(
  "books/fetchAvailableBooks",
  async () => {
    const data = await API.get("/Book/Book/available");
    return data.data;
  }
);

export const fetchPatronInfo = createAsyncThunk(
  "books/fetchPatronInfo",
  async (bookId: number) => {
    const data = await API.get("/Book/Info/" + bookId.toString());
    return data.data;
  }
);

export const fetchCheckedOutBooks = createAsyncThunk(
  "book/fetchCheckedOutBooks",
  async (cardNumber: string) => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Book/CheckedOut?cardNumber=" +
        cardNumber
    );
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const addBookToList = createAsyncThunk(
  "books/addBook",
  async (book: Book) => {
    const response = await fetch("https://localhost:44371/api/Book", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(book),
    });
    return response.json();
  }
);

export const addLibraryCard = createAsyncThunk(
  "cards/addCard",
  async (card: Card) => {
    const response = await fetch("https://localhost:44371/api/Patron", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(card),
    });
    return response.json();
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (book: BookWithId) => {
    const apiString = "/Book/" + book.Id;
    const response = await API.delete(apiString, {
      headers: { "content-type": "application/json" },
      data: { source: book.Id },
    });
    return response.data;
  }
);

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (checkoutData: any) => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Book/CheckOut",
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(checkoutData),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }
    return data;
  }
);

export const returnBook = createAsyncThunk(
  "book/return",
  async (bookId: number) => {
    await API.put("https://localhost:44371/api/Book/Book/CheckIn", {
      BookId: bookId,
    });
    return bookId;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filterForSearch = action.payload;
    },
    setFilteredBooks: (state, action: PayloadAction<Array<any>>) => {
      state.filteredBooks = action.payload;
    },
    addDeletedBooks: (state, action: PayloadAction<Array<any>>) => {
      state.deletedBooks = state.deletedBooks.concat(action.payload);
    },
    updateAllArraysAfterDelete: (state, action: PayloadAction<BookWithId>) => {
      const booksIndex = state.books.findIndex(function (book) {
        return book.bookId === action.payload.Id;
      });
      state.books.splice(booksIndex, 1);
      const availableIndex = state.availableBooks.findIndex(function (book) {
        return book.bookId === action.payload.Id;
      });
      if (availableIndex !== -1) state.availableBooks.splice(availableIndex, 1);

      const filteredIndex = state.filteredBooks.findIndex(function (book) {
        return book.bookId === action.payload.Id;
      });
      if (filteredIndex !== -1) state.filteredBooks.splice(filteredIndex, 1);
    },
    updateAllArraysAfterRestore: (state, action: PayloadAction<any>) => {
      const deletedIndex = state.deletedBooks.findIndex(function (book) {
        return book.Id === action.payload.Id;
      });
      console.log(deletedIndex);
      if (deletedIndex !== -1) state.deletedBooks.splice(deletedIndex, 1);
    },
    removeFromAvailableBooks: (state, action: PayloadAction<any>) => {
      var index = state.availableBooks.findIndex(function (book) {
        return book.bookId === action.payload.Id;
      });
      if (index !== -1) {
        state.availableBooks.splice(index, 1);
      }
    },
    removeFromFilteredBooks: (state, action: PayloadAction<any>) => {
      var index = state.filteredBooks.findIndex(function (book) {
        return book.bookId === action.payload.Id;
      });
      if (index !== -1) {
        state.filteredBooks.splice(index, 1);
      }
    },
    setCheckoutResponseOpen: (state, action: PayloadAction<boolean>) => {
      state.checkoutResponseOpen = action.payload;
    },
    setPatronInfoResponseOpen: (state, action: PayloadAction<boolean>) => {
      state.patronInfoResponseOpen = action.payload;
    },
    setCheckedoutBook: (state, action: PayloadAction<any>) => {
      state.checkedoutBook = action.payload;
    },
    setDueDate: (state, action: PayloadAction<any>) => {
      state.dueDate = action.payload;
    },
    addBookToAllArrays: (state, action: PayloadAction<BookWithIdForState>) => {
      state.books = [...state.books, action.payload];
      state.filteredBooks = state.filteredBooks.concat(action.payload);
      state.availableBooks = state.availableBooks.concat(action.payload);
    },
    addBookToAvailable: (state, action: PayloadAction<BookWithIdForState>) => {
      action.payload.isOverdue = false;
      state.availableBooks = [...state.availableBooks, action.payload];
      var index = state.books.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      console.log(index);
      if (index !== -1) {
        state.books.splice(index, 1);
      }
      state.books = [...state.books, action.payload];
    },
    setAvailableChecked: (state, action: PayloadAction<boolean>) => {
      state.availableChecked = action.payload;
    },
    setOverdueChecked: (state, action: PayloadAction<boolean>) => {
      state.overdueChecked = action.payload;
    },
    setPatronBooksToEmpty: (state) => {
      state.patronBooks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookListTwo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookListTwo.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload.books;
      })
      .addCase(fetchBookListTwo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookToList.fulfilled, (state, action) => {
        state.status = "idle";
        state.books.push(action.payload.addedBook);
        state.filteredBooks.push(action.payload.addedBook);
        state.availableBooks.push(action.payload.addedBook);
      })
      .addCase(addBookToList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailableBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailableBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.availableBooks = action.payload.books;
        state.filteredBooks = action.payload.books;
      })
      .addCase(fetchAvailableBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPatronInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.patronInfo = action.payload;
      })
      .addCase(fetchPatronInfo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addLibraryCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLibraryCard.fulfilled, (state, action) => {
        state.status = "idle";
        state.addedCardNumber = action.payload;
      })
      .addCase(checkoutBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(checkoutBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCheckedOutBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCheckedOutBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.patronBooks = action.payload.books;
      })
      .addCase(returnBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.status = "idle";
        let index = state.patronBooks.findIndex(function (book) {
          return book.bookId === action.payload;
        });
        if (index !== -1) {
          state.patronBooks.splice(index, 1);
        }
      });
  },
});

export const {
  changeFilter,
  setFilteredBooks,
  addDeletedBooks,
  updateAllArraysAfterDelete,
  updateAllArraysAfterRestore,
  removeFromAvailableBooks,
  removeFromFilteredBooks,
  setCheckoutResponseOpen,
  setCheckedoutBook,
  setDueDate,
  addBookToAllArrays,
  setPatronInfoResponseOpen,
  setAvailableChecked,
  setOverdueChecked,
  addBookToAvailable,
  setPatronBooksToEmpty,
} = bookSlice.actions;

export default bookSlice.reducer;

export const selectAllBooks = (state: any) => state.bookReducerTwo.books;
export const selectAllAvailableBooks = (state: any) =>
  state.bookReducerTwo.availableBooks;
export const selectDeletedBooks = (state: any) =>
  state.bookReducerTwo.deletedBooks;
export const selectSearchFilter = (state: any) =>
  state.bookReducerTwo.filterForSearch;
export const selectFilteredBooks = (state: any) =>
  state.bookReducerTwo.filteredBooks;
export const selectPatronBooks = (state: any) =>
  state.bookReducerTwo.patronBooks;
export const selectLoadingState = (state: any) => state.bookReducerTwo.status;
export const selectCardResponse = (state: any) =>
  state.bookReducerTwo.addedCardNumber;
export const selectCheckoutResponseOpen = (state: any) =>
  state.bookReducerTwo.checkoutResponseOpen;
export const selectCheckoutedBook = (state: any) =>
  state.bookReducerTwo.checkedoutBook;
export const selectDueDate = (state: any) => state.bookReducerTwo.dueDate;
export const selectPatronInfo = (state: any) => state.bookReducerTwo.patronInfo;
export const selectPatronInfoResponse = (state: any) =>
  state.bookReducerTwo.patronInfoResponseOpen;
export const selectAvailableChecked = (state: any) =>
  state.bookReducerTwo.availableChecked;
export const selectOverdueChecked = (state: any) =>
  state.bookReducerTwo.overdueChecked;
