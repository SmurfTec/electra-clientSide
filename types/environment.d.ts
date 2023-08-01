namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FACEBOOK_CLIENT_ID:string
    FACEBOOK_CLIENT_SECRET:string
  }
}
