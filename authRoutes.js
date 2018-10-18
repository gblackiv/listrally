
/**
 * using Google Oauth
 * requires passport package
 * using cookies to maintain connection with Google account
 */

const authRoutes = ( server, mySQL, connection, passport ) => {

	/**
	 * uses this endpoint in order to establish login
	 * also uses this endpoint to make sure that user is still logged in
	 * once this endpoint is hit, it will redirect users to a page to login and allow permissions
	 */
	server.get( '/auth/login', passport.authenticate( 'google', {
		scope: [ 'profile', 'email' ]	//the permissions we are requesting for the user
		})
	);

	/**
	 * after a user is logged in, they will be redirected back from the Google login page to this page
	 * the response is the user information that is currently logged in
	 * with each request from this point forward, there is a cookie that is sent back and forth, with the user attached
	 */
	server.get( '/auth/login/redirect', passport.authenticate( 'google' ), ( request, response ) => {
		response.redirect('/');
	});

	/**
	 * in order to logout, this endpoint needs to be hit
	 * deletes the user information inside the cookie, so that the next time the user contacts the server, it is not remembered
	 */
	server.get( '/auth/logout', ( request, response ) => {
		request.logout();
		response.redirect('/');
	});

	/**
	 * whenever the frontend needs to know the user information, this endpoint is available to be called in order to gain that info
	 */
	server.get( '/auth/getuserinfo', ( request, response ) => {
		const dataToSend = {}
		if( !request.user ){
			dataToSend.success = false;
			dataToSend.user = {}
			}
		else{
			console.log(request.user.ID);
			dataToSend.success = true;
			dataToSend.user = request.user;
		}
		response.json( dataToSend );
	})
}
module.exports = authRoutes;