// io = express + http(node)
import { io } from "./http";

//dois pontos em que se divide o websocket:
//emitir informacao
//receber informacao

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
  room: string;
  text: string;
  createdAt: Date;
  username: string;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data, callback) => {
    socket.join(data.room); //join joga usuário em uma sala

    //verificando se user já está ali (se estiver, socket id muda)
    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );

    //adicionando dados do usuário se ele não for encontrado
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id,
      }); //se ele não existir eu insiro ele no users
    }

    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });

  //Salva as msgs 
  //envia para os users da sala
  socket.on("message", (data) => {
    const message: Message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date(),
    };

    messages.push(message);

    io.to(data.room).emit("message", message);
  });
});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}