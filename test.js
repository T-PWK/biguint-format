var assert     = require('assert')
	, biguint  = require('./index');

var tests = [
	[new Buffer([0, 0, 0, 0]), 'dec'], '0',
	[new Buffer([0]), 'dec'], '0',
	[[0, 0, 0, 0, 0, 0, 0, 0], 'dec'], '0',
	[[0], 'dec'], '0',
	['0x000000', 'dec'], '0',
	['0x27A763', 'dec'], '2598755',
	['0x100', 'dec'], '256',
	['0x0000100', 'dec'], '256',
	[[0, 0, 0x10, 0], 'dec', {format:'LE'}], '1048576',
	[[0x63, 0xA7, 0x27], 'dec', {format:'LE'}], '2598755',
	[[0x27, 0xA7, 0x63], 'dec', {format:'BE'}], '2598755',
	[[0x27, 0xA7, 0x63], 'dec'], '2598755',
	[[0x1, 0xDB, 0xD8, 0xA4], 'dec', {format:'BE'}], '31185060',
	[[0x1, 0x23, 0x45, 0x67, 0x89, 0x0a, 0xbc, 0xde, 0xff, 0xed, 0xcb, 0xa9, 0x08, 0x76, 0x54, 0x21], 'dec'], '1512366075009453296626403467035300897',
	['0x1234567890abcdeffedcba908765421', 'dec'], '1512366075009453296626403467035300897',
	['1234567890abcdeffedcba908765421', 'dec'], '1512366075009453296626403467035300897',
	[[0x1, 0xFF, 0xFF], 'hex'], '1ffff',
	[[0x1, 0xFF, 0xFF], 'hex', {prefix:'0x'}], '0x1ffff',
	[[0xFF, 0xFF, 0x01], 'hex', {format:'LE', prefix:'0x'}], '0x1ffff',
	[[0x00, 0x00, 0x00, 0x01], 'hex', {prefix:'0x'}], '0x1',
	['0x0000100', 'hex', {prefix:'0x'}], '0x100',
	['0x1FF', 'oct'], '777',
	[[0xFF, 0x1], 'oct', {format:'LE'}], '777',
	['0x123456789A', 'oct', {prefix:'0'}], '01106425474232',
	['0x123456789ABCDEFF', 'oct', {prefix:'0'}], '0110642547423257157377',
	[[0xFF, 0x1], 'bin', {format:'LE'}], '0000000111111111',
	[[0x1, 0xFF], 'bin'], '0000000111111111',
	['0x1FF', 'bin', {delimiter:' '}], '00000001 11111111',
	['0x1FF', 'bin', {delimiter:'|', prefix:'B'}], 'B00000001|11111111'
]

// Iterate over all tests
for (var i = 0; i < tests.length; i += 2) {
	assert.equal (biguint.format.apply(biguint, tests[i]), tests[i+1]);
};