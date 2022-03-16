import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/twitter'
import DiscordProvider from "next-auth/providers/discord";
export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET
        })

    ]
})