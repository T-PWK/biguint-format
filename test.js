var assert     = require('assert')
	, biguint  = require('./index');

var tests = [
	[new Buffer([0, 0, 0, 0])], '0', 'toDecimalString',
	[new Buffer([0])], '0', 'toDecimalString',
	[[0, 0, 0, 0, 0, 0, 0, 0]], '0', 'toDecimalString',
	[[0]], '0', 'toDecimalString',
	[[0, 0, 0x10, 0], 'LE'], '1048576', 'toDecimalString',
	[[0x63, 0xA7, 0x27], 'LE'], '2598755', 'toDecimalString',
	[[0x27, 0xA7, 0x63], 'BE'], '2598755', 'toDecimalString',
	[[0x27, 0xA7, 0x63]], '2598755', 'toDecimalString',
	[[0x1, 0xDB, 0xD8, 0xA4], 'BE'], '31185060', 'toDecimalString',
	[[0x1, 0x23, 0x45, 0x67, 0x89, 0x0a, 0xbc, 0xde, 0xff, 0xed, 0xcb, 0xa9, 0x08, 0x76, 0x54, 0x21]], '1512366075009453296626403467035300897', 'toDecimalString',
	[[0x1, 0xFF, 0xFF]], '0x1ffff', 'toHexString',
	[[0xFF, 0xFF, 0x01], 'LE'], '0x1ffff', 'toHexString',
	[[0x00, 0x00, 0x00, 0x01]], '0x1', 'toHexString'
]

// Iterate over all tests
for (var i = 0; i < tests.length; i += 3) {
	assert.equal (biguint[tests[i+2]].apply(biguint, tests[i]), tests[i+1]);
};