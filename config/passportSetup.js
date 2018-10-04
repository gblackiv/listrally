const GoogleStrategy = require( 'passport-google-oauth20' );
const googleCreds = require( './googleCredentials.js');


const passportSetup = ( server, mySQL, connection, passport ) => {

	passport.serializeUser( ( user, done ) => {
		done( null, parseInt( user[0].googleID ) );
	});

	passport.deserializeUser( ( ID, done ) => {
		const findUser = new Promise( function( resolve, reject ){
			const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const userInserts = [ 'users', 'googleID', ID ];
			const userSQL = mySQL.format( userQuery, userInserts );
	
			connection.query( userSQL, ( error, results, fields ) => {
				//if ( error ) throw error;
	
				const user = results
				console.log( 'inside find user defined ');
				if( user === undefined ){
					console.log('need to create new user');
				}
				else{
					console.log('have matched user defined');
				}
				resolve(user)
			});
		}).then( user => {
			done( null, user )
		})
	});

	passport.use( new GoogleStrategy( {
		callbackURL: '/auth/login/redirect',
		clientID: googleCreds.clientID,
		clientSecret: googleCreds.clientSecret
		}, ( accessToken, refreshToken, profile, done) => {
			console.log( 'have profile info' );
			let user = {};
			const findUser = new Promise( function( resolve, reject ){
				const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
				const userInserts = [ 'users', 'googleID', profile.id ];
				const userSQL = mySQL.format( userQuery, userInserts );
		
				connection.query( userSQL, ( error, results, fields ) => {
					//if ( error ) throw error;
		
					user = results
					console.log( profile );
					console.log( 'inside find user defined ');
					if( user === undefined ){
						createUserInDB( profile );
					}
					else{
						console.log('have matched user defined');
					}
					resolve(user)
				});
			}).then( ( user ) => {
				done( null, user );
			});
	}));

	
}
function createUserInDB( googleProfile ){
	const userCreationQuery = 'INSERT INTO ?? ( name, googleID, email, avatar ) VALUES ( ?, ?, ?, ? )'
	const userCreationInserts = [ 'users', googleProfile.displayName, googleProfile.id, googleProfile.email, googleProfile.image.url ];
	const userCreationSQL = mySQL.format( userCreationQuery, userCreationInserts );

	connection.query( userCreationSQL, ( error, results, fields ) => {
		console.log( `created new user in DB with googleID of ${googleProfile.id}`);
	});
}

module.exports = passportSetup;