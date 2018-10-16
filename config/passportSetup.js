/**
 * the file to set up how the passport module will function
 * uses stratagies that are passed to the endpoints for each different login method
 */

const GoogleStrategy = require( 'passport-google-oauth20' );
const googleCreds = require( './googleCredentials.js');


const passportSetup = ( server, mySQL, connection, passport ) => {

	/**
	 * this is how the user information is passed through the cookie 
	 * it is serialized in order to keep it secure as it is sent
	 */
	passport.serializeUser( ( user, done ) => {
		done( null, parseInt( user.googleID ) );
	});
	/**
	 * the opposite of serializeUser, used to deserialize the user data sent back with each cookie in order to verify user
	 */
	passport.deserializeUser( ( ID, done ) => {
		verifyUserCookie( ID ).then( user => {
			done( null, user )
		})
	});
	/**
	 * What is to be passed to the endpoints
	 * holds the data needed to contact Google's api
	 * accessToken, refreshToken, and profile are sent back from Google API, done is the callback function that progresses login
	 */
	passport.use( new GoogleStrategy( {
		callbackURL: '/auth/login/redirect',
		clientID: googleCreds.clientID,
		clientSecret: googleCreds.clientSecret
		}, ( accessToken, refreshToken, profile, done) => {
			verifyUser( profile ).then( ( user ) => {
				done( null, user );
			});
	}));

	/**
	 * creating a promise that will allow the new GoogleStratagy on line 32 the ability to use the done callback function correctly
	 * this is in order to circumvent the asynchronous behavior of MySQL
	 * the functions fires when the user that is trying to be accessed by the login attempt does not exist
	 * takes the data from the Google profile, and put them into our DB
	 */
	function createUserInDB( googleProfile ){
		return new Promise( ( resolve, reject ) => {
		const userCreationQuery = 'INSERT INTO ?? ( name, familyName, givenName, googleID, email, avatar ) VALUES ( ?, ?, ?, ?, ?, ? )';
		const userCreationInserts = [ 'users', googleProfile.displayName, googleProfile.name.familyName, googleProfile.name.givenName, googleProfile.id, googleProfile.emails[0].value || 0, profile.photos[0].value ];
		const userCreationSQL = mySQL.format( userCreationQuery, userCreationInserts );
			connection.query( userCreationSQL, ( error, results, fields ) => {
				if(error){
					console.log('create user in DB error',error);
				}
				console.log( `created new user in DB with googleID of ${googleProfile.id}`);
				const getNewUserQuery = `SELECT * FROM users WHERE googleID = ${googleProfile.id}`;
				connection.query( getNewUserQuery, ( error, results, fields ) => {
					if(error) {
						console.log(error);
					}
					resolve(results[0]);
				});
			});
		});
	}
	/**
	 * this is used after the user has allowed access to their Google profile
	 * contacts our DB in order to either grab their data for our app, or create their account if they do not currently exist
	 */
	function verifyUser(profile){
		return new Promise( function( resolve, reject ){
			const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const userInserts = [ 'users', 'googleID', profile.id ];
			const userSQL = mySQL.format( userQuery, userInserts );
	
			connection.query( userSQL, ( error, results, fields ) => {
				if ( error ) {
					console.log("verify user error",error);
				}
	
				let user = results[0];
				//if statement to check if the user exists
				if( user && user.googleID == profile.id ){
						//if statement to check if they are in our DB with old information, and if so to update their information
					if( user.email !== (profile.emails[0].value || null) || user.name !== profile.displayName || user.avatar !== profile.photos[0].value){
						const updateUserQuery = 'UPDATE users SET ??=?, ??=?, ??=? WHERE ??=?';
						const updateUserInserts = [ 'email', profile.emails[0].value, 'name', profile.name, 'avatar', profile.photos[0].value, 'googleID', profile.id ];
						const updateUserSQL = mySQL.format( updateUserQuery, updateUserInserts );
						connection.query( updateUserSQL, ( error, results, fields ) => {
							if(error) {
								console.log(error);
							}
							console.log( `user ID: ${user.ID} has been updated`);
							resolve( user );
						});
					}
					else{
						resolve(user);
					}
				}
				//the user does not exist, so the user needs to be created in our DB
				else{
					createUserInDB( profile ).then(( newUser ) => {
						user = newUser;
						resolve(user);
					});
				}	
			});
		});
	}
	/**
	 * eachtime the server is contacted, the user is sent through a cookie
	 * this is using the deconstructed cookie to verify that the user is inside our DB, and confirm they are logged in
	 */
	function verifyUserCookie( ID ){
		return new Promise( function( resolve, reject ){
			const userQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const userInserts = [ 'users', 'googleID', ID ];
			const userSQL = mySQL.format( userQuery, userInserts );

			connection.query( userSQL, ( error, results, fields ) => {
				if(error) {
					console.log(error);
				}

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