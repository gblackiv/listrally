

const socket_ioServer = ( io, mySQL ) => {

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.dynamicRoom = '';

        socket.on('room', ( room ) => {
            socket.dynamicRoom = room;
            socket.join(socket.dynamicRoom);
            console.log(socket.dynamicRoom);
        });

        socket.on('user', (user) => {
            socket.user = user;
            console.log('current socket user', socket.user);
        })

        socket.on('chat message', function(msg){
            const data = {};
            console.log('socket.room on chat:',socket.rooms[socket.dynamicRoom]);
            console.log('chat message user: ', socket.user);
            data.msg = msg;
            data.user = socket.user;
            io.to(socket.dynamicRoom).emit('chat message', data);

        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
}

module.exports = socket_ioServer;