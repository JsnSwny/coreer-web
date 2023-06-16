const dev = process.env.NODE_ENV != "production";

export const server = dev ? "http://192.168.0.14:8000" : "https://coreer.herokuapp.com";

export const redisServer = dev ? "ws://192.168.0.14:8000" : "wss://coreer.herokuapp.com";
