"use client";
import { AiFillHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import placeholderImage from "../images/placeholder.png";
import Toggle from "./toggle";
import toast from "react-hot-toast";
import Link from "next/link";
import { PostType } from "../types/Posts";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
  hearts: PostType["hearts"];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
  hearts,
}: EditProps) {
  const imageUrl = avatar || placeholderImage;

  // toggle delete screen
  const [toggle, setToggle] = useState(false);

  const deleteToastIDRef = useRef<string | undefined>(undefined);
  const queryClient = useQueryClient();

  // delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting the post", {
          id: deleteToastIDRef.current,
        });
      },
      onSuccess: (data) => {
        toast.dismiss(deleteToastIDRef.current); // Clear the "Post is being deleted" toast
        toast.success("Post has been deleted");
        queryClient.invalidateQueries(["auth-posts"]);
      },
      onMutate: () => {
        // Display the loading toast and store the toast ID in deleteToastIDRef
        deleteToastIDRef.current = toast.loading("Deleting your post...");
      },
    }
  );

  const deletePost = () => {
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={imageUrl}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>

        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length ?? 0} Comments
            </p>
          </Link>

          <p className="text-sm font-bold flex items-center gap-1 text-gray-700">
            {hearts.length}
            <AiFillHeart className="text-2xl" />
          </p>

          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
