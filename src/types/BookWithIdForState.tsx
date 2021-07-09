export interface BookWithIdForState {
  bookId: number;
  title: string;
  authors: string[];
  isbn: string;
  publishedYear: number;
  isOverdue: boolean;
}

export default BookWithIdForState;
