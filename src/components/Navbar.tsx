import Link from "next/link";
// import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavButton from "./ui/SignoutButton";
import Logo from "./Logo";
import SignInButton from "./ui/SigninButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 mb-5  w-full">
      <div className="container flex items-center justify-between">
        {session?.user ? (
          <>
            <Logo />
          </>
        ) : (
          <>
            <h1>Blog</h1>
          </>
        )}

        {session?.user && (
          <NavButton />
        ) }
      </div>
    </div>
  );
};

export default Navbar;
