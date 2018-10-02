const paths = ( server, mySQL, connection ) => {

	server.get( '/api/lists', (request, response ) => {
		const { ID } = request.query;
	
		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'ID', ID ]
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error ) return next( error );
	
			const dataToReturn = {
				success: true,
				data: {list: results}
			};
			const itemQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const itemInserts = [ 'items', 'listID', ID ];
			const itemSQL = mySQL.format( itemQuery, itemInserts );
	
			connection.query( itemSQL, ( error, results, fields ) => {
				if( error ) return next( error );
	
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
			if( error ) return next( error );
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
			if( error ) return next( error );
			const successString = `The item ${ID} has been updated to ${name}, ${assignedUserID}`;
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
			if( error ) return next( error );
			const successString = `The item ${ID} has been set to inactive`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});
	server.put( '/api/createlist', ( request, resonse ) => {
		const { name, description, ownerID, url, securityStatus, dateTime} = request.body;

		const listCreationQuery = 'INSERT INTO lists (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
		const listCreationInserts = [ 'name', 'description', 'ownerID', 'url', 'securityStatus', 'dateTime', name, description, ownerID, url, securityStatus, dateTime ];
		const listCreationSQL = mySQL.format( listCreationQuery, listCreationInserts );

		connection.query( listCreationSQL, ( error, results, fields ) => {
			if( error ) return next( error );
			const successString = `The list ${name} has been added to the lists table at ${dateTime} by owner ID ${ID}`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		});
	});
	server.patch( '/api/updatelist', ( request, response ) => {
		const { ID, name, description, ownerID, url, securityStatus, dateTime } = request.body;

		const listUpdateQuery = 'UPDATE lists SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE ?? = ?';
		const listUpdateInserts = [ 'name', 'description', 'ownerID', 'url', 'securityStatus', 'dateTime', name, description, ownerID, url, securityStatus, dateTime, 'ID', ID ];
		const listUpdateSQL = mySQL.format( listUpdateQuery, listUpdateInserts );
		
		connection.query( listUpdateSQL, ( error, results, fields ) => {
			if( error ) return next( error );
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
		const { ID } = request.body;

		const messageQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const messageInserts = [ 'messages', 'listID', ID ];
		const messageSQL = mySQL.format( messageQuery, messageInserts );

		connection.query( messageSQL, ( error, results, fields ) => {
			if( error ) return next( error );
			
			const dataToReturn = {
				success: true,
				data: results
			};
		});
	});
}

module.exports = paths;