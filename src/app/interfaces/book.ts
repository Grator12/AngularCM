import {IAuthor} from "./author";

export interface IBook {
  id: number,
  name: string,
  author: IAuthor
}

export interface IAddBook {
  name: string,
  author: IAuthor
}

export interface IEditBook {
  id: number,
  name: string,
  author: IAuthor
}

export interface IHttpBook {
  id: string,
  name: string,
  author: string
}
