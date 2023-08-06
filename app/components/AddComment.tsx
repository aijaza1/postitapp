
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Comment = {
  postId?: string;
  title: string;
};

type PostProps = {
  id?: string | null;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const commentToastIdRef = useRef<string | undefined>(undefined);

  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/posts/addComment", { data });
    },
    {
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {
            id: commentToastIdRef.current,
          });
        }
      },
      onSuccess: (data) => {
        // Remove the toast when the mutation is successful
        toast.dismiss(commentToastIdRef.current);

        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Added your comment!");
        setTitle("");
        setIsDisabled(false);
      },
      onMutate: () => {
        // Display the loading toast and store the toast ID in commentToastIdRef
        commentToastIdRef.current = toast.loading("Adding your comment");
        setIsDisabled(true);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id !== null) {
      mutate({ title, postId: id });
    } else {
      // Handle the case where id is null (optional)
      setIsDisabled(false);
      console.error("ID is null");
    }
  };

  return (
    <form onSubmit={submitPost} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-[#5C4B99] text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
