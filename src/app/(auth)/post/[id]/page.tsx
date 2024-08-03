import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Card from "@/components/Card";
import DetailsCard from "@/components/DetailsCard";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function fetchPostById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: headers(),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const post = await fetchPostById(id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="w-full min-w-full">
      <Link href={`/post`}>
        <ArrowLeft size={24} />
      </Link>

      <DetailsCard
        key={post.id}
        id={post.id}
        userId={post.userId}
        title={post.title}
        content={post.content}
        name={post.user?.username}
      />
    </div>
  );
}
