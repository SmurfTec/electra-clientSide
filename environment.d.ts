namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    BACKEND_URL: string;
  }
}
