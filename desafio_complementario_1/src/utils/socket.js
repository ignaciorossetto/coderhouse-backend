import {Server} from 'socket.io'
export const io = new Server();

export const  Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};

io.on("connection", function (socket) {
    console.log("A user connected", socket.id);
    socket.on('authenticated', (data)=>{
        console.log(data);
    })
});
