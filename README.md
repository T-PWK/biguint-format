JavaScript uses [IEEE 754 double-precision floats](http://steve.hollasch.net/cgindex/coding/ieeefloat.html) to represents numbers. That works perfectly fine for small numbers, however, it is an issue for big integers. This means they lose integer precision for values beyond `+/- 2 pow 53`

**Problem**

Presentation of *small* integer in decimal format works fine (e.g. `0x1FF`). However, we can see an issue when try to convert big integers like `0x1234567890abcdeffedcba908765421` to string decimal.

```js
(0x1FF).toString(10) // returns '511' - correct
(0x1234567890abcdeffedcba908765421).toString(10) // returns '1.5123660750094533e+36' - incorrect - lose integer precision
````

**Solution**

Node.js `biguint-format` module has been built in order to help display very large unsigned integers without any integer precision lose. `biguint-format` takes an array of bytes (values from 0 to 255) or node Buffer and converts it to decimal format.

```js
var biguint  = require('biguint-format');

// 0x1234567890abcdeffedcba908765421 split into bytes
biguint.toDecimalString([0x1, 0x23, 0x45, 0x67, 0x89, 0x0a, 0xbc, 0xde, 0xff, 0xed, 0xcb, 0xa9, 0x08, 0x76, 0x54, 0x21])

// output value is '1512366075009453296626403467035300897' - no integer precision lose
```

`biguint-format` can also take array of bytes in Big Endian (`BE` - default value) and Little Endian (`LE`) formats. Check [wikipedia](http://en.wikipedia.org/wiki/Endianness) for more details.

```js
var biguint  = require('biguint-format');

var buffer1 = new Buffer([0x63, 0xA7, 0x27]);
var buffer2 = new Buffer([0x27, 0xA7, 0x63]);

biguint.toDecimalString(buffer1, 'LE') // returns '2598755'
biguint.toDecimalString(buffer2, 'BE') // returns '2598755'
biguint.toDecimalString(buffer2)       // returns '2598755'
```
