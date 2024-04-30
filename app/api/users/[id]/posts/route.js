import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (requests, { params }) => {
    try {
        await connectToDB();
        const data = await Prompt.find({ creator: params.id }).populate("creator");
        return new Response(JSON.stringify(data), { status: 200 });

    } catch {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
} 