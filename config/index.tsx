const dev = process.env.NODE_ENV != "production";

export const server = dev
	? "http://10.193.100.105:8000"
	: "https://coreer.herokuapp.com";

export const redisServer = dev
	? "ws://10.193.100.105:8000"
	: "wss://coreer.herokuapp.com";
