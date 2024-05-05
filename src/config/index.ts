export const CONFIG = Object.freeze({
  ENV:
    (process.env.NEXT_PUBLIC_ENV as "development" | "production") ||
    "development",
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
});
