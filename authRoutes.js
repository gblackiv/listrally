const authRoutes = ( server, mySQL, connection, passport ) => {
	server.get( '/auth/login', passport.authenticate( 'google', {
		scope: [ 'profile', 'email' ]
		})
	);
	server.get( '/auth/login/redirect', passport.authenticate( 'google' ), ( request, response ) => {
		response.send(request.user);

	});
	server.get( '/auth/logout', ( request, response ) => {
		request.logout();
	});
}
module.exports = authRoutes;