import React, { useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'

function Shared() {
  const { data, status } = useSession()
  console.log(data)
  return (
    <>
      {status === 'authenticated' ? (
        <section className="flex flex-col gap-3">
          {/* Test {data}!{' '} */}
          Welcome {data?.user?.name}!{' '}
          <button onClick={() => signOut()}>Sign out</button>
          <ul>
            <li>
              {/* <a href="https://subdomain.solutions-subdomain-auth.vercel.sh">
                  subdomain.solutions-subdomain-auth.vercel.sh
                </a> */}
            </li>
            <li>
              {/* <a href="https://solutions-subdomain-auth.vercel.sh">
                  solutions-subdomain-auth.vercel.sh
                </a> */}
            </li>
          </ul>
        </section>
      ) : status === 'loading' ? (
        <section className="text-center">
          <div>Loading...</div>
        </section>
      ) : (
        <section className="m-auto w-fit">
          <button size="lg" onClick={() => signIn('discord')}>
            Sign in with GitHub
          </button>
        </section>
      )}
    </>
  );
}
Shared.needWeb3Provider = true
export default Shared;

// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "pages/api/auth/[...nextauth]";

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );

//   return {
//     props: {
//       session,
//     },
//   };
// }
