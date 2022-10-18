import { Server as WebSocketServer } from "socket.io";
import http from "http";
import Sockets from "./sockets";
import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(PORT, "0.0.0.0");
console.log("Server on http://localhost:", PORT);

const io = new WebSocketServer(httpServer);

Sockets(io);
