/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookApi";
import SkeletonDetails from "../components/skeleton/SkeletonDetails";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useSingleBookQuery(id as string);
  const book = data?.data;
  const [deleteBook, { isLoading: isLoading2, data: data2 }] =
    useDeleteBookMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = window as any;
  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    await deleteBook(id as string);
  };

  useEffect(() => {
    if (data2?.success) {
      toast.success(data2.message as string);
      setTimeout(() => navigate("/all-books"), 1300);
    }
  }, [data2, navigate]);

  return (
    <div className="py-16 md:px-6">
      {isLoading ? (
        <SkeletonDetails />
      ) : (
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              className="md:w-[250px] h-full"
              src={book?.image}
              alt={book?.title}
            />
          </figure>
          {book ? (
            <div className="card-body">
              <div className="flex flex-col gap-5">
                <h2 className="card-title">{book?.title}</h2>
                <p className="text-sm">Author: {book?.author}</p>
                <p className="text-sm">Genre: {book?.genre}</p>
                <p className="text-sm pb-2">
                  Publication date: {book?.publicationDate}
                </p>
              </div>
              <div className="flex justify-around mt-auto">
                <button
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  onClick={() => openModal?.confirmModal.showModal()}
                  disabled={isLoading2}
                  className="btn btn-error"
                >
                  {isLoading2 ? "Deleting..." : "Delete"}
                </button>
                <Link
                  to="/edit-book"
                  state={{
                    data: {
                      book,
                    },
                  }}
                >
                  <button className="btn btn-success">Edit</button>
                </Link>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-semibold p-32">No data for `{id}`</h1>
          )}
        </div>
      )}

      {/* modal  */}
      <Modal
        message="Are you sure you want to delete this item."
        fn={handleDeleteBook}
      />
    </div>
  );
}
