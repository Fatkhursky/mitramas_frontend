import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'john@.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials: any) => {
        console.log(111, credentials)
        //database look up
        // if (credentials.username === 'john' && credentials.password === 'test') {
        //   return {
        //     id: 2,
        //     name: 'john',
        //     email: 'john@.com',
        //   }
        // }
        return {
          id: 2,
          name: 'john',
          email: 'john@.com',
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
        if (token) {
            session.id = token.id
        }
        return session
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
   //encryption: true,
  },
  pages: {
    signIn: '/login',
  },
})
