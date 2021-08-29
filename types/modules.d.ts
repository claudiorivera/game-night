declare namespace NodeJS {
  export interface ProcessEnv {
    EMAIL_SERVER: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_EMAIL_FROM: string;
    NEXTAUTH_URL: string;
    SECRET: string;
  }
}
