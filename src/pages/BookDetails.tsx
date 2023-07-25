/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookApi";
import SkeletonDetails from "../components/skeleton/SkeletonDetails";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IReviews } from "../types";
import { useAppSelector } from "../redux/hook";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useSingleBookQuery(id as string, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  const book = data?.data;
  const [deleteBook, { isLoading: isLoading2, data: data2 }] =
    useDeleteBookMutation();
  const [addComment, { isLoading: isLoading3, data: data3 }] =
    useAddCommentMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = window as any;
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleDeleteBook = async () => {
    await deleteBook(id as string);
  };

  const handleAddComment = async () => {
    if (!comment) return;

    const commentOptions = {
      id: id as string,
      data: {
        username: user?.email?.split("@")[0],
        comment,
        ...(rating ? { rating } : {}),
      },
    };

    await addComment(commentOptions);
    setComment("");
    setRating(0);
  };

  useEffect(() => {
    if (data2?.success) {
      toast.success(data2.message as string);
      setTimeout(() => navigate("/all-books"), 1300);
    }

    if (data3?.success) {
      toast.success(data3.message as string);
    }
  }, [data2, navigate, data3]);

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

              {/* for authenticate user  */}
              {user.email === book.ref && (
                <div className="flex justify-between mt-auto">
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    onClick={() => openModal?.confirmModal.showModal()}
                    disabled={isLoading2}
                    className="btn btn-sm md:btn-md btn-error"
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
                    <button className="btn btn-sm md:btn-md btn-success ml-2 md:ml-0">
                      Edit
                    </button>
                  </Link>
                </div>
              )}
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

      {/* Add reviews  */}
      <div className="pt-16 pb-4 flex flex-col items-end justify-center">
        <textarea
          className="textarea textarea-bordered w-full"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Write a comment..."
        ></textarea>

        <div className="flex items-center justify-center">
          <select
            onChange={(e) => setRating(Number(e.target.value))}
            className="select select-sm md:select-md select-bordered w-full max-w-xs mt-2 mr-1"
          >
            <option disabled selected>
              Ratings
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            disabled={isLoading3}
            onClick={handleAddComment}
            className="btn btn-sm md:btn-md btn-primary mt-2"
          >
            {isLoading3 ? "Comment adding..." : "Comment"}
          </button>
        </div>
      </div>

      {/* show review  */}
      <div>
        {book?.reviews?.map((review: IReviews) => (
          <>
            <div className="flex items-center justify-start w-full gap-2">
              <div className="flex flex-col justify-center items-start w-12">
                <div className="avatar">
                  <div className="w-6 h-6 rounded-full">
                    <img src="/graduation.jpg" />
                  </div>
                </div>
                <p className="font-serif text-[10px] py-1">
                  {review?.username}
                </p>
              </div>
              <h1 className="font-serif pb-5 max-w-4xl">{review?.comment}</h1>
            </div>
            <hr className="h-4 w-full" />
          </>
        ))}
      </div>
    </div>
  );
}
