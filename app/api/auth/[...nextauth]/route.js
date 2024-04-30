import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
            // checks: ['none']
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            // serverless -> Lambda -> dynamodb
            try {
                await connectToDB();

                // check if a user exists
                const userExists = await User.findOne({
                    email: profile.email
                })

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: (profile.username != undefined) ? profile.username.replace(/\s/g, "").toLowerCase()
                            : Buffer.from(profile.name.replace(/\s/g, "").toLowerCase(), 'ascii').toString('utf-8'),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                return false;
            }
        }

    }

})

export { handler as GET, handler as POST };