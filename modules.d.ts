declare namespace NodeJS {
  export interface ProcessEnv {
    EMAIL_SERVER: string;
    NEXT_PUBLIC_EMAIL_FROM: string;
    MONGODB_URI: string;
    NEXTAUTH_URL: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    SECRET: string;
  }
}
