import {Book} from "./book";

export interface CartItem {
  id: number;
  book: Book;
  amount: number;
}
