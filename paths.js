const paths = ( server, mySQL, connection ) => {

	server.get( '/api/lists', (request, response ) => {
		const { ID } = request.query;
	
		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'ID', ID ]
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error ) return next( error );
	
			console.log('list results',results);
			const dataToReturn = {
				success: true,
				data: {list: results}
			};
			const itemQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const itemInserts = [ 'items', 'listID', ID ];
			const itemSQL = mySQL.format( itemQuery, itemInserts );
	
			connection.query( itemSQL, ( error, results, fields ) => {
				if( error ) return next( error );
	
				console.log( 'item results', results);
				dataToReturn.data.items = results;
				response.json( dataToReturn );
			});
		});
	});

}

module.exports = paths;