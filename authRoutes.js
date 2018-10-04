const authRoutes = ( server, mySQL, connection, passport ) => {
	server.get( '/auth/login', passport.authenticate( 'google', {
		scope: [ 'profile' ]
		})
	);
	server.get( '/auth/login/redirect', passport.authenticate( 'google' ), ( request, response ) => {
		response.send(request.user);

	});
}
module.exports = authRoutes;