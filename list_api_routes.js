/**
 * using MySQL format to purge data retrieved from the frontend before sending to DB
 * all data returned is sent through variable dataToReturn
 * success will be true if there was no error in the retrieval of data
 * if success is false, there has been a failure in retrieving data from DB
 * inactive data from the DB will not be sent (inactive is psudo-deleted)
 */

const listRoutes = ( server, mySQL, connection ) => {

    /**
	 * requires the url of the requested list
	 *if data.items is empty, there is no items attached to the list
	 */
	server.get( '/api/lists/:url', (request, response ) => {
		const { url }  = request.params;

		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'url', url ];
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error || !results[0]){		//respond to the from end that there was an error with their data given to the server

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
	 * requires all fields of a list except url
	 * randomly generates a 40 char long url to attach to the list
	 * as well as creating a new list, updates the list_to_user DB in order to add the list to the users profile
	 */
	server.put( '/api/createlist', ( request, response ) => {
		const { name, description, securityStatus, eventTime} = request.body;
		const { ID: ownerID } = request.user;
		const randomArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9];
		let url = '';
		for( let urlChars = 0; urlChars < 40; urlChars++ ){
			url += randomArray[ Math.floor( Math.random() * randomArray.length ) ];
		}
		
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



}

module.exports = listRoutes;