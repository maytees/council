// import NextAuth from "next-auth";
// import { cache } from "react";

// import { authConfig } from "./config";

// const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// const auth = cache(uncachedAuth);

// export { auth, handlers, signIn, signOut };

import NextAuth from "next-auth";
import { authConfig } from "./config";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
