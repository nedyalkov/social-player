var dataFile = 'data/queue.json';
exports.get = function(req, res) {
	fs = require('fs');
	fs.readFile(dataFile, function(err, data) {
		var dataJson = JSON.parse(data);
		res.send(dataJson);
	});
};

exports.put = function(req, res) {
	fs = require('fs');
	fs.readFile(dataFile, function(err, data) {
		var dataJson = JSON.parse(data);
		dataJson.push({ 'id': req.params.id, 'requestedBy': req.params.requestedBy, 'index': dataJson.length });
		fs.writeFile(dataFile, JSON.stringify(dataJson), function(err) {
			if (err) {		
				console.log('Error occurred');
			}
			res.send(dataJson);
		});
	});
};