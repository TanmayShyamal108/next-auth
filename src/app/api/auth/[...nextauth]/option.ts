
// import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "login";
interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
}


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "" },
                password: { label: "Password", type: "password" },
            },
            
            async authorize(credentials, req): Promise<any> {
                const requestBody = {
                    email: credentials?.email,
                    password: credentials?.password
                };
                const res = await fetch(baseURL, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: { "Content-Type": "application/json" },
                });
                const resdata = await res.json();
                console.log("Login...", resdata);
                if (
                    resdata.status === 400 ||
                    resdata.status === 401 ||
                    resdata.status === 403 ||
                    resdata.status === 500
                ) {
                    return null;
                }
                if (resdata.status === 200 || resdata.status === 201) {
                    return resdata;
                }
                // Return null if user data could not be retrieved
                return null;
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        // signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({ token, user }) {
            // if (user) {
            //     token.id = user.id
            // }
            // return token
            return { ...token, ...user };
        },
        async session({ session, user, token }) {

            // return session
            return session;
        }
    }

}