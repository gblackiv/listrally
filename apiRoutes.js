const paths = ( server, mySQL, connection ) => {

	server.get( '/api/lists', (request, response ) => {
		const { url } = request.query;
	
		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'url', url ];
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error ){
				console.log( '/api/lists error:', error );
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
			const itemQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const itemInserts = [ 'items', 'listID', results[0]['ID'] ];
			const itemSQL = mySQL.format( itemQuery, itemInserts );
	
			connection.query( itemSQL, ( error, results, fields ) => {
				if( error ){
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

	server.put( '/api/newitem', ( request, response ) => {
		const { name, listID, assignedUserID } = request.body;

		const itemQuery = 'INSERT INTO items ( name, listID, assignedUserID ) VALUES ( ?, ?, ? )';
		const itemInserts = [ name, listID, assignedUserID ];
		const itemSQL = mySQL.format( itemQuery, itemInserts );

		connection.query( itemSQL, ( error, results, fields ) => {
			if( error ){
				console.log( "/api/newitem Error:", error );
				const dataToReturn = {
					success: false,
					data: "Error: did not receive the expected information for a new item"
				}
				response.json( dataToReturn );
				return;
			}
			console.log( `The item "${name}" has been added to "List ${listID}"` );

			const dataToReturn = {
				success: true,
				data: `The item "${name}" has been added to "List ${listID}"`
			};
			response.json( dataToReturn );
		});
	});
	server.patch( '/api/updateitem', ( request, response ) => {
		const { ID, name, listID, assignedUserID } = request.body;

		const itemUpdateQuery = 'UPDATE items SET ??=?, ??=?, ??=? WHERE ?? = ?';
		const itemUpdateInserts = [ 'name', name, 'listID', listID, 'assignedUserID', assignedUserID, 'ID', ID ];
		const itemUpdateSQL = mySQL.format( itemUpdateQuery, itemUpdateInserts );

		connection.query( itemUpdateSQL, ( error, results, fields ) => {
			if( error ){
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
				data: successString
			};
			response.json( dataToReturn );
		});
	});
	server.delete( '/api/deleteitem', ( request, response ) => {
		const { ID } = request.body;

		const itemDeleteQuery = 'UPDATE items SET ?? = ? WHERE ?? = ?';
		const itemDeleteInserts = [ 'status', 'inactive', 'ID', ID ];
		const itemDeleteSQL = mySQL.format( itemDeleteQuery, itemDeleteInserts );

		connection.query( itemDeleteSQL, ( error, results, fields ) => {
			if( error ){
				console.log( '/api/deleteitem error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: could not find item with the requested ID"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The item ${ID} has been set to inactive`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});
	server.put( '/api/createlist', ( request, response ) => {
		const { name, description, ownerID, url, securityStatus, eventTime} = request.body;

		const listCreationQuery = 'INSERT INTO lists (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
		const listCreationInserts = [ 'name', 'description', 'ownerID', 'url', 'securityStatus', 'eventTime', name, description, ownerID, url, securityStatus, eventTime ];
		const listCreationSQL = mySQL.format( listCreationQuery, listCreationInserts );

		connection.query( listCreationSQL, ( error, results, fields ) => {
			if( error ){
				console.log( '/api/createlist error:', error );
				const dataToReturn = {
					success: false,
					data: "Error: incomplete, or incorrect data for a new list"
				}
				response.json( dataToReturn );
				return;
			}
			const successString = `The list ${name} has been added to the lists table at ${eventTime} by owner ID ${ownerID}`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});
	server.patch( '/api/updatelist', ( request, response ) => {
		const { ID, name, description, ownerID, url, securityStatus, eventTime } = request.body;
		if( !ID || !name || !description || !ownerID || !url || !securityStatus || !eventTime ){
			const dataToReturn = {
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
			if( error ){
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
	server.delete( '/api/deletelist', ( request, response ) => {
		const { ID } = request.body;

		const listDeleteQuery = 'UPDATE lists SET ?? = ? WHERE ?? = ?';
		const listDeleteInserts = [ 'status' , 'inactive' , 'ID', ID ];
		const listDeleteSQL = mySQL.format( listDeleteQuery, listDeleteInserts );

		connection.query( listDeleteSQL, ( error, results, fields ) => {
			if( error ) return next( error );
			const successString = `The list ${ID} has been set to inactive`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});
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
	server.get( '/api/getuserlists', ( request, response ) => {
		const { ID } = request.query;
		
		const listsQuery = 'SELECT ?,?,?,? FROM ?? JOIN ON ?? WHERE ? = ??';
		const listsInserts = [ 'lists.ID', 'lists.name', 'securityStatus', 'ownerID', 'lists', 'users', 'users.ID', ID ];
		const listsSQL = mySQL.format( listsQuery, listsInserts );

		connection.query( listsSQL, ( error, results, fields ) => {
			if( error ){
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
}

module.exports = paths;