import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in to like a post." });
    }

    try {
      // Get User
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });


      if (!prismaUser) {
        return res.status(401).json({ message: "User not found." });
      }

      // Check if the post was liked by the user
      const heart = await prisma.heart.findFirst({
        where: {
          postId: req.body.postId,
          userId: prismaUser?.id,
          heartEmail: prismaUser.email,
        },
      });

      if (!heart) {
        const result = await prisma.heart.create({
          data: {
            postId: req.body.postId,
            userId: prismaUser.id,
            heartEmail: prismaUser.email,
          },
        });
        return res.status(201).json(result);
      } else {
        const result = await prisma.heart.delete({
          where: {
            id: heart.id,
          },
        });
        return res.status(200).json(result);
      }
    } catch (err) {
      console.error("Error occurred:", err);
      return res.status(500).json({ err: "Error has occurred while making a like" });
    }
  }
}
