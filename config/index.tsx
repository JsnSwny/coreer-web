const dev = process.env.NODE_ENV != "production";

export const server = dev
  ? "http://192.168.0.14:8000"
  : "https://yourwebsite.com";
