/**
 * using MySQL format to purge data retrieved from the frontend before sending to DB
 * all data returned is sent through variable dataToReturn
 * success will be true if there was no error in the retrieval of data
 * if success is false, there has been a failure in retrieving data from DB
 * inactive data from the DB will not be sent (inactive is psudo-deleted)
 */

const paths = ( server, mySQL, connection ) => {

	/**
	 * requires the url of the requested list
	 *if data.items is empty, there is no items attached to the list
	 */
	server.get( '/api/lists', (request, response ) => {
		const { url } = request.query;

		
		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'url', url ];
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error ){		//respond to the from end that there was an error with their data given to the server

				const dataToReturn = {
					success: false,
					data: "Error: Expected list url"
				}
				response.json( dataToReturn );
				return;
			}
	
			const dataToReturn = {
				success: true,
				data: {list: results}
			};

			const itemQuery = "SELECT ??, ?? as itemName, ?? as userName, ??, ??, ?? FROM ?? JOIN ?? ON ?? = ?? WHERE (?? = ? AND ?? = ?)";
			const itemInserts = [ 'items.ID','items.name','users.name','assignedUserID','avatar','items.listID','items','users','assignedUserID','users.ID', 'listID',results[0].ID,'items.status','active'];

			const itemSQL = mySQL.format( itemQuery, itemInserts );
	
			connection.query( itemSQL, ( error, results, fields ) => {
				if( error ){		//the to be retrieved was incorrect, and the query failed due to it being undefined
					console.log( "/api/lists error at item query:", error );
					
					const dataToReturn = {
						success: false,
						data: "Error: list url does not exist"
					}
					response.json( dataToReturn );
					return;
				}
				dataToReturn.data.items = results;
				response.json( dataToReturn );
			});
		});

	});

	/**
	 * requires name, listID, and assignedUserID of the new item
	 */
	server.put( '/api/newitem', ( request, response ) => {
		const { name, listID } = request.body;

		const itemQuery = 'INSERT INTO items ( name, listID ) VALUES ( ?, ? )';
		const itemInserts = [ name, listID ];
		const itemSQL = mySQL.format( itemQuery, itemInserts );

		connection.query( itemSQL, ( error, results, fields ) => {
			if( error ){		//some of the data in the request was either missing, or in an incorrect form
				console.log( "/api/newitem Error:", error );
				const dataToReturn = {
					success: false,
					data: "Error: did not receive the expected information for a new item"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The item "${name}" has been added to "List ${listID}"`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString,
				itemID: results.insertId
			};
			response.json( dataToReturn );
		});
	});
	/**
	 * requires all pieces of the item to be updated (ID, name, listID, and assignedUserID)
	 * if they are to be updated, then the information will be different than the current DB version
	 * if they are to remain the same, the data still needs to be sent along with the updated information
	 */
	server.patch( '/api/updateitem', ( request, response ) => {
		const { ID, name, listID, assignedUserID } = request.body;
		if(!ID || !name || !listID || assignedUserID === undefined ){
			const dataToReturn = {
				success: false,
				data: 'missing item update information'
			};
			response.json( dataToReturn );
			return;
		}
		const itemUserVerificationQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const itemUserVerificationInserts = ['items', 'ID', ID];
		const itemUserVerificationSQL = mySQL.format( itemUserVerificationQuery, itemUserVerificationInserts );

		connection.query( itemUserVerificationSQL, ( error, results, fields ) => {
			if( error ){		//the itemID that was trying to be deleted was incorrect
				console.log( '/api/updateitem error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: could not find item with the requested ID"
				}
				response.json( dataToReturn );
				return;
			}

			// if( request.user.ID !== results[0].assignedUserID ){
			// 	console.log( '/api/updateitem issue: unauthorized user attemped to update item ID', ID);
			// 	const dataToReturn = {
			// 		success: false,
			// 		data: 'Error: user is unauthorized to update the selected item'
			// 	};
			// 	response.json( dataToReturn );
			// 	return;
			// }
			let changedFields = '';
			if(results[0].name !== name){
				changedFields += 'name was changed ';
			}
			if(results[0].assignedUserID != assignedUserID){
				changedFields += 'assigned user was changed ';
			}
			const itemUpdateQuery = 'UPDATE items SET ??=?, ??=?, ??=? WHERE ?? = ?';
			const itemUpdateInserts = [ 'name', name, 'listID', listID, 'assignedUserID', assignedUserID, 'ID', ID ];
			const itemUpdateSQL = mySQL.format( itemUpdateQuery, itemUpdateInserts );
			console.log(itemUpdateSQL);

			connection.query( itemUpdateSQL, ( error, results, fields ) => {
				if( error ){		//missing data for the item to be updated
					console.log( "/api/updateitem Error:", error );
					const dataToReturn = {
						success: false,
						data: "Error: did not receive the expected items fields"
					}
					response.json( dataToReturn );
					return;
				};
				const successString = `The item ${ID} has been updated`;
				console.log( successString );

				const dataToReturn = {
					success: true,
					data: successString,
					changedFields
				};
				response.json( dataToReturn );
			});
		});
	});
	/**
	 * requires ID of the item to be deleted
	 * the item is not truely deleted, but the status is set to inactive
	 */
	server.post( '/api/deleteitem', ( request, response ) => {
		const { ID } = request.body;

		const itemUserVerificationQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const itemUserVerificationInserts = ['items', 'ID', ID];
		const itemUserVerificationSQL = mySQL.format( itemUserVerificationQuery, itemUserVerificationInserts );

		connection.query( itemUserVerificationSQL, ( error, results, fields ) => {
			if( error ){		//the itemID that was trying to be deleted was incorrect
				console.log( '/api/deleteitem error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: could not find item with the requested ID"
				}
				response.json( dataToReturn );
				return;
			}
			
			if( request.user && request.user.ID !== results[0].assignedUserID ){
				console.log( '/api/deleteitem issue: unauthorized user attemped to delete item ID', ID);
				const dataToReturn = {
					success: false,
					data: 'Error: user is unauthorized to delete the selected item'
				};
				response.json( dataToReturn );
				return;
			}

			const itemDeleteQuery = 'UPDATE items SET ?? = ? WHERE ?? = ?';
			const itemDeleteInserts = [ 'status', 'inactive', 'ID', ID ];
			const itemDeleteSQL = mySQL.format( itemDeleteQuery, itemDeleteInserts );

			connection.query( itemDeleteSQL, ( error, results, fields ) => {
				
				const successString = `The item ${ID} has been set to inactive`;
				console.log( successString );

				const dataToReturn = {
					success: true,
					data: successString
				};
				response.json( dataToReturn );
			});
		});
	});

	/**
	 * requires all fields of a list
	 * as well as creating a new list, updates the list_to_user DB in order to add the list to the users profile
	 */
	server.put( '/api/createlist', ( request, response ) => {
		const { name, description, url, securityStatus, eventTime} = request.body;
		const { ownerID } = request.user;

		const listCreationQuery = 'INSERT INTO lists (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
		const listCreationInserts = [ 'name', 'description', 'ownerID', 'url', 'securityStatus', 'eventTime', name, description, ownerID, url, securityStatus, eventTime ];
		const listCreationSQL = mySQL.format( listCreationQuery, listCreationInserts );

		connection.query( listCreationSQL, ( error, results, fields ) => {
			if( error ){		//missing fields of the list to be created
				console.log( '/api/createlist error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: incomplete, or incorrect data for a new list"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The list ${name} has been added to the lists table by owner ID ${ownerID}`;
			console.log( successString );

			//updated the list_to_users table to include the owner of the new list
			updateUserLists( request, response, ownerID, results.insertId );
		});
	});

	/**
	 * requires all fields of a list
	 * if any of the data is not to be updated, the original values must be sent alongside the new information
	 */
	server.patch( '/api/updatelist', ( request, response ) => {
		const { ID, name, description, ownerID, url, securityStatus, eventTime } = request.body;
		if( !ID || !name || !description || !ownerID || !url || !securityStatus || !eventTime ){
			const dataToReturn = {		//a field of information was not included in the request
				success: false,
				data: "Error: did not receive expected information"
			}
			response.json( dataToReturn );
			return;
		}
		const listUpdateQuery = 'UPDATE lists SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE ?? = ?';
		const listUpdateInserts = [ 'name', name, 'description',  description, 'ownerID', ownerID, 'url', url, 'securityStatus', securityStatus, 'eventTime', eventTime, 'ID', ID ];
		const listUpdateSQL = mySQL.format( listUpdateQuery, listUpdateInserts );

		connection.query( listUpdateSQL, ( error, results, fields ) => {
			if( error ){		//could not find a list by the ID given
				console.log( '/api/updatelist error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: list by that ID does not exist"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The list ${ID} has been updated`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});

	/**
	 * requires ID of the list to be deleted
	 * list not truely deleted, but the status is set to inactive
	 */
	server.delete( '/api/deletelist', ( request, response ) => {
		const { ID } = request.body;

		const listDeleteQuery = 'UPDATE lists SET ?? = ? WHERE ?? = ?';
		const listDeleteInserts = [ 'status' , 'inactive' , 'ID', ID ];
		const listDeleteSQL = mySQL.format( listDeleteQuery, listDeleteInserts );

		connection.query( listDeleteSQL, ( error, results, fields ) => {
			if( error ){		//list ID sent in request is invalid
				console.log( '/api/deletelist error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: cannot find list for the sent ID"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The list ${ID} has been set to inactive`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});

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
		const { ID } = request.query;
		if( ID !== request.user.ID ){
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
				data: results
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