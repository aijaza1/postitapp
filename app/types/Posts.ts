export type PostType = {
    title: string
    id: string
    createdAt?: string
    user: {
        email: string
        id: string
        image: string
        name: string
    }
    Comment?: {
        createdAt: string
        id: string
        postId: string
        message: string // Add the 'message' property here
        userId: string
        user: {
            email: string
            id: string
            image: string
            name: string
        }
    }[]
}