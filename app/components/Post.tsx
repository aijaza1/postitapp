import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImage from "../images/placeholder.png";
import { PostType } from "../types/Posts";
import { useSession } from "next-auth/react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

interface PostProps {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: PostType["Comment"];
  hearts: PostType["hearts"];
  createdAt: string;
}

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  hearts,
  createdAt,
}: PostProps) {
  const imageUrl = avatar ?? placeholderImage;
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const session = useSession(); // Use useSession hook to get the session information

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

        <h3 className="font-bold text-black text-lg">{name}</h3>
      </div>

      <p className="mt-1 text-xs text-black">
        {format(new Date(createdAt), "MMMM d, yyyy")}
        {/* Display hours ago */}
        {" (" + formatDistanceToNow(parseISO(createdAt)) + " ago)"}
      </p>

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
          {liked ? (
            <AiFillHeart className="text-2xl" />
          ) : (
            <AiOutlineHeart className="text-2xl" />
          )}
        </p>
      </div>
    </div>
  );
}
