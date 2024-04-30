import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    const { search, type } = await request.json();


    try {
        await connectToDB();
        var findInDB;
        if (type === 'tag') {
            findInDB = await Prompt.find({
                $or: [
                    { tag: { $regex: `${search}`, $options: "i" } },
                ]
            }).populate("creator");

        } else {

            findInDB = await Prompt.aggregate([
                {
                    $lookup: {
                        "from": "users",
                        "localField": "creator",
                        "foreignField": "_id",
                        "as": "creator"
                    },
                },
                {
                    "$unwind": "$creator"
                },
                {
                    $match: {
                        $or: [
                            { "creator.username": { $regex: `${search}`, $options: "i" } },
                            { "tag": { $regex: `${search}`, $options: "i" } },
                            { "prompt": { $regex: `${search}`, $options: "i" } }
                        ]
                    }
                }
            ]);

        }


        return new Response(JSON.stringify(findInDB), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch searched prompts", { status: 500 })
    }

}