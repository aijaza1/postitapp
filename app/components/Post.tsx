import { AiFillHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImage from "../images/placeholder.png";
import { PostType } from "../types/Posts";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

interface PostProps {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: PostType["Comment"];
  hearts: PostType["hearts"];
}

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  hearts,
}: PostProps) {
  const imageUrl = avatar ?? placeholderImage;

  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

  const session = useSession(); // Use useSession hook to get the session information

  console.log("session:", session);
  console.log("hearts:", hearts);

  useEffect(() => {
    if (session.data?.user?.email) {
      const userLiked = hearts.some(
        (heart) => heart.heartEmail === session?.data?.user?.email
      );
      setLiked(userLiked);
    }
  }, [hearts, session.data]);

  const { mutate } = useMutation(
    async () => axios.post("/api/posts/addLike", { postId: id }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["detail-post"]);
        if (data.status === 201) setLiked(true);
        if (data.status === 200) setLiked(false);
      },
    }
  );

  return (
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
        <p className="break-all">{postTitle}</p>
      </div>

      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length ?? 0} Comments
          </p>
        </Link>

        <p
          onClick={() => mutate()}
          className={`text-sm font-bold  flex items-center gap-1 ${
            liked ? "text-red-700" : "text-gray-700"
          }`}
        >
          {hearts.length}
          <AiFillHeart className="text-2xl" />
        </p>
      </div>
    </div>
  );
}
