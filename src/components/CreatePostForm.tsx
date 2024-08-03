"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function CreatePostForm() {
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content}),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const result = await res.json();
      setSuccess("Post created successfully!");

      setTitle(""); 
      setContent(""); 
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="border-b border-gray-900/10">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="Title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                 placeholder="write title"
                name="title"
                id="Title"
                maxLength={25}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="Content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Content
            </label>
            <div className="mt-2">
              <textarea
                id="Content"
                placeholder="start typing ...."
                name="content"
                value={content}
                rows={6}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center my-4 gap-x-6">

        {loading ? (
      <svg
        className="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M4 12a8 8 0 0 1 16 0A8 8 0 0 1 4 12z" />
      </svg>
    ) : (
      <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Post
    </button>
    )}

       
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </form>
  );
}
