const { createDocumentRegistry } = require("typescript");

const socket = io();

//recuperando dados da url
const urlSearch = new URLSearchParams(window.location.search); //pego o que tem na barra
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//emit => emite informação
//on => escuta informação

//emitindo evento - passando informações
//socket = único
//io = aplicação toda
socket.emit('select_room',{
    username,
    room,
}, (messages) =>{
    messages.forEach(message => createMessage(message));
});

document.getElementById("message_input").addEventListener("click",(event) => {
   if(event.key === "Enter"){
       const message = event.target.value;
       
       event.target.value = ""; //limpa o campo

       const data = {
        room,
        message,
        username
      }

      socket.emit("message", data);
   }
});

socket.on("message", data => {
    //salvar msgs
    createMessage(data);
  });

  function createMessage(data) {
    const messageDiv = document.getElementById("messages");
  
    messageDiv.innerHTML +=`
    <div class="new_message">
      <label class="form-label">
        <strong>${data.username}</strong> <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
      </label>
    </div>
    `;
  };
  
  //saida
  document.getElementById("logout").addEventListener("click", (event) => {
    window.location.href = "index.html";
  })
  

 
 
 
 
 
 
 
 
 
 
 






