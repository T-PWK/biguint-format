/**
 * Support for formatting big uint numbers in Node.js
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 *
 * All the module methods wrap a node Buffer or an array of byte (values from 0 to 255)
 * values and format big uint number to required format. The internal buffer format is 
 * Little Endian i.e. the most-significant byte is the last byte of the buffer, the
 * least-significant at buffer[0]. Supplied numbers can have different formats. In case 
 * of Big Endian format, format attribute needs to be specified
 */

function toDecimalString (buffer, format) {
	var format = format || 'LE'             // bytest format BE - Big Endian, LE - Little Endian (default)
		, buffer = toBuffer(buffer, format) // number buffer working copy
		, bits = buffer.length * 8          // number of bits in the buffer
		, lastBit = buffer.length -1        // last bit index
		, digits = new Buffer(Math.floor(bits / 3 + 1 + 1)) // digits buffer
		, lastDigit = digits.length - 1     // last digit index
		, d      // digit index
		, carry; // carry flag

	digits.fill(0);

	for (i = 0; i < bits; i++) {
		carry = buffer[lastBit] >= 0x80;

		// shift buffer bits
		bufferShift(buffer);

		for (d = lastDigit; d >= 0; d--) {
			digits[d] += digits[d] + (carry ? 1 : 0);
			carry = (digits[d] > 9);
			if (carry) digits[d] -= 10;
		};

	};

	for (var i = 0; i < digits.length; i++) {
		// get rid of leading 0's; reuse d for the first non-zero value index
		if(digits[i] > 0) {
			d = i;
			break;
		}
	};

	// if there are only 0's use the last digit
	d = d >= 0 ? d : lastDigit;

	// convert numbers to ascii digits
	for (var i = 0; i < digits.length; i++) {
		digits[i] += 48;
	};

	return digits.toString('ascii', d);
}

function toHexString (buffer, format) {
}

function toOctetString (buffer, format) {
}

function toBuffer (buffer, format) {
	var _buffer;
	if (Buffer.isBuffer(buffer)) {
		_buffer = new Buffer(buffer.length);
		buffer.copy(_buffer);
	} 
	else if (Array.isArray(buffer)) {
		_buffer = new Buffer(buffer);
	}
	return _buffer;
}

function bufferShift (buffer) {
	var carry;
	for (var i = buffer.length; i >= 0; i--) {
		carry = (buffer[i] & 0x80) != 0;
		buffer[i] = (buffer[i] * 2) & 0xFF;
		if(carry && i >= 0) buffer[i+1] |= 0x01;		
	};
}

module.exports = {
	'toDecimalString': toDecimalString,
	'toHexString': toHexString,
	'toOctetString': toOctetString
}