import {IAuthor} from "./author";

export interface IBook {
  id: string,
  name: string,
  author: IAuthor,
  favorite?: boolean
}

export interface IAddBook {
  name: string,
  author: IAuthor
}

export interface IEditBook {
  id: string,
  name: string,
  author: IAuthor
}

export interface IHttpBook {
  id: string,
  name: string,
  author: string
}
