/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useLocation } from "react-router-dom";

export default function EditBook() {
  const location = useLocation();
  const book = location.state?.data?.book;

  console.log(book);
  return <div>EditBook</div>;
}
