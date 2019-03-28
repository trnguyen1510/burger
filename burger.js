
var orm = require('../config/orm.js');

var burgerType = {
	all: function (cb) {
		orm.all('burgers', function (res) {
			cb(res);
		});
	},
	// cols and vals are arrays
	create: function (cols, vals, cb) {
		orm.create('burgers', cols, vals, function (res) {
			cb(res);
		});
	},
	update: function (objColVals, condition, cb) {
		orm.update('burgers', objColVals, condition, function (res) {
			cb(res);
		});
	},

	delete: function (cb) {
        orm.delete('burgers',function (res) {
            cb(res);
        });
    }
};

module.exports = burgerType;