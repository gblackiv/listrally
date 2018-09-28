const express = require( 'express' );
const mySQL = require( 'mysql' );
const server = express();
const PORT = 3000;
const mysqlCredentials = require( './mySQLCredentials.js' );
console.log(mysqlCredentials);

const connection = mySQL.createConnection( mysqlCredentials );
connection.connect( error => {
	if (error) throw error;

	console.log( `connected to ${mysqlCredentials.database}` );
});

server.use( express.json() );
server.use( express.urlencoded() );
server.use( express.static( `${__dirname}/html` ) );


server.get( '/lists/:ID', (request, response ) => {
	const { ID } = request.params;

	let query = 'SELECT * FROM ?? WHERE ?? = ?';
	let inserts = [ 'lists', 'ID', ID ]
	let sql = mySQL.format( query, inserts );
	
	connection.query( sql, ( error, results, fields ) => {
		if( error ) return next( error );

		console.log('results',results);
		const dataToReturn = {
			success: true,
			data: results
		};
		response.json( dataToReturn );
	});
});


server.get( '/data', ( request, response ) =>{
	console.log('got a basic request');
	response.send(JSON.stringify({things: 'here is some shiz'}));

} );



server.listen( PORT, () => { console.log( `server is listening on port ${PORT}` ) } );



