import Link from "next/link"
import Login from "./auth/Login"
import Logged from "./auth/Logged"
import Image from 'next/image'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"


export default async function Nav() {
    const session = await getServerSession(authOptions)
    
    return(
        <nav className="flex justify-between items-center py-8">
            
            <Link href={"/"}>
                <Image src="/postpalnav.png" alt="/" width="200" height="80" />
            </Link>


            <ul className="flex items-center gap-6">
            {!session?.user && <Login />}
            {session?.user && <Logged image={session.user?.image || ""} />}
            </ul>
        </nav>
    )
    
}