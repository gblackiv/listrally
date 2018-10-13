/**
 * using MySQL format to purge data retrieved from the frontend before sending to DB
 * all data returned is sent through variable dataToReturn
 * success will be true if there was no error in the retrieval of data
 * if success is false, there has been a failure in retrieving data from DB
 * inactive data from the DB will not be sent (inactive is psudo-deleted)
 */

const paths = ( server, mySQL, connection ) => {

	
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
				response.json( dataToReturn );
				return;
			}
			const dataToReturn = {
				success: true,
				data: results
			};
			response.json( dataToReturn );
		});
	});

	/**
	 * requires ID of the user to retrieve their attached lists
	 * if the data is empty, the user has no lists they are a part of
	 */
	server.get( '/api/getuserlists', ( request, response ) => {
		const { ID } = request.user;
		if( ID !== request.user.ID || !ID){
			const dataToReturn = {
				success: false,
				data: 'Error: current user does not have access to the requested account'
			};
			response.json( dataToReturn );
			return;
		}

		const listsQuery = 'SELECT ??, ??, ??, ??, ?? FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
		const listsInserts = [ 'userID', 'lists.name', 'ownerID', 'securityStatus', 'lists.status', 'list_to_users', 'lists', 'listID', 'lists.ID', 'userID', ID ];
		const listsSQL = mySQL.format( listsQuery, listsInserts );

		connection.query( listsSQL, ( error, results, fields ) => {
			if( error ){		//the user ID sent is request is invalid
				console.log( '/api/getuserlists error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: the user ID sent was not found"
				}
				response.json( dataToReturn );
				return;
			}		
			const dataToReturn = {
				success: true,
				data: results,
				user: request.user
			};
			response.json( dataToReturn );
		});
	});

	/**
	 * needs to be contacted when a logged in user contacts a new list
	 * attaches the user to the list so that on their profile page they can track it
	 */
	server.put( '/api/updateuserlists', ( request, response ) => {
		const { userID, listID } = request.body;
		updateUserLists(request, response, userID, listID );
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
					data: 'ERROR: the connection to the database failed'
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `user ${ID} has updated their notifications`;
			console.log( successString );
			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		} );
	});

		//query used in multiple places
	function updateUserLists( request, response, userID, listID ){

		const userToListQuery = "INSERT INTO list_to_users (??, ??) VALUES (?, ?)";
		const userToListInserts = [ 'userID','listID', userID, listID ];
		const userToListSQL = mySQL.format( userToListQuery, userToListInserts );

		connection.query( userToListSQL, ( error, results, fields ) => {
			if( error ){
				console.log( '/api/updateuserlists error:', error );
				const dataToReturn = {
					success: false,
					data: 'Error: the list or user ID was incorrect'
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The user ${userID} has been added to list ${listID}`;
			console.log( successString );
			const dataToReturn = {
				success: true,
				data: successString,
				listID
			};
			response.json( dataToReturn );
		});
	}
}

module.exports = paths;