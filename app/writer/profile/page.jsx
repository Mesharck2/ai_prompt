"use client";

import { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

const WriterProfile = () => {
    const searchParams = useSearchParams();
    const writerId = searchParams.get("id");
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const getWriterDetails = async () => {
            const response = await fetch(`/api/users/${writerId}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        getWriterDetails();

    }, []);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }


    return (
        <Profile
            name={posts[0]?.creator.username}
            desc="Welcome to his personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default WriterProfile;