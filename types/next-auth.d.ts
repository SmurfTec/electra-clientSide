import { Profile, TokenSet } from 'next-auth';
import 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session extends TokenSet {
    /** This is an example. You can find me in types/next-auth.d.ts */
    expires: Date;
    user: User;
  }
  /** The user's interface. */

  interface User extends Profile { }
  
}


