// [
//     "Fiction",
//     "Science Fiction",
//     "Mystery",
//     "Romance",
//     "Non-fiction",
//     "Fantasy",
//     "Classic",
//     "Thriller",
//     "Biography",
//     "Historical Fiction",
//     "Self-help",
//     "Horror",
//     "Adventure",
//     "Young Adult",
//     "Dystopian",
//     "Contemporary",
//     "Poetry",
//     "Humor",
//     "Graphic Novel",
//     "Memoir",
//   ]

interface IReviews {
  username: string;
  rating?: number;
  comment: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  reviews: IReviews[];
}
