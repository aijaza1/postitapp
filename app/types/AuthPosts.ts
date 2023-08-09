// define how data looks like
export type AuthPosts = {
    email: string
    id: string
    image: string
    name: string
    Post: {
        hearts: { 
            id: string;
            postId: string; 
            userId: string; 
            heartEmail: string; 
            user: { 
                email: string;
                id: string; 
                image: string; 
                name: string } 
            }[]
        createdAt: string
        id: string
        title: string
        Comment?: {
            createdAt: string
            id: string
            postId: string
            title: string
            userId: string
        }[]
    }[]
}