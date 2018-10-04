const express = require( 'express' );
const mySQL = require( 'mysql' );
const passport = require( 'passport' );
const passportSetup = require( './config/passportSetup.js' );
const mysqlCredentials = require( './config/mySQLCredentials.js' );
const paths = require( './paths' );
const keys = require( './config/keys.js' );
const cookieSession = require( 'cookie-session' );
const server = express();
const PORT = 3050;

const connection = mySQL.createConnection( mysqlCredentials );
connection.connect( error => {
	if (error) throw error;

	console.log( `connected to ${mysqlCredentials.database}` );
});

server.use( cookieSession({
	maxAge: 24 * 60 * 60 * 1000,	//one day in milliseconds
	keys: keys.cookieKey
}));
server.use( passport.initialize() );
server.use( passport.session() );
server.use( ( request, response, next ) => {
	response.header( "Access-Control-Allow-Origin", "*" );
	response.header( "Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept" );
	next();
});
server.use( express.json() );
server.use( express.urlencoded() );
server.use( express.static( `${__dirname}/client/dist` ) );

paths( server, mySQL, connection );
passportSetup( server, mySQL, connection, passport );
server.get( '/auth/login', passport.authenticate( 'google', {
	scope: [ 'profile' ],
	access_type: 'offline'
	})
);
server.get( '/auth/login/redirect', passport.authenticate( 'google' ), ( request, response ) => {
	response.send('callback URI reached!')
});




server.listen( PORT, () => { console.log( `server is listening on port ${PORT}` ) } );
