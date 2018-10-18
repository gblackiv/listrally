
//requiring all the modules, as well as external files
const express = require( 'express' );
const mySQL = require( 'mysql' );
const passport = require( 'passport' );
const passportSetup = require( './config/passportSetup.js' );
const mysqlCredentials = require( './config/mySQLCredentials.js' );
const cookieSession = require( 'cookie-session' );

const apiRoutes = require( './apiRoutes.js' );
const listRoutes = require( './list_api_routes.js');
const itemRoutes = require( './item_api_routes.js')
const authRoutes = require( './authRoutes.js' );
const keys = require( './config/keys.js' );

const server = express();
const PORT = 3050;

//MySQL connection being made
const connection = mySQL.createConnection( mysqlCredentials );
connection.connect( error => {
	if (error) throw error;

	console.log( `connected to ${mysqlCredentials.database}` );
});


//middleware for the server
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


//routes for the server
apiRoutes( server, mySQL, connection );
listRoutes( server, mySQL, connection );
itemRoutes( server, mySQL, connection );
authRoutes( server, mySQL, connection, passport)
passportSetup( server, mySQL, connection, passport );


server.listen( PORT, () => { console.log( `server is listening on port ${PORT}` ) } );
