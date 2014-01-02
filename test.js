var assert     = require('assert')
	, biguint  = require('./index');

var tests = [
	[new Buffer([0, 0, 0, 0])], '0', 'toDecimalString',
	[new Buffer([0])], '0', 'toDecimalString',
	[[0, 0, 0, 0, 0, 0, 0, 0]], '0', 'toDecimalString',
	[[0]], '0', 'toDecimalString',
	[[0, 0, 0x10, 0]], '1048576', 'toDecimalString'
]

// Iterate over all tests
for (var i = 0; i < tests.length; i += 3) {
	assert.equal (biguint[tests[i+2]].apply(biguint, tests[i]), tests[i+1]);
};