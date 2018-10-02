const express = require( 'express' );
const mySQL = require( 'mysql' );
const server = express();
const PORT = 3050;
const mysqlCredentials = require( './mySQLCredentials.js' );
const paths = require( './paths' );

const connection = mySQL.createConnection( mysqlCredentials );
connection.connect( error => {
	if (error) throw error;

	console.log( `connected to ${mysqlCredentials.database}` );
});

server.use( ( request, response, next ) => {
	response.header( "Access-Control-Allow-Origin", "*" );
	response.header( "Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept" );
	next();
});
server.use( express.json() );
server.use( express.urlencoded() );
server.use( express.static( `${__dirname}/client/dist` ) );

paths( server, mySQL, connection );


server.listen( PORT, () => { console.log( `server is listening on port ${PORT}` ) } );
