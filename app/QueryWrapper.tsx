'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactNode} from "react"
import { Toaster } from 'react-hot-toast'
// toaster to pop up error message

// React Query File, wrap whole file with this
// data-fetching library for web applications, 
// but in more technical terms, it makes fetching, caching, synchronizing 
// and updating server state in your web applications a breeze.

interface Props {
    children?: ReactNode
}

const queryClient = new QueryClient()

const QueryWrapper = ({children}: Props) => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
    </QueryClientProvider>
)

export default QueryWrapper