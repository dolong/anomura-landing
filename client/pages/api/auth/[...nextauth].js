import NextAuth from 'next-auth';
import Moralis from 'moralis';
import CredentialsProvider from 'next-auth/providers/credentials';


const {
    NEXT_PUBLIC_NEXTAUTH_SECRET,
    // NEXT_PUBLIC_DISCORD_CLIENT_ID,
    // DISCORD_CLIENT_SECRET,
    // NEXT_PUBLIC_TWITTER_CLIENT_ID,
    // TWITTER_CLIENT_SECRET,
} = process.env;

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'MoralisAuth',
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0',
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0',
                },
            },
            async authorize(credentials) {
                try {
                    const { message, signature } = credentials;

                    console.log("message", message)
                    console.log("signature", signature)


                    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

                    const { address, profileId, expirationTime } = (
                        await Moralis.Auth.verify({ message, signature, network: 'evm' })
                    ).raw;

                    if (!address || !profileId) {
                        throw new Error("Signature cannot be verified.");
                    }

                    const user = { address, profileId, expirationTime, signature };

                    return user;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    // jwt: {
    //     signingKey: NEXT_PUBLIC_NEXTAUTH_SECRET,
    // },
    callbacks: {
        async jwt({ token, user }) {
            // eslint-disable-next-line no-unused-expressions
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.expires = token.user.expirationTime;
            session.user = token.user;
            return session;
        },
    },
    secret: NEXT_PUBLIC_NEXTAUTH_SECRET,
});