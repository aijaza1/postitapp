"user client";

import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
// mutation when something updates, adds, removes

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  // Declare toastPostID as a ref to persist its value across renders
  const toastPostID = useRef<string | undefined>(undefined);

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {
            id: toastPostID.current,
          });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        // Remove the toast when the mutation is successful
        toast.dismiss(toastPostID.current);

        queryClient.invalidateQueries(["posts"]);
        toast.success("Post has been made!");
        setTitle("");
        setIsDisabled(false);
      },
      onMutate: () => {
        // Display the loading toast and store the toast ID in toastPostID
        toastPostID.current = toast.loading("Creating your post");
        setIsDisabled(true);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200 break-words"
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {`${title.length}/300`}
        </p>

        <button
          disabled={isDisabled}
          className="text-sm bg-[#5C4B99] text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
