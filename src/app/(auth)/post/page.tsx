import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Card from "@/components/Card";
import CreatePostForm from "@/components/CreatePostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { headers } from "next/headers"

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: "GET",
    cache: "no-store",
    headers:headers()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const posts = await fetchPosts();

  return (
    <div>
        <CreatePostForm />
      <div className="mb-10">
        {posts?.map((post: any) => (
          <Card
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            content={post.content}
            name={post.user?.username}
          />
        ))}
      </div>
    </div>
  );
}
