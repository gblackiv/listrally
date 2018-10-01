const express = require( 'express' );
const mySQL = require( 'mysql' );
const server = express();
const PORT = 3000;
const mysqlCredentials = require( './mySQLCredentials.js' );

const connection = mySQL.createConnection( mysqlCredentials );
connection.connect( error => {
	if (error) throw error;

	console.log( `connected to ${mysqlCredentials.database}` );
});

server.use( express.json() );
server.use( express.urlencoded() );
server.use( express.static( `${__dirname}/client/dist` ) );


server.get( '/api/lists', (request, response ) => {
	const { ID } = request.query;

	const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
	const listInserts = [ 'lists', 'ID', ID ]
	const listSQL = mySQL.format( listQuery, listInserts );
	
	connection.query( listSQL, ( error, results, fields ) => {
		if( error ) return next( error );

		console.log('list results',results);
		const dataToReturn = {
			success: true,
			data: {list: results}
		};
		const itemQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const itemInserts = [ 'items', 'listID', ID ];
		const itemSQL = mySQL.format( itemQuery, itemInserts );

		connection.query( itemSQL, ( error, results, fields ) => {
			if( error ) return next( error );

			console.log( 'item results', results);
			dataToReturn.data.items = results;
			response.json( dataToReturn );
		});
	});
});


server.get( '/data', ( request, response ) =>{
	console.log('got a basic request');
	response.send(JSON.stringify({things: 'here is some shiz'}));

} );



server.listen( PORT, () => { console.log( `server is listening on port ${PORT}` ) } );



