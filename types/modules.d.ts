declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    EMAIL_FROM: string;
    EMAIL_SERVER: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
