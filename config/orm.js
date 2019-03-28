var connection = require('../config/connection.js');

function printQuestionMarks(num){
	var arr =[];

	for (var i=0; i<num; i++){
		arr.push('?')
	};
	return arr.toString();
};

function objToSql(ob){
	// col1=value1,col2 = value2.....
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	};
	return arr.toString();
};

var orm = {
	all: function (burgers, cb) {
		var queryString = 'SELECT * FROM ' + burgers + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// vals is an array of values that we want to save to cols
		// cols are the columns we want to insert the values into
	create: function (burgers, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + burgers;

		queryString = queryString + ' (';
		queryString = queryString + cols.toString();
		queryString = queryString + ') ';
		queryString = queryString + 'VALUES (';
		queryString = queryString + printQuestionMarks(vals.length);
		queryString = queryString + ') ';

		console.log(queryString);

		connection.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// objColVals would be the columns and values that you want to update
		// an example of objColVals would be {name: panther, sleepy: true}
	update: function (burgers, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + burgers;

		queryString = queryString + ' SET ';
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		console.log(queryString);
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	delete: function (table, cb) {
        var queryString = 'TRUNCATE '+table;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};



module.exports = orm;

