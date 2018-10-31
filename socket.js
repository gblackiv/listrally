

const socket_ioServer = ( io, mySQL, connection ) => {

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.dynamicRoom = '';

        socket.on('room', ( room ) => {
            socket.dynamicRoom = room;
            socket.join(socket.dynamicRoom);
        });

        socket.on('user', ( user ) => {
            socket.user = user;
        })

        socket.on('chat message', ( msg ) => {

            const chatQuery = `SELECT ID INTO @lid FROM ?? WHERE ?? = ?;
                                SELECT ID INTO @uid FROM ?? WHERE ?? = ?;
                                INSERT INTO ?? (listID, userID, message ) VALUES (@lid,@uid, ?)`;
            const chatInserts = [ 'lists', 'url', socket.dynamicRoom, 'users','googleID', socket.user.googleID, 'messages', msg ];
            const chatSQL = mySQL.format( chatQuery, chatInserts );
            connection.query( chatSQL, ( error, results, fields ) => {
                if(error){
                    console.log('Error inserting into messages:', error);
                }
            });
            const data = {};
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