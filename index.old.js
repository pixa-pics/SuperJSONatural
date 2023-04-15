"use strict";

/*
* The MIT License (MIT)
*
* Copyright (c) 2023 Affolter Matias
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

class Base64 {
    constructor() {
        this.memoryA = new Uint8Array(4096);
        this.memoryB = new Uint8Array(4096);
        this.base64abcCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
        this.CHUNCK_LENGTH = 256;
        this.base64error_code = 255;
        this.base64codes = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
        this.base64codes_length = this.base64codes.length | 0;
    }

    charCodeAt(s) {
        "use strict";
        return (s.charCodeAt(0) | 0) & 0xFF;
    }

    setBase64CodesBufferResults(buffer, start, buffer_1) {
        "use strict";
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
        buffer[(start+2|0) >>> 0] = buffer_1 & 0xFF;
    }
    setBase64CodesBufferResultsMO2(buffer, start, buffer_1) {
        "use strict";
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
    }
    setBase64CodesBufferResultsMO1(buffer, start, buffer_1) {
        "use strict";
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
    }
    setBase64CodesBufferResultsMO0(buffer, start, buffer_1) {
        "use strict";
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
        buffer[(start+2|0) >>> 0] = buffer_1 & 0xFF;
    }
    setBase64CodesBufferResultsBy4(buffer, start, buffer_1, buffer_2, buffer_3, buffer_4 ) {
        "use strict";
        start = (start | 0) >>> 0;
        this.setBase64CodesBufferResults(buffer, (start|0) >>> 0, (buffer_1 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+3|0) >>> 0, (buffer_2 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+6|0) >>> 0, (buffer_3 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+9|0) >>> 0, (buffer_4 | 0) >>> 0);
    }
    getBase64Code(char_code) {
        "use strict";
        char_code = (char_code | 0) & 0xFF;
        return (this.base64codes[char_code] | 0) >>> 0;
    }
    getBase64CodesBuffer(str_char_codes, start) {
        "use strict";
        return (this.getBase64Code(str_char_codes[start+0|0]) << 18 | this.getBase64Code(str_char_codes[start+1|0]) << 12 | this.getBase64Code(str_char_codes[start+2|0]) << 6 | this.getBase64Code(str_char_codes[start+3|0]) | 0) >>> 0;
    }
    resetMemory(length) {
        "use strict";
        length = typeof length == "undefined" ? 4096: length;
        length = length | 0;
        this.memoryA = new Uint8Array(length | 0);
        this.memoryB = new Uint8Array(length | 0);
    }
    bytesToBase64(bytes) {
        "use strict";
        var i = 2, J = 0, j = J >> 2, l = bytes.length | 0;
        var k = l % 3 | 0, n = Math.floor(l / 3) * 4 + (k && k + 1) | 0, N = Math.ceil(l / 3) * 4 | 0;
        var s = "", rl = N|0;
        this.memoryA = (this.memoryA.length|0) >= (N|0) ? this.memoryA: new Uint8Array(N|0);
        var result = this.memoryA.subarray(0, N|0);

        for (; (i|0) < (l|0); i = (i+3|0)>>>0, J = (J+1|0)>>>0, j = J >> 2) {
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[((bytes[(i - 2 | 0)>>>0] & 0x03) << 4) | (bytes[(i - 1 | 0)>>>0] >> 4)] & 0xFF;
            result[(j+2|0)>>>0] = this.base64abcCC[((bytes[(i - 1 | 0)>>>0] & 0x0F) << 2) | (bytes[(i|0)>>>0] >> 6)] & 0xFF;
            result[(j+3|0)>>>0] = this.base64abcCC[bytes[(i|0)>>>0] & 0x3F] & 0xFF;
        }

        if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[(bytes[(i - 2 | 0)>>>0] & 0x03) << 4] & 0xFF;
            result[(j+2|0)>>>0] = "=".charCodeAt(0) & 0xFF;
            result[(j+3|0)>>>0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }

        if ((i|0) == (l|0)) {
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[((bytes[(i - 2 | 0)>>>0] & 0x03) << 4) | (bytes[(i - 1 | 0)>>>0] >> 4)] & 0xFF;
            result[(j+2|0)>>>0] = this.base64abcCC[(bytes[(i - 1 | 0)>>>0] & 0x0F) << 2] & 0xFF;
            result[(j+3|0)>>>0] = "=".charCodeAt(0) & 0xFF;
        }


        for(i = 0; (i|0) < (rl|0); i = (i+this.CHUNCK_LENGTH|0)>>>0){
            s = s.concat(String.fromCharCode.apply(null, result.subarray(i|0, Math.min(i+this.CHUNCK_LENGTH|0, rl|0))));
        }

        return s;
    }

    base64ToBytes(str, offset, constructor) {
        "use strict";
        offset = offset | 0;
        constructor = (typeof constructor == "undefined") ? Uint8Array: constructor;

        var str_length = str.length - offset | 0;
        if ((str_length % 4 | 0) > 0) {
            throw new Error("Unable to parse base64 string.");
        }
        var index = str.indexOf("=") | 0;
        if ((index|0) > -1 && (index|0) < (str_length - 2 | 0)) {
            throw new Error("Unable to parse base64 string.");
        }
        var missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
            n = str_length | 0,
            N = 3 * (n / 4) - missingOctets | 0;

        this.memoryA = (this.memoryA.length|0) >= (N|0) ? this.memoryA: new Uint8Array(N|0);
        this.memoryB = (this.memoryB.length|0) >= (str_length|0) ? this.memoryB: new Uint8Array(str_length|0);
        var result = this.memoryA.subarray(0, N|0);
        var str_char_code = this.memoryB.subarray(0, str_length|0);
        var i = 0,
            j = offset | 0;

        for (; (i + 7 | 0) < (str_length | 0); i = (i + 8 | 0) >>> 0, j = (j + 8 | 0) >>> 0) {
            str_char_code[i | 0] = str.charCodeAt((j | 0) >>> 0) & 0xFF;
            str_char_code[i + 1 | 0] = str.charCodeAt((j + 1 | 0) >>> 0) & 0xFF;
            str_char_code[i + 2 | 0] = str.charCodeAt((j + 2 | 0) >>> 0) & 0xFF;
            str_char_code[i + 3 | 0] = str.charCodeAt((j + 3 | 0) >>> 0) & 0xFF;
            str_char_code[i + 4 | 0] = str.charCodeAt((j + 4 | 0) >>> 0) & 0xFF;
            str_char_code[i + 5 | 0] = str.charCodeAt((j + 5 | 0) >>> 0) & 0xFF;
            str_char_code[i + 6 | 0] = str.charCodeAt((j + 6 | 0) >>> 0) & 0xFF;
            str_char_code[i + 7 | 0] = str.charCodeAt((j + 7 | 0) >>> 0) & 0xFF;
        }
        for (; (i | 0) < (str_length | 0); i = (i + 1 | 0) >>> 0, j = (j + 1 | 0) >>> 0) {
            str_char_code[(i | 0)>>>0] = str.charCodeAt((j | 0)>>>0) & 0xFF;
        }

        i = 0; j = 0;
        for (;(i+16|0) < (n|0); i = (i+16|0)>>>0, j = (j+12|0)>>>0) { // Single Operation Multiple Data (SIMD) up to 3x faster

            this.setBase64CodesBufferResultsBy4(result, (j|0)>>>0,
                this.getBase64CodesBuffer(str_char_code, (i|0)>>>0),
                this.getBase64CodesBuffer(str_char_code, (i+4|0)>>>0),
                this.getBase64CodesBuffer(str_char_code, (i+8|0)>>>0),
                this.getBase64CodesBuffer(str_char_code, (i+12|0)>>>0)
            );
        }

        for (;(i|0) < (n-1|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) { // Single Operation Single Data (normal)
            this.setBase64CodesBufferResults(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0));
        }
        switch (missingOctets|0) {
            case 2:
                this.setBase64CodesBufferResultsMO2(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
            case 1:
                this.setBase64CodesBufferResultsMO1(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
            case 0:
                this.setBase64CodesBufferResultsMO0(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
        }

        return new constructor(result.buffer, 0, N / constructor.BYTES_PER_ELEMENT | 0);
    }
}

var SuperJSONatural = function SuperJSONatural(chunck_size) {

    if (!(this instanceof SuperJSONatural)) {
        return new SuperJSONatural();
    }

    this.chunck_size_ = (chunck_size | 0) || 4096;
    this.packed_head_ = new Uint8Array(this.chunck_size_);
    this.packed_body_ = new Uint8Array(this.chunck_size_);
    this.tails_ = [];
    this.packed_body_offset_ = 0;


    this.textEncoder_ = new TextEncoder();
    this.textDecoder_ = new TextDecoder();

    this.BASE64_ = new Base64();
    this.TYPES_ = [
        {
            id: 0,
            name: "undefined",
            "typeof": "undefined",
            "instanceof": undefined
        }, {
            id: 1,
            name: "null",
            "typeof": "object",
            "instanceof": undefined
        }, {
            name: "NaN",
            id: 2,
            "typeof": "number",
            "instanceof": Object
        }, {
            name: "Infinity",
            id: 3,
            "typeof": "number",
            "instanceof": undefined
        }, {
            name: "Boolean",
            id: 4,
            "typeof": "boolean",
            "instanceof": undefined
        }, {
            name: "Int32",
            id: 5,
            "typeof": "number",
            "instanceof": undefined
        }, {
            name: "Uint32",
            id: 6,
            "typeof": "number",
            "instanceof": undefined
        }, {
            name: "Float32",
            id: 7,
            "typeof": "number",
            "instanceof": undefined
        }, {
            name: "BigInt64",
            id: 8,
            "typeof": "number",
            "instanceof": undefined
        }, {
            name: "Float64",
            id: 9,
            "typeof": "number",
            "instanceof": undefined
        },
        {
            name: "String",
            id: 10,
            "typeof": "string",
            "instanceof": ""
        }, {
            name: "ArrayBuffer",
            id: 11,
            "typeof": "object",
            "instanceof": ArrayBuffer
        }, {
            name: "Int8Array",
            id: 12,
            "typeof": "object",
            "instanceof": Int8Array
        }, {
            name: "Uint8Array",
            id: 13,
            "typeof": "object",
            "instanceof": Uint8Array
        }, {
            name: "Uint8ClampedArray",
            id: 14,
            "typeof": "object",
            "instanceof": Uint8ClampedArray
        }, {
            name: "Int16Array",
            id: 15,
            "typeof": "object",
            "instanceof": Int16Array
        }, {
            name: "Uint16Array",
            id: 16,
            "typeof": "object",
            "instanceof": Uint16Array
        }, {
            name: "Int32Array",
            id: 17,
            "typeof": "object",
            "instanceof": Int32Array
        }, {
            name: "Uint32Array",
            id: 18,
            "typeof": "object",
            "instanceof": Uint32Array
        }, {
            name: "Float32Array",
            id: 19,
            "typeof": "object",
            "instanceof": Float32Array
        }, {
            name: "Float64Array",
            id: 20,
            "typeof": "object",
            "instanceof": Float64Array
        }, {
            name: "BigInt64Array",
            id: 21,
            "typeof": "object",
            "instanceof": BigInt64Array
        }, {
            name: "BigUint64Array",
            id: 22,
            "typeof": "object",
            "instanceof": BigUint64Array
        }, {
            name: "Array",
            id: 23,
            "typeof": "object",
            "instanceof": Array
        }, {
            name: "Object",
            id: 24,
            "typeof": "object",
            "instanceof": ""
        }];
};

Object.defineProperty(SuperJSONatural.prototype, 'chunck_size', {
    get: function get() {
        "use strict";
        return this.chunck_size_;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'packed_head', {
    get: function get() {
        "use strict";
        return this.packed_head_;
    },
    set: function set(x) {
        "use strict";
        this.packed_head_ = x;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'packed_body', {
    get: function get() {
        "use strict";
        return this.packed_body_;
    },
    set: function set(x) {
        "use strict";
        this.packed_body_ = x;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'push_tail', {
    get: function get() {
        return function (tail){
            "use strict";
            this.tails_.push(tail);
        };
    },
});

Object.defineProperty(SuperJSONatural.prototype, 'get_tails_length', {
    get: function get() {
        return function (){
            "use strict";
            return this.tails_.length|0;
        };
    },
});

Object.defineProperty(SuperJSONatural.prototype, 'get_tail_at', {
    get: function get() {
        return function (at){
            "use strict";
            return this.tails_[at|0];
        };
    },
});

Object.defineProperty(SuperJSONatural.prototype, 'reset_tails', {
    get: function get() {
        return function () {
            "use strict";
            return this.tails_ = [];
        };
    },
});

Object.defineProperty(SuperJSONatural.prototype, 'packed_body_offset', {
    get: function get() {
        "use strict";
        return this.packed_body_offset_ | 0;
    },
    set: function set(x) {
        "use strict";
        this.packed_body_offset_ = x | 0;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'BASE64', {
    get: function get() {
        "use strict";
        return this.BASE64_;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'textEncoder', {
    get: function get() {
        "use strict";
        return this.textEncoder_;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'textDecoder', {
    get: function get() {
        "use strict";
        return this.textDecoder_;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'get_type', {
    get: function get() {
        "use strict";

        return function (data) {
            "use strict";
            var TYPES = this.TYPES_;
            switch (typeof data) {
                case "object":
                    if (data == null) {
                        switch (typeof data) {
                            case TYPES[0].typeof:
                                return TYPES[0];
                            default:
                                return TYPES[1];
                        }
                    } else if (data instanceof ArrayBuffer) {
                        return TYPES[11];
                    } else if ("buffer" in data) {
                        if (data.buffer instanceof ArrayBuffer) {
                            // Data is a typed array
                            for (var i = 12; (i | 0) <= 22; i = (i + 1 | 0) >>> 0) {
                                if (data instanceof TYPES[(i | 0) >>> 0]["instanceof"]) {
                                    return TYPES[(i | 0) >>> 0];
                                }
                            }

                            // Data is an object with a property named buffer which IS an array buffer
                            // yet data isn't an instance of a typed array
                            return TYPES[24];
                        } else {
                            // Data is an object with a property named buffer which is NOT an array buffer
                            // yet obviously data isn't an instance of a typed array, therefor, it is a basic object
                            return TYPES[24];
                        }
                    } else {
                        if (data instanceof Array) {
                            // Data is an Object and of Array's instance type
                            return TYPES[23];
                        } else {
                            // Data isn't an Array yet still an object
                            return TYPES[24];
                        }
                    }
                case "number":
                    if (data == Infinity) {
                        return TYPES[3];
                    } else if (data == NaN) {
                        return TYPES[2];
                    } else if (data !== (data | 0)) {
                        // Float

                        return TYPES[7]; // 32 bits yes but TYPES[9] is 64bits
                    } else {
                        data = data | 0;
                        if (data < 0) {
                            if (data < - 2147483648) {
                                return TYPES[8]; // BigInt
                            } else {
                                return TYPES[5]; // Int32
                            }
                        } else {
                            if (data <= 4294967295) {
                                return TYPES[6]; // Uint32
                            } else {
                                return TYPES[8]; // BigInt
                            }
                        }
                    }

                case "string":
                    return TYPES[10];
                case "undefined":
                    return TYPES[0];
                case "bigint":
                    return TYPES[8];
                // BigInt
                case "boolean":
                    return TYPES[4];
                default:
                    return TYPES[0];
            }
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'encodeString', {
    get: function get() {
        "use strict";
        return function(string) {
            "use strict";
            var encode = this.textEncoder.encode;
            return encode(string);
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'decodeBuffer', {
    get: function get() {
        "use strict";
        return function(buffer) {
            "use strict";
            var decode =  this.textDecoder.decode;
            return decode(buffer);
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'encode', {
    get: function get() {
        "use strict";
        return function(it) {
            "use strict";
            var toBase64 = this.BASE64.bytesToBase64;
            return toBase64(new Uint8Array(it))
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'encode_something', {
    get: function get() {
        "use strict";
        return function(something) {
            "use strict";
            var get_type = this.get_type;
            var encode_something = this.encode_something;
            var type = get_type(something);
            if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {
                // Encode Typed Array
                something = "$TA_" + type.id + "_B64$" + this.encode(something.buffer);
            } else if ((type.id | 0) == 23) {

                something.forEach(function (to_within, to_index) {
                    // to_index -> key, to_within -> value
                    var id = get_type(to_within).id;
                    if ((id | 0) >= 12 && (id | 0) <= 24) {
                        something[to_index] = encode_something(to_within);
                    }
                });
            } else if ((type.id | 0) == 24) {

                Object.entries(something).forEach(function (entry) {
                    // 0 -> key, 1 -> value
                    var id = get_type(entry[1]).id;
                    if ((id | 0) >= 12 && (id | 0) <= 24) {
                        something[entry[0]] = encode_something(entry[1]);
                    }
                });
            }
            return something;
        }
    }
});


Object.defineProperty(SuperJSONatural.prototype, 'stringify', {
    get: function get() {
        "use strict";
        return function(data) {
            "use strict";
            var encode_something = this.encode_something;
            return JSON.stringify(encode_something(data));
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'decode', {
    get: function get() {
        "use strict";
        return function(string, offset, constructor) {
            "use strict";
            var toBytes = this.BASE64.base64ToBytes;
            return toBytes(string, offset, constructor);
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'decode_something', {
    get: function get() {
        "use strict";
        return function(something) {
            "use strict";
            var TYPES = this.TYPES_;
            var get_type = this.get_type;
            var decode_something = this.decode_something;
            var decode = this.decode;
            var type = get_type(something);
            if ((type.id | 0) == 10) {
                if (something.startsWith("$TA_")) {
                    var id = parseInt(something.charAt(4) + something.charAt(5), 10);
                    something = decode(something, 11, TYPES[id]["instanceof"]);
                }

            } else if ((type.id | 0) == 23) {

                something.forEach(function (to_within, to_index) {
                    // to_index -> key, to_within -> value
                    something[to_index|0] = decode_something(to_within);
                });
            } else if ((type.id | 0) == 24) {

                Object.entries(something).forEach(function (entry) {
                    // 0 -> key, 1 -> value
                    something[entry[0]] = decode_something(entry[1]);
                });
            }

            return something;
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'parse', {
    get: function get() {
        "use strict";
        return function(tree_for_json) {
            "use strict";
            var decode_something = this.decode_something;
            return decode_something(JSON.parse(tree_for_json));
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'pack_encode', {
    get: function get() {
        "use strict";
        return function(it) {
            "use strict";
            // Append the tail to the packed body
            var tail = it instanceof Uint8Array ? it: new Uint8Array(it.buffer);
            // Add the new data to the body of data
            var from = this.packed_body_offset | 0,
                to = this.packed_body_offset + tail.length | 0;
            this.packed_body_offset = to|0;
            this.push_tail(tail);

            // Return the positions for getting a slice at unpacking
            return "F=".concat(from.toString()).concat("T=").concat(to.toString()).concat("$");
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'pack_encode_something', {
    get: function get() {
        "use strict";
        return function(something) {
            "use strict";
            var get_type = this.get_type;
            var pack_encode_something = this.pack_encode_something;
            var type = get_type(something);
            if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {

                // Encode Typed Array
                something = "$TA_".concat(type.id.toString()).concat("_PA&").concat(this.pack_encode(something));

            } else if ((type.id | 0) == 23) {

                something.forEach(function (to_within, to_index) {

                    // to_index -> key, to_within -> value
                    var id = get_type(to_within).id|0;
                    if(((id|0) == 10) || ((id <= 24) && ((id|0) >= 12))) {
                        something[to_index | 0] = pack_encode_something(to_within);
                    }
                });
            } else if ((type.id | 0) == 24) {

                Object.entries(something).forEach(function (entry) {

                    // 0 -> key, 1 -> value
                    var id = get_type(entry[1]).id|0;
                    if(((id|0) == 10) || (((id|0) <= 24) && ((id|0) >= 12))) {
                        something[entry[0]] = pack_encode_something(entry[1]);
                    }
                });
            }

            return something;
        }
    }
});

SuperJSONatural.prototype.pack = function (data) {
    "use strict";
    this.packed_body_offset = 0;
    this.reset_tails();

    var head_string = JSON.stringify(this.pack_encode_something(data));

    // This is a good estimation that will be large enough in allmost all case
    // More than that in many case it leave the space (since we reuse memory)
    // For another set of data to reuse the Uint8Array without re-allocating
    var estimated_enough_head_size = head_string.length * 2 + 5;
    var head_string_missing_part = new Uint8Array(0);
    if(this.packed_head.length < estimated_enough_head_size) {
        this.packed_head = new Uint8Array(estimated_enough_head_size);
    }

    var encode_results = this.textEncoder.encodeInto(head_string, this.packed_head);
    var encode_results_missing_part = {read: 0, written: 0};

    // If the condition is true, it will need to encode the part it had not encoded
    // Because a lack of free space
    if(head_string.length > encode_results.read) {
        head_string_missing_part = new Uint8Array((head_string.length - encode_results.read) * 3);
        encode_results_missing_part = this.textEncoder.encodeInto(head_string.slice(encode_results.read, head_string.length), head_string_missing_part);
    }

    // Compute the JSON part
    var json_part, json_part_second = new Uint8Array(0), json_part_length = 0;
    if(encode_results_missing_part.written === 0) {
        json_part = this.packed_head.subarray(0, encode_results.written);
        json_part_length = json_part.length;
    }else {
        json_part = this.packed_head.subarray(0, encode_results.written);
        json_part_second = head_string_missing_part.subarray(0, encode_results_missing_part.written);
        json_part_length = json_part.length+json_part_second.length;
    }

    var packed_body_length = 4 + json_part_length + this.packed_body_offset;
    if(this.packed_body.length < packed_body_length) {
        this.packed_body = new Uint8Array(packed_body_length);
    }


    this.packed_body[0] = json_part_length >> 0 & 0xff;
    this.packed_body[1] = json_part_length >> 8 & 0xff;
    this.packed_body[2] = json_part_length >> 16 & 0xff;
    this.packed_body[3] = json_part_length >> 24 & 0xff;

        // Add head and eventually the missing part
    this.packed_body.set(json_part, 4);
    if(json_part_second.length > 0){ this.packed_body.set(json_part_second, json_part.length+4) }

    // Add body
    var offset = 4+json_part_length|0;
    for(var i = 0; (i|0) < (this.get_tails_length()|0); i=i+1|0) {
        this.packed_body.set(this.get_tail_at(i|0), offset|0);
        offset = offset + this.get_tail_at(i|0).length;
    }

    return this.packed_body.slice(0, packed_body_length);
};


Object.defineProperty(SuperJSONatural.prototype, 'unpack_decode', {
    get: function get() {
        "use strict";
        return function(buffer, full_json_part_length, from_index, to_index, constructor) {
            "use strict";
            return new constructor(buffer.slice(full_json_part_length + from_index, full_json_part_length + to_index).buffer);
        }
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'unpack_decode_something', {
    get: function get() {
        "use strict";

        return function(something, buffer, full_json_part_length) {
            "use strict";
            var types = this.TYPES_;
            var get_type = this.get_type;
            var unpack_decode_something = this.unpack_decode_something;
            var unpack_decode = this.unpack_decode;
            switch (get_type(something).id|0){
                case 10:
                    if (something.startsWith("$TA_")) {
                        var id = parseInt(something.charAt(4) + something.charAt(5));
                        something = something.slice(12, something.length - 1); // $TA_XX_PA&F= --> "XXXT=XXXX" <-- $
                        var from_to = something.split("T=");
                        var from_index = parseInt(from_to[0]);
                        var to_index = parseInt(from_to[1]);
                        something = unpack_decode(buffer, full_json_part_length, from_index, to_index, types[id]["instanceof"]);
                    }
                    break;
                case 23:
                    something.forEach(function (to_within, to_index) {

                        // to_index -> key, to_within -> value
                        var id = get_type(to_within).id|0;
                        if((id|0) == 10 || (id|0) == 23 || (id|0) == 24) {
                            something[to_index|0] = unpack_decode_something(to_within, buffer, full_json_part_length);
                        }
                    });
                    break;
                case 24:
                    Object.entries(something).forEach(function (entry) {

                        // 0 -> key, 1 -> value
                        var id = get_type(entry[1]).id|0;
                        if((id|0) == 10 || (id|0) == 23 || (id|0) == 24) {
                            something[entry[0]] = unpack_decode_something(entry[1], buffer, full_json_part_length);
                        }
                    });
            }

            return something;
        }
    }
});

SuperJSONatural.prototype.unpack = function (buffer) {
    "use strict";
    var json_part_length = 0 | buffer[0] << 0 | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24;
    var full_json_part_length = json_part_length + 4 | 0;
    var obj = JSON.parse(this.decodeBuffer(buffer.subarray(4, full_json_part_length)));

    return this.unpack_decode_something(obj, buffer, full_json_part_length);
};

if (typeof module != "undefined") {
    module.exports = SuperJSONatural;
} else {
    window.SuperJSONatural = SuperJSONatural;
}
