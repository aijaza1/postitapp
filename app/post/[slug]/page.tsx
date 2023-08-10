"use client";

import Post from "../../components/Post";
import AddComment from "../../components/AddComment";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "../../types/Posts";
import placeholderImage from "../../images/placeholder.png";
import { format, formatDistanceToNow, parseISO } from "date-fns";

type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};

//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading";
  if (!data) return "Data not available";

  const imageUrl = data.user.image ?? placeholderImage;

  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={imageUrl} // Provide a default image if 'image' is not available
        postTitle={data.title}
        hearts={data.hearts}
        comments={data.Comment ?? []}
        createdAt={data.createdAt}
      />
      <AddComment id={data?.id} />
      {data.Comment &&
        data.Comment.map((comment) => (
          <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={comment.user.image ?? placeholderImage}
                alt="avatar"
              />

              <h3 className="font-bold text-black">
                {comment?.user?.name ?? "user not found"}
              </h3>
            </div>

            <p className="mt-1 text-xs text-black">
              {format(new Date(comment.createdAt), "MMMM d, yyyy")}
              {/* Display hours ago */}
              {" (" +
                formatDistanceToNow(parseISO(comment.createdAt)) +
                " ago)"}
            </p>

            <div className="mt-2 py-4">{comment.message}</div>
          </div>
        ))}
    </div>
  );
}
