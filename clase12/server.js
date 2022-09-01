const app = require("./app");
const PORT = process.env.PORT || 8080;
const {Server:HttpServer} = require("http");
const {Server:IOServer} = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const products = require("./src/contenedor");
let messages = [
    {date: new Date().toLocaleDateString()+ ' ' +new Date().toTimeString(),
    author:"Fede@gmail.com",text:"Hola ¿Qué tal?"},
    {date:new Date().toLocaleDateString()+ ' ' +new Date().toTimeString(),
    author:"Martin@gmail.com",text:"Muy Bien y vos?"},
    {date:new Date().toLocaleDateString()+ ' ' +new Date().toTimeString(),
    author:"Paula@gmail.com",text:"Todo OK!"}
];
const server = httpServer.listen(PORT, () => {
    console.log(`El servidor está escuchando por el puerto ${server.address().port}`);
});

server.on("Error", (error) => console.error("Error en el servidor: " + error));

server.on('error',(err)=>{
    console.log(err);
})
io.on('connection',(socket)=>{
    console.log('se conecto un cliente');
    socket.emit('messages',{messages,products:products.getAll()})
  
    socket.on('new-message',(data)=>{
        messages=[...messages,data]
        console.log(messages);
        let all ={messages:messages,products:products.getAll()}
        io.sockets.emit('messages',all)
})
socket.on('new-product',(data)=>{
    console.log(data);
    products.save(data);
    console.log(products.getAll());
    let todo ={messages:messages,products:products.getAll()}
    io.sockets.emit('messages',todo)
})
    
  })