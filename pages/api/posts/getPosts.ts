import type { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../prisma/client'

// if a post is being posted, check if there is a session
// (if user is logged in)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET"){
    
        // fetch all posts
        try{
            const data = await prisma.post.findMany({
                // also get the user info for the post
                include: {
                    user: true,
                    hearts: true,
                    Comment: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
            res.status(200).json(data)
        }catch(err){
            res.status(403).json({err: 'Error fetching posts'})

        }
    }
}