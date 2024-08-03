"use client";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "../../public/assests/boy.png";
import img2 from "../../public/assests/man.png";
import img3 from "../../public/assests/man2.png";
import img4 from "../../public/assests/panda.png";
import img5 from "../../public/assests/woman.png";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useToast } from "./ui/use-toast";

const Card = ({ id, title, content, userId, name }: any) => {
  const { user } = useUser();
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const images = [img1, img2, img3, img4, img5];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setLoading(false);

        throw new Error("Failed to delete post");
      }
      toast({
        variant: 'destructive',
        title: "Success",
        description: "Post Deleted Succefully",
      })
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "Post Deleted faild Succefully",
      })
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingEdit(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!res.ok) {
        setLoadingEdit(false);
        throw new Error("Failed to update post");
      }

      toast({
        variant: 'destructive',
        title: "Success",
        description: "Post Updated Succefully",
      })
      setLoadingEdit(false);
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      setLoadingEdit(false);
      setIsEditing(false);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "Post Updated Failed Succefully",
      })
    }
  };

  return (
    <>
    <div className="bg-white shadow-md rounded-lg p-6 w-[80%] mx-auto my-4 border border-gray-200">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex">
          <Image
            src={randomImage}
            width={40}
            height={40}
            alt=""
            className="text-gray-600 text-3xl mr-3"
          />
          <span className="text-lg font-semibold">{name}</span>
        </div>
        {user?.id == userId && (
          <div className="flex">
            
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
      <Trash
      size={24}
      className="text-gray-500 mr-2 hover:text-gray-700 cursor-pointer"
      onClick={handleDelete}
    />
    )}
         
            <Edit
              size={24}
              className="text-red-500 hover:text-white-700 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleEdit}>
          <div>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div>
            <textarea
              className="w-full border rounded p-2 mb-4"
              value={editContent}
              rows={6}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
          
        {loadingEdit ? (
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
      Save
    </button>
    )}
        
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
        </div>
        <article className="text-pretty">
          <p className="text-gray-700 mb-4 ">{content.length > 250 ? content.slice(0, 250) + "..." : content}</p>
        </article>

          <Link href={`/post/${id}`}>
          
            <button className="text-blue-500 hover:underline">View Detail</button>
          </Link>
        </>
      )}
    </div>
    
    </>
  );
};

export default Card;
