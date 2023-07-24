export interface IReviews {
  username: string;
  rating?: number;
  comment: string;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  reviews?: IReviews[];
}
