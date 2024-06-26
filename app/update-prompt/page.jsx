"use client"

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";


function EditPrompt() {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    const getPromptId = () => {
        const searchParam = useSearchParams();
        let searchParams = new URLSearchParams(searchParam);
        const promptId = searchParams.get("id");
        return promptId;
    }

    useEffect(() => {
        const getPromptDetails = async () => {

            const promptId = getPromptId();
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails();

    }, [promptId])

    // console.log(promptId)

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editPrompt}
            />
        </Suspense>
    )
}

export default EditPrompt