"use client";

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react'

const RefactoredWriter = ({ params }) => {
    const searchParam = useSearchParams();
    const paramName = searchParam.get("name");
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const getWriterDetails = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        getWriterDetails();

    }, []);

    const handleEdit = () => { }

    const handleDelete = async () => { }



    console.log(paramName);

    return (
        <Suspense>
            <Profile
                name={paramName}
                desc="Welcome to his personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </Suspense>
    )
}

export default RefactoredWriter