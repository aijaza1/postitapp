import Link from "next/link";
import Login from "./auth/Login";
import Logged from "./auth/Logged";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <div className="w-40 md:w-48">
          <Image src="/postiflyimg.png" alt="/" width={180} height={80} />
        </div>
      </Link>

      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
