import {Category} from "./category";

export interface Book {
  id: number;
  name: string;
  author: string;
  yearPublish: Date;
  imgUrl: string;
  price: number;
  amount: number;
  publisher: string;
  language: string;
  totalPages: number;
  numberRating: number;
  weight: number;
  description: number;
  category: Category;
}

