const GoogleStrategy = require( 'passport-google-oauth20' );
const googleCreds = require( './googleCredentials.js');


const passportSetup = ( server, mySQL, connection, passport ) => {

	passport.serializeUser( ( user, done ) => {
		done( null, parseInt( user.googleID ) );
	});

	passport.deserializeUser( ( ID, done ) => {
		verifyUserCookie( ID ).then( user => {
			done( null, user )
		})
	});

	passport.use( new GoogleStrategy( {
		callbackURL: '/auth/login/redirect',
		clientID: googleCreds.clientID,
		clientSecret: googleCreds.clientSecret
		}, ( accessToken, refreshToken, profile, done) => {
			verifyUser( profile ).then( ( user ) => {
				done( null, user );
			});
	}));

	function createUserInDB( googleProfile ){
		return new Promise( ( resolve, reject ) => {
		const userCreationQuery = 'INSERT INTO ?? ( name, googleID, email, avatar ) VALUES ( ?, ?, ?, ? )';
		const userCreationInserts = [ 'users', googleProfile.displayName, googleProfile.id, googleProfile.emails[0].value || 0, googleProfile._json.image.url ];
		const userCreationSQL = mySQL.format( userCreationQuery, userCreationInserts );
			connection.query( userCreationSQL, ( error, results, fields ) => {
				console.log( `created new user in DB with googleID of ${googleProfile.id}`);
				const getNewUserQuery = `SELECT * FROM users WHERE googleID = ${googleProfile.id}`;
				connection.query( getNewUserQuery, ( error, results, fields ) => {
					resolve(results[0]);
				});
			});
		});
	}
	function verifyUser(profile){
		return new Promise( function( resolve, reject ){
			const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const userInserts = [ 'users', 'googleID', profile.id ];
			const userSQL = mySQL.format( userQuery, userInserts );
	
			connection.query( userSQL, ( error, results, fields ) => {
				//if ( error ) throw error;
	
				let user = results[0];
				if( user && user.googleID == profile.id ){
					if( user.email !== (profile.emails[0].value || 1) || user.name !== profile.displayName || user.avatar !== profile._json.image.url){
						console.log( `emails: ${user.email} -- ${profile.email}`);
						const updateUserQuery = 'UPDATE users SET ??=?, ??=?, ??=?, WHERE ??=?';
						const updateUserInserts = [ 'email', profile.email, 'name', profile.name, 'avatar', profile._json.image.url, 'googleID', profile.id ];
						const updateUserSQL = mySQL.format( updateUserQuery, updateUserInserts );
						connection.query( updateUserSQL, ( error, results, fields ) => {
							console.log( `user ID: ${user.ID} has been updated`);
							resolve( user );
						});
					}
					else{
						resolve(user);
					}
				}
				else{
					createUserInDB( profile ).then(( newUser ) => {
						user = newUser;
						resolve(user);
					});
				}	
			});
		});
	}
	function verifyUserCookie( ID ){
		return new Promise( function( resolve, reject ){
			const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const userInserts = [ 'users', 'googleID', ID ];
			const userSQL = mySQL.format( userQuery, userInserts );

			connection.query( userSQL, ( error, results, fields ) => {
				//if ( error ) throw error;

				const user = results[0];
				if( user.googleID != ID ){
					console.log('incorrect user auth code!!');
				}
				else{
					console.log('have matched user defined');
				}
				resolve(user)
			});
		});
	}

}
module.exports = passportSetup;