import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  })
]
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
