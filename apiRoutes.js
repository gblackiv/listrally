/**
 * using MySQL format to purge data retrieved from the frontend before sending to DB
 * all data returned is sent through variable dataToReturn
 * success will be true if there was no error in the retrieval of data
 * if success is false, there has been a failure in retrieving data from DB
 * inactive data from the DB will not be sent (inactive is psudo-deleted)
 */

const routes = ( server, mySQL, connection ) => {


	/**
	 * needed for the deployed site to kickstart react routing.
	 * any request that doesnt first hit our site fails because it is going straight to the server, which then will get redirected back the the main html
	 * in order to follow the react routing to the correct site
	 */
	server.get( '/*', ( request, response ) => {
		response.sendFile( `${__dirname}/index.html`, error => {
			if( error ){
				response.status(500).send(error);
			}
		})
	})
	
	/**
	 * requires ID of the list that messages belong to
	 * depending on if websocket server is set up, this will need to be called on repeat to give users up to date messages
	 * if data is empty, there is no messages for the current list
	 */
	server.get( '/api/messages', ( request, response ) => {
		const { ID } = request.query;

		const messageQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const messageInserts = [ 'messages', 'listID', ID ];
		const messageSQL = mySQL.format( messageQuery, messageInserts );

		connection.query( messageSQL, ( error, results, fields ) => {
			if( error ){
				console.log( '/api/messages error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: cannot find messages for the sent list ID"
				}
				response.status( 400 ).json( dataToReturn );
				return;
			}
			const dataToReturn = {
				success: true,
				data: results
			};
			response.status( 200 ).json( dataToReturn );
		});
	});

	/**
	 * requires ID of the user to retrieve their attached lists
	 * if the data is empty, the user has no lists they are a part of
	 */
	server.get( '/api/getuserlists', ( request, response ) => {
		if( !request.user){
			const dataToReturn = {
				success: false,
				data: 'Error: current user does not have access to the requested account'
			};
			response.status( 403 ).json( dataToReturn );
			return;
		}
		const { ID } = request.user;

		const listsQuery = 'SELECT ??, ??, ??, ??, ??, ??, ?? FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
		const listsInserts = [ 'eventTime','url','userID', 'lists.name', 'ownerID', 'securityStatus', 'lists.status', 'list_to_users', 'lists', 'listID', 'lists.ID', 'userID', ID ];
		const listsSQL = mySQL.format( listsQuery, listsInserts );

		connection.query( listsSQL, ( error, results, fields ) => {
			if( error ){		//the user ID sent is request is invalid
				console.log( '/api/getuserlists error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: the user ID sent was not found"
				}
				response.status( 400 ).json( dataToReturn );
				return;
			}		
			const dataToReturn = {
				success: true,
				data: results,
				user: request.user
			};
			response.status( 200 ).json( dataToReturn );
		});
	});

	/**
	 * contact when user hits the notifications button
	 * send in the data a param names notificationsSetting, set to either true or false
	 * user must be logged in to access
	 */
	server.put( '/api/notifications', ( request, resonse ) => {
		const { notificationsSettings } = request.body;
		const { ID } = request.user;

		const userNotificationsQuery = "UPDATE users SET notifications=? WHERE ID=?";
		const userNotificationsInserts = [ notificationsSettings, ID ];
		const userNotificationsSQL = mySQL.format( userNotificationsQuery, userNotificationsInserts );

		connection.query( userNotificationsSQL, ( error, results, fields ) => {
			if(error){
				console.log('/api/notifications error:', error);
				const dataToReturn = {
					success: false,
					data: 'ERROR: The selected user could not be found'
				}
				response.status( 400 ).json( dataToReturn );
				return;
			}
			const successString = `user ${ID} has updated their notifications`;
			console.log( successString );
			const dataToReturn = {
				success: true,
				data: successString,
				user: request.user
			};
			response.status( 200 ).json( dataToReturn );
		} );
	});

}

module.exports = routes;