"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function MyProfile() {
    const { data: session } = useSession();

    const router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();
            setPosts(data)
        }
        if (session?.user.id) fetchPrompts();
    }, [])


    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        if (confirm("Are you sure?")) {
            const delPrompt = await fetch(`/api/prompt/${post._id}`, {
                method: "DELETE"
            });
            if (delPrompt.ok) {
                const filtered = posts.filter((p) => p._id != post._id);
                setPosts(filtered);
            }
        }
    }

    return (

        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;