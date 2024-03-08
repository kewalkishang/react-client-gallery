import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { text } from 'stream/consumers';
import { userAgent } from '../../../../../node_modules/next/server';

export const options: NextAuthOptions = {
    providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  CredentialsProvider(
    {
      name:"Credentials",
      credentials:{
        username : {
          label : "Username :",
          type : "text",
          placeholder : "Enter Username"
        },
        password : {
          label : "Password :",
          type : "password",
          placeholder : "Enter password"
        }
      },
      async authorize(credentials){
          const user = { id : 1 , username : "Kewal", password : "password"};
          if(credentials?.username === user.username && credentials?.password === user.password )
          {
            return user;
          }
          else{
            return null;
          }
      }
    }
  )
],
secret: process.env.NEXTAUTH_SECRET,
}


// export const authOptions ={
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//  session: {
//   strategy: 'jwt',
//  },
// };
// export default NextAuth(authOptions);
