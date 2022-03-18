import Head from 'next/head';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {

    const { data: session } = useSession()
    if (session) {
        return <>
            <Head>
                <title>Anomura Wallet</title>
                <link rel="icon" href="/img/favicons/faviconStar.png" />
            </Head>

            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    }
    return <>
        <Head>
            <title>Anomura Wallet</title>
            <link rel="icon" href="/img/favicons/faviconStar.png" />
        </Head>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
    </>
}
