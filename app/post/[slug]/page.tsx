"use client"

import Post from "../../components/Post"
import AddComment from "../../components/AddComment"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostType } from "../../types/Post"
import placeholderImage from '../../images/placeholder.png'


type URL = {
  params: {
    slug: string
  }
  searchParams: string
}
//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  })
  if (isLoading) return "Loading"
  console.log(data)
  
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
            className="rounded-full"
              width={32}
              height={32}
              src={comment.user?.image ?? placeholderImage}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name ?? "user not found"}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
          </div>
      ))}
    </div>
  )
}