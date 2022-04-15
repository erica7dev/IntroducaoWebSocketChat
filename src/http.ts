import express from "express";
import http from "http";
import path from 'path';
import { Server } from "socket.io";

const app = express();

//arquivos static localmente
app.use(express.static(path.join(__dirname,"..","public")));

 const serverHttp = http.createServer(app);

//exportando nova conexão socket (com http + express)
const io = new Server(serverHttp);

export {serverHttp, io};