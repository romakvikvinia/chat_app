declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_HOST?: string;
    DATABASE_NAME?: string;
    DATABASE_PORT?: string;
    DATABASE_NAME?: string;

    JWT_SECRET?: string;
    JWT_EXPIRE_IN?: string;
    COOKIE_SECRET: string;
  }
}
