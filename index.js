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

var SuperJSONatural = function SuperJSONatural(chunck_size) {

    if (!(this instanceof SuperJSONatural)) {
        return new SuperJSONatural();
    }

    this.chunck_size_ = (chunck_size | 0) || 4096;
    this.packed_head_ = new Uint8Array(this.chunck_size_);
    this.packed_body_ = new Uint8Array(this.chunck_size_);
};

Object.defineProperty(SuperJSONatural.prototype, 'chunck_size', {
    get: function get() {
        return this.chunck_size_;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'packed_head', {
    get: function get() {
        return this.packed_head_;
    },
    set: function set(x) {
        this.packed_head_ = x;
    }
});

Object.defineProperty(SuperJSONatural.prototype, 'packed_body', {
    get: function get() {
        return this.packed_body_;
    },
    set: function set(x) {
        this.packed_body_ = x;
    }
});

var base64abcCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
SuperJSONatural.prototype.bytesToBase64 = function (bytes) {
    "use strict";

    var i = 2,
        j = 0;
    var l = bytes.length | 0;
    var k = l % 3;
    var n = Math.floor(l / 3) * 4 + (k && k + 1);
    var N = Math.ceil(l / 3) * 4;
    var result = new Uint8Array(N);
    for (i = 2, j = 0; (i | 0) < (l | 0); i = (i + 3 | 0) >>> 0, j = (j + 4 | 0) >>> 0) {
        result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j + 1 | 0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4 | bytes[i - 1 | 0] >> 4] & 0xFF;
        result[j + 2 | 0] = base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2 | bytes[i] >> 6] & 0xFF;
        result[j + 3 | 0] = base64abcCC[bytes[i] & 0x3F] & 0xFF;
    }
    if ((i | 0) == (l + 1 | 0)) {
        // 1 octet yet to write
        result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j + 1 | 0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
        result[j + 2 | 0] = "=".charCodeAt(0) & 0xFF;
        result[j + 3 | 0] = "=".charCodeAt(0) & 0xFF;
        j = (j + 4 | 0) >>> 0;
    }
    if ((i | 0) == (l | 0)) {
        // 2 octets yet to write
        result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j + 1 | 0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4 | bytes[i - 1 | 0] >> 4] & 0xFF;
        result[j + 2 | 0] = base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
        result[j + 3 | 0] = "=".charCodeAt(0) & 0xFF;
        j = (j + 4 | 0) >>> 0;
    }
    var s = "";
    for (i = 0; i < result.length; i = (i + 1024 | 0) >>> 0) {
        s = s.concat(String.fromCharCode.apply(null, result.subarray(i, Math.min(i + 1024 | 0, result.length))));
    }
    return s;
};
var base64error_code = 255;
var base64codes = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
var base64codes_length = base64codes.length | 0;

function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
}

function getBase64CodesBufferResults(buffer) {
    return Uint8Array.of(buffer >> 16, buffer >> 8 & 0xFF, buffer & 0xFF);
}

function getBase64CodesBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4) {
    return Uint8Array.of(buffer_1 >> 16, buffer_1 >> 8 & 0xFF, buffer_1 & 0xFF, buffer_2 >> 16, buffer_2 >> 8 & 0xFF, buffer_2 & 0xFF, buffer_3 >> 16, buffer_3 >> 8 & 0xFF, buffer_3 & 0xFF, buffer_4 >> 16, buffer_4 >> 8 & 0xFF, buffer_4 & 0xFF);
}

function getBase64Code(char_code) {
    char_code = (char_code | 0) & 0xFF;
    return (base64codes[char_code] | 0) & 0xFF;
}

function getBase64CodesBuffer(str_char_codes) {
    return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
}

SuperJSONatural.prototype.base64ToBytes = function (str, offset, constructor) {
    offset = offset | 0;
    var str_char_code = new Uint8Array(str.length - offset | 0);
    var str_char_code_length = str_char_code.length;
    var i = 0,
        j = 0;
    for (i = 0, j = offset; (i + 7 | 0) < (str_char_code_length | 0); i = (i + 8 | 0) >>> 0, j = (j + 8 | 0) >>> 0) {
        str_char_code[i | 0] = str.charCodeAt(j | 0) & 0xFF;
        str_char_code[i + 1 | 0] = str.charCodeAt(j + 1 | 0) & 0xFF;
        str_char_code[i + 2 | 0] = str.charCodeAt(j + 2 | 0) & 0xFF;
        str_char_code[i + 3 | 0] = str.charCodeAt(j + 3 | 0) & 0xFF;
        str_char_code[i + 4 | 0] = str.charCodeAt(j + 4 | 0) & 0xFF;
        str_char_code[i + 5 | 0] = str.charCodeAt(j + 5 | 0) & 0xFF;
        str_char_code[i + 6 | 0] = str.charCodeAt(j + 6 | 0) & 0xFF;
        str_char_code[i + 7 | 0] = str.charCodeAt(j + 7 | 0) & 0xFF;
    }
    for (; (i | 0) < (str_char_code_length | 0); i = (i + 1 | 0) >>> 0, j = (j + 1 | 0) >>> 0) {
        str_char_code[i | 0] = str.charCodeAt(j | 0) & 0xFF;
    }
    var missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
        n = str.length - offset | 0,
        result = new Uint8Array(3 * (n / 4));
    var str_char_code_splitted = new Uint8Array(16);
    i = 0, j = 0;
    for (; (i + 16 | 0) < (n | 0); i = (i + 16 | 0) >>> 0, j = (j + 12 | 0) >>> 0) {
        // Single Operation Multiple Data (SIMD) up to 3x faster

        str_char_code_splitted = str_char_code.slice(i | 0, i + 16 | 0);
        result.set(getBase64CodesBufferResultsBy4(getBase64CodesBuffer(str_char_code_splitted.subarray(0, 4)), getBase64CodesBuffer(str_char_code_splitted.subarray(4, 8)), getBase64CodesBuffer(str_char_code_splitted.subarray(8, 12)), getBase64CodesBuffer(str_char_code_splitted.subarray(12, 16))), j);
    }
    for (; (i | 0) < (n | 0); i = (i + 4 | 0) >>> 0, j = (j + 3 | 0) >>> 0) {
        // Single Operation Single Data (normal)
        result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.slice(i | 0, i + 4 | 0))), j);
    }
    return new constructor(result.buffer.slice(0, result.length - missingOctets));
};

SuperJSONatural.TYPES = [
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
SuperJSONatural.textEncoder = new TextEncoder();
SuperJSONatural.textDecoder = new TextDecoder();
SuperJSONatural.encodeString = function (string) {
    return SuperJSONatural.textEncoder.encode(string);
};
SuperJSONatural.decodeBuffer = function (buffer) {
    return SuperJSONatural.textDecoder.decode(buffer);
};
SuperJSONatural.prototype.getTypeFromData = function (data) {
    switch (typeof data) {
        case "object":
            if (data == null) {
                return SuperJSONatural.TYPES[1];
            } else if (data instanceof ArrayBuffer) {
                return SuperJSONatural.TYPES[11];
            } else if ("buffer" in data) {
                if (data.buffer instanceof ArrayBuffer) {
                    // Data is a typed array
                    for (var i = 12; i <= 22; i ++) {
                        if (data instanceof SuperJSONatural.TYPES[i]["instanceof"]) {
                            return SuperJSONatural.TYPES[i];
                        }
                    }

                    // Data is an object with a property named buffer which IS an array buffer
                    // yet data isn't an instance of a typed array
                    return SuperJSONatural.TYPES[24];
                } else {
                    // Data is an object with a property named buffer which is NOT an array buffer
                    // yet obviously data isn't an instance of a typed array, therefor, it is a basic object
                    return SuperJSONatural.TYPES[24];
                }
            } else {
                if (data instanceof Array) {
                    // Data is an Object and of Array's instance type
                    return SuperJSONatural.TYPES[23];
                } else {
                    // Data isn't an Array yet still an object
                    return SuperJSONatural.TYPES[24];
                }
            }
        case "number":
            if (data == Infinity) {
                return SuperJSONatural.TYPES[3];
            } else if (data == NaN) {
                return SuperJSONatural.TYPES[2];
            } else if (data !== (data | 0)) {
                // Float

                return SuperJSONatural.TYPES[7]; // 32 bits yes but SuperJSONatural.TYPES[9] is 64bits
            } else {
                data = data | 0;
                if (data < 0) {
                    if (data < - 2147483648) {
                        return SuperJSONatural.TYPES[8]; // BigInt
                    } else {
                        return SuperJSONatural.TYPES[5]; // Int32
                    }
                } else {
                    if (data <= 4294967295) {
                        return SuperJSONatural.TYPES[6]; // Uint32
                    } else {
                        return SuperJSONatural.TYPES[8]; // BigInt
                    }
                }
            }

        case "string":
            return SuperJSONatural.TYPES[10];
        case "undefined":
            return SuperJSONatural.TYPES[0];
        case "bigint":
            return SuperJSONatural.TYPES[8];
        // BigInt
        case "boolean":
            return SuperJSONatural.TYPES[4];
        default:
            return SuperJSONatural.TYPES[0];
    }
};
SuperJSONatural.prototype.stringify = function (data) {

    var bytesToBase64 = this.bytesToBase64;
    var getTypeFromData = this.getTypeFromData;

    function encode(it) {
        return bytesToBase64(new Uint8Array(it));
    }

    function get_type(something) {
        return getTypeFromData(something);
    }

    function encode_something(something) {
        var type = get_type(something);
        if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {
            // Encode Typed Array
            something = "$TA_" + type.id + "_B64$" + encode(something.buffer);
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

    return JSON.stringify(encode_something(data));
};
SuperJSONatural.prototype.parse = function (tree_for_json) {

    var base64ToBytes = this.base64ToBytes;
    var getTypeFromData = this.getTypeFromData;
    var types = SuperJSONatural.TYPES;

    function decode(string, offset, constructor) {
        return base64ToBytes(string, offset, constructor);
    }

    function get_type(something) {
        return getTypeFromData(something);
    }

    function decode_something(something) {

        var type = get_type(something);

        if ((type.id | 0) == 10) {
            if (something.startsWith("$TA_")) {
                var id = parseInt(something.charAt(4) + something.charAt(5), 10);
                something = decode(something, 11, types[id]["instanceof"]);
            }

        } else if ((type.id | 0) == 23) {

            something.forEach(function (to_within, to_index) {
                // to_index -> key, to_within -> value
                something[to_index] = decode_something(to_within);
            });
        } else if ((type.id | 0) == 24) {

            Object.entries(something).forEach(function (entry) {
                // 0 -> key, 1 -> value
                something[entry[0]] = decode_something(entry[1]);
            });
        }

        return something;
    }

    return decode_something(JSON.parse(tree_for_json), SuperJSONatural.TYPES, get_type, decode);
};
SuperJSONatural.prototype.pack = function (data) {

    var tree_for_json = null;
    var chunck_size = this.chunck_size;
    var packed_body_offset = 0;
    var packed_body = this.packed_body;
    var getTypeFromData = this.getTypeFromData;
    var tails = [];

    function get_type(something) {
        return getTypeFromData(something);
    }

    function encode(it) {
        // Append the tail to the packed body
        var tail = it instanceof Uint8Array ? it: new Uint8Array(it.buffer);

        // Add the new data to the body of data
        var from = packed_body_offset | 0,
            to = packed_body_offset + tail.length | 0;
        tails.push(tail);
        packed_body_offset = to|0;

        // Return the positions for getting a slice at unpacking
        return "F=" + from.toString() + "T=" + to.toString() + "$";
    }

    function encode_something(something) {

        var type = get_type(something);

        if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {

            // Encode Typed Array
            something = "$TA_" + type.id + "_PA&" + encode(something);
        } else if ((type.id | 0) == 23) {

            something.forEach(function (to_within, to_index) {

                // to_index -> key, to_within -> value
                var id = get_type(to_within).id;
                if((id == 10) || ((id <= 24) && (id => 12))) {
                    something[to_index | 0] = encode_something(to_within);
                }
            });
        } else if ((type.id | 0) == 24) {

            Object.entries(something).forEach(function (entry) {

                // 0 -> key, 1 -> value
                var id = get_type(entry[1]).id;
                if((id == 10) || ((id <= 24) && (id => 12))) {
                    something[entry[0]] = encode_something(entry[1]);
                }
            });
        }

        return something;
    }

    var head_string = JSON.stringify(encode_something(data));

    // This is a good estimation that will be large enough in allmost all case
    // More than that in many case it leave the space (since we reuse memory)
    // For another set of data to reuse the Uint8Array without re-allocating
    var estimated_enough_head_size = head_string.length * 2 + 5;
    var head_string_missing_part = new Uint8Array(0);
    if(this.packed_head.length < estimated_enough_head_size) {
        this.packed_head = new Uint8Array(estimated_enough_head_size);
    }

    var encode_results = SuperJSONatural.textEncoder.encodeInto(head_string, this.packed_head);
    var encode_results_missing_part = {read: 0, written: 0};

    // If the condition is true, it will need to encode the part it had not encoded
    // Because a lack of free space
    if(head_string.length > encode_results.read) {
        head_string_missing_part = new Uint8Array((head_string.length - encode_results.read) * 3);
        encode_results_missing_part = SuperJSONatural.textEncoder.encodeInto(head_string.slice(encode_results.read, head_string.length), head_string_missing_part);
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

    var packed_body_length = 2 + json_part_length + packed_body_offset;
    if(this.packed_body.length < packed_body_length) {
        this.packed_body = new Uint8Array(packed_body_length);
    }


    this.packed_body[0] = json_part_length >> 0 & 0xff;
    this.packed_body[1] = json_part_length >> 8 & 0xff;

        // Add head and eventually the missing part
    this.packed_body.set(json_part, 2);
    if(json_part_second.length > 0){ this.packed_body.set(json_part_second, json_part.length+2) }

    // Add body
    var offset = 2+json_part_length|0;
    for(var i = 0; (i|0) < (tails.length|0); i=i+1|0) {
        this.packed_body.set(tails[i|0], offset|0);
        offset = offset + tails[i|0].length;
    }

    return this.packed_body.slice(0, packed_body_length);
};
SuperJSONatural.prototype.unpack = function (buffer) {

    var getTypeFromData = this.getTypeFromData;
    var types = SuperJSONatural.TYPES;
    var json_part_length = 0 | buffer[0] << 0 | buffer[1] << 8;
    var full_json_part_length = json_part_length + 2 | 0;
    var obj = JSON.parse(SuperJSONatural.decodeBuffer(buffer.subarray(2, full_json_part_length)));

    function decode(from_index, to_index, constructor) {
        return new constructor(buffer.slice(full_json_part_length + from_index, full_json_part_length + to_index).buffer);
    }

    function get_type(something) {
        return getTypeFromData(something);
    }

    function decode_something(something) {

        switch (get_type(something).id){
            case 10:
                if (something.startsWith("$TA_")) {
                    var id = parseInt(something.charAt(4) + something.charAt(5));
                    something = something.slice(12, something.length - 1); // $TA_XX_PA&F= --> "XXXT=XXXX" <-- $
                    var from_to = something.split("T=");
                    var from_index = parseInt(from_to[0]);
                    var to_index = parseInt(from_to[1]);
                    something = decode(from_index, to_index, types[id]["instanceof"]);
                }
                break;
            case 23:
                something.forEach(function (to_within, to_index) {

                    // to_index -> key, to_within -> value
                    var id = get_type(to_within).id;
                    if((id|0) == 10 || (id|0) == 23 || (id|0) == 24) {
                        something[to_index|0] = decode_something(to_within);
                    }
                });
                break;
            case 24:
                Object.entries(something).forEach(function (entry) {

                    // 0 -> key, 1 -> value
                    var id = get_type(entry[1]).id;
                    if((id|0) == 10 || (id|0) == 23 || (id|0) == 24) {
                        something[entry[0]] = decode_something(entry[1]);
                    }
                });
        };

        return something;
    }

    return decode_something(obj);
};
if (typeof module != "undefined") {
    module.exports = SuperJSONatural;
} else {
    window.SuperJSONatural = SuperJSONatural;
}
