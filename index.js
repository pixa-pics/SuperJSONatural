"use strict";
/*
The MIT License (MIT)

Copyright (c) 2022 - 2023 Matias Affolter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

class SuperJSONatural {
    constructor() {

        this.b64CC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
        this.b64C = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);

        this.TPS = [
            {
                id: 0,
                "typeof": "undefined",
                "instanceof": undefined
            }, {
                id: 1,
                "typeof": "object",
                "instanceof": undefined
            }, {
                id: 2,
                "typeof": "number",
                "instanceof": Object
            }, {
                id: 3,
                "typeof": "number",
                "instanceof": undefined
            }, {
                id: 4,
                "typeof": "boolean",
                "instanceof": undefined
            }, {
                id: 5,
                "typeof": "number",
                "instanceof": undefined
            }, {
                id: 6,
                "typeof": "number",
                "instanceof": undefined
            }, {
                id: 7,
                "typeof": "number",
                "instanceof": undefined
            }, {
                id: 8,
                "typeof": "number",
                "instanceof": undefined
            }, {
                id: 9,
                "typeof": "number",
                "instanceof": undefined
            },
            {
                id: 10,
                "typeof": "string",
                "instanceof": ""
            }, {
                id: 11,
                "typeof": "object",
                "instanceof": ArrayBuffer
            }, {
                id: 12,
                "typeof": "object",
                "instanceof": Int8Array
            }, {
                id: 13,
                "typeof": "object",
                "instanceof": Uint8Array
            }, {
                id: 14,
                "typeof": "object",
                "instanceof": Uint8ClampedArray
            }, {
                id: 15,
                "typeof": "object",
                "instanceof": Int16Array
            }, {
                id: 16,
                "typeof": "object",
                "instanceof": Uint16Array
            }, {
                id: 17,
                "typeof": "object",
                "instanceof": Int32Array
            }, {
                id: 18,
                "typeof": "object",
                "instanceof": Uint32Array
            }, {
                id: 19,
                "typeof": "object",
                "instanceof": Float32Array
            }, {
                id: 20,
                "typeof": "object",
                "instanceof": Float64Array
            }, {
                id: 21,
                "typeof": "object",
                "instanceof": BigInt64Array
            }, {
                id: 22,
                "typeof": "object",
                "instanceof": BigUint64Array
            }, {
                id: 23,
                "typeof": "object",
                "instanceof": Array
            }, {
                id: 24,
                "typeof": "object",
                "instanceof": ""
            }
        ];

        this.packedHead  = new Uint8Array(0);
        this.packedBody = new Uint8Array(0);
        this.packedBodyOffset = 0;
        this.tails = [];
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder();
    }

    bytesToBase64(bytes) {
        "use strict";

        var i = 2,
            j = 0;
        var l = bytes.length | 0;
        var N = Math.ceil(l / 3) * 4;
        var result = new Uint8Array(N);
        for (i = 2, j = 0; (i | 0) < (l | 0); i = (i + 3 | 0) >>> 0, j = (j + 4 | 0) >>> 0) {
            result[j] = this.b64CC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j + 1 | 0] = this.b64CC[(bytes[i - 2 | 0] & 0x03) << 4 | bytes[i - 1 | 0] >> 4] & 0xFF;
            result[j + 2 | 0] = this.b64CC[(bytes[i - 1 | 0] & 0x0F) << 2 | bytes[i] >> 6] & 0xFF;
            result[j + 3 | 0] = this.b64CC[bytes[i] & 0x3F] & 0xFF;
        }
        if ((i | 0) == (l + 1 | 0)) {
            // 1 octet yet to write
            result[j] = this.b64CC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j + 1 | 0] = this.b64CC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
            result[j + 2 | 0] = "=".charCodeAt(0) & 0xFF;
            result[j + 3 | 0] = "=".charCodeAt(0) & 0xFF;
            j = (j + 4 | 0) >>> 0;
        }
        if ((i | 0) == (l | 0)) {
            // 2 octets yet to write
            result[j] = this.b64CC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j + 1 | 0] = this.b64CC[(bytes[i - 2 | 0] & 0x03) << 4 | bytes[i - 1 | 0] >> 4] & 0xFF;
            result[j + 2 | 0] = this.b64CC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
            result[j + 3 | 0] = "=".charCodeAt(0) & 0xFF;
            j = (j + 4 | 0) >>> 0;
        }
        var s = "";
        for (i = 0; i < result.length; i = (i + 1024 | 0) >>> 0) {
            s = s.concat(String.fromCharCode.apply(null, result.subarray(i, Math.min(i + 1024 | 0, result.length))));
        }
        return s;
    }

    charCodeAt(s) {
        "use strict";
        return s.charCodeAt(0) & 0xFF;
    }

    getb64CBufferResults(buffer) {
        "use strict";
        return Uint8Array.of(buffer >> 16, buffer >> 8 & 0xFF, buffer & 0xFF);
    }

    getb64CBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4) {
        "use strict";
        return Uint8Array.of(buffer_1 >> 16, buffer_1 >> 8 & 0xFF, buffer_1 & 0xFF, buffer_2 >> 16, buffer_2 >> 8 & 0xFF, buffer_2 & 0xFF, buffer_3 >> 16, buffer_3 >> 8 & 0xFF, buffer_3 & 0xFF, buffer_4 >> 16, buffer_4 >> 8 & 0xFF, buffer_4 & 0xFF);
    }

    getBase64Code(char_code) {
        "use strict";
        char_code = (char_code | 0) & 0xFF;
        return (this.b64C[char_code] | 0) & 0xFF;
    }

    getb64CBuffer(str_char_codes) {
        "use strict";
        return (this.getBase64Code(str_char_codes[0]) << 18 | this.getBase64Code(str_char_codes[1]) << 12 | this.getBase64Code(str_char_codes[2]) << 6 | this.getBase64Code(str_char_codes[3]) | 0) >>> 0;
    }


    base64ToBytes(str, offset, constructor) {
        "use strict";
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
            result.set(this.getb64CBufferResultsBy4(this.getb64CBuffer(str_char_code_splitted.subarray(0, 4)), this.getb64CBuffer(str_char_code_splitted.subarray(4, 8)), this.getb64CBuffer(str_char_code_splitted.subarray(8, 12)), this.getb64CBuffer(str_char_code_splitted.subarray(12, 16))), j);
        }
        for (; (i | 0) < (n | 0); i = (i + 4 | 0) >>> 0, j = (j + 3 | 0) >>> 0) {
            // Single Operation Single Data (normal)
            result.set(this.getb64CBufferResults(this.getb64CBuffer(str_char_code.slice(i | 0, i + 4 | 0))), j);
        }
        return new constructor(result.buffer.slice(0, result.length - missingOctets));
    }

    getType(data) {
        "use strict";

        switch (typeof data) {
            case "object":
                if (data == null) {
                    switch (typeof data) {
                        case this.TPS[0].typeof:
                            return this.TPS[0];
                        default:
                            return this.TPS[1];
                    }
                } else if (data instanceof ArrayBuffer) {
                    return this.TPS[11];
                } else if ("buffer" in data) {
                    if (data.buffer instanceof ArrayBuffer) {
                        // Data is a typed array
                        for (var i = 12; (i | 0) <= 22; i = (i + 1 | 0) >>> 0) {
                            if (data instanceof this.TPS[(i | 0) >>> 0]["instanceof"]) {
                                return this.TPS[(i | 0) >>> 0];
                            }
                        }

                        // Data is an object with a property named buffer which IS an array buffer
                        // yet data isn't an instance of a typed array
                        return this.TPS[24];
                    } else {
                        // Data is an object with a property named buffer which is NOT an array buffer
                        // yet obviously data isn't an instance of a typed array, therefor, it is a basic object
                        return this.TPS[24];
                    }
                } else {
                    if (data instanceof Array) {
                        // Data is an Object and of Array's instance type
                        return this.TPS[23];
                    } else {
                        // Data isn't an Array yet still an object
                        return this.TPS[24];
                    }
                }
            case "number":
                if (data == Infinity) {
                    return this.TPS[3];
                } else if (data == NaN) {
                    return this.TPS[2];
                } else if (data !== (data | 0)) {
                    // Float

                    return this.TPS[7]; // 32 bits yes but this.TPS[9] is 64bits
                } else {
                    data = data | 0;
                    if (data < 0) {
                        if (data < - 2147483648) {
                            return this.TPS[8]; // BigInt
                        } else {
                            return this.TPS[5]; // Int32
                        }
                    } else {
                        if (data <= 4294967295) {
                            return this.TPS[6]; // Uint32
                        } else {
                            return this.TPS[8]; // BigInt
                        }
                    }
                }

            case "string":
                return this.TPS[10];
            case "undefined":
                return this.TPS[0];
            case "bigint":
                return this.TPS[8];
            // BigInt
            case "boolean":
                return this.TPS[4];
            default:
                return this.TPS[0];
        }
    }

    pushTail(tail) {
        "use strict";
        this.tails.push(tail);
    }

    resetTails() {
        "use strict";
        this.tails = [];
    }

    getTailsLength() {
        "use strict";
        return this.tails.length;
    }

    getTailAt(index) {
        "use strict";
        return this.tails[index|0];
    }

    encodeString(string) {
        "use strict";
        return this.textEncoder.encode(string);
    }

    decodeBuffer(buffer) {
        "use strict";
        return this.textDecoder.decode(buffer);
    }

    encode(it) {
        "use strict";
        return this.bytesToBase64(new Uint8Array(it));
    }

    encodeSomething(something) {
        "use strict";
        const getType = this.getType.bind(this);
        const encodeSomething = this.encodeSomething.bind(this);
        const type = getType(something);

        if (type.id >= 12 && type.id <= 22) {
            // Encode Typed Array
            something = `$TA_${type.id}_B64$${this.encode(something.buffer)}`;
        } else if ((type.id|0) == 23) {
            something.forEach((to_within, to_index) => {
                const id = getType(to_within).id;
                if (id >= 12 && id <= 24) {
                    something[to_index] = encodeSomething(to_within);
                }
            });
        } else if ((type.id|0) == 24) {
            Object.entries(something).forEach((entry) => {
                const id = getType(entry[1]).id;
                if (id >= 12 && id <= 24) {
                    something[entry[0]] = encodeSomething(entry[1]);
                }
            });
        }

        return something;
    }

    stringify(data) {
        "use strict";
        return JSON.stringify(this.encodeSomething(data));
    }

    decode(string, offset, constructor) {
        "use strict";
        return this.base64ToBytes(string, offset, constructor);
    }

    decode_something(something) {
        "use strict";
        const getType = this.getType.bind(this);
        const decode_something = this.decode_something.bind(this);
        const decode = this.decode.bind(this);
        const type = getType(something);

        if ((type.id|0) == 10 && something.startsWith("$TA_")) {
            const id = parseInt(something.charAt(4) + something.charAt(5), 10);
            something = decode(something, 11, this.TPS[id]["instanceof"]);
        } else if ((type.id|0) == 23) {
            something.forEach((to_within, to_index) => {
                something[to_index] = decode_something(to_within);
            });
        } else if ((type.id|0) == 24) {
            Object.entries(something).forEach((entry) => {
                something[entry[0]] = decode_something(entry[1]);
            });
        }

        return something;
    }

    parse(tree_for_json) {
        "use strict";
        return this.decode_something(JSON.parse(tree_for_json));
    }

    packEncode(it) {
        "use strict";
        // Append the tail to the packed body
        var tail = it instanceof Uint8Array ? it: new Uint8Array(it.buffer);
        // Add the new data to the body of data
        var from = this.packedBodyOffset | 0,
            to = this.packedBodyOffset + tail.length | 0;
        this.packedBodyOffset = to|0;
        this.pushTail(tail);

        // Return the positions for getting a slice at unpacking
        return "F=".concat(from.toString()).concat("T=").concat(to.toString()).concat("$");
    }

    packEncodeSomething(something) {
        "use strict";
        const getType = this.getType.bind(this);
        const packEncode = this.packEncode.bind(this);
        const packEncodeSomething = this.packEncodeSomething.bind(this);
        const type = getType(something);

        if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {

            // Encode Typed Array
            something = "$TA_".concat(type.id.toString()).concat("_PA&").concat(packEncode(something));

        } else if ((type.id | 0) == 23) {

            something.forEach(function (to_within, to_index) {

                // to_index -> key, to_within -> value
                const id = getType(to_within).id|0;
                if(((id|0) == 10) || ((id <= 24) && ((id|0) >= 12))) {
                    something[to_index | 0] = packEncodeSomething(to_within);
                }
            });
        } else if ((type.id | 0) == 24) {

            Object.entries(something).forEach(function (entry) {

                // 0 -> key, 1 -> value
                const id = getType(entry[1]).id|0;
                if(((id|0) == 10) || (((id|0) <= 24) && ((id|0) >= 12))) {
                    something[entry[0]] = packEncodeSomething(entry[1]);
                }
            });
        }

        return something;
    }

    pack(data) {
        "use strict";
        this.packedBodyOffset = 0;
        this.resetTails();

        const headString = JSON.stringify(this.packEncodeSomething(data));
        const estimatedEnoughHeadSize = headString.length * 2 + 5;
        let headStringMissingPart = new Uint8Array(0);

        if (this.packedHead.length < estimatedEnoughHeadSize) {
            this.packedHead = new Uint8Array(estimatedEnoughHeadSize);
        }

        const encodeResults = this.textEncoder.encodeInto(headString, this.packedHead);
        let encodeResultsMissingPart = { read: 0, written: 0 };

        if (headString.length > encodeResults.read) {
            headStringMissingPart = new Uint8Array((headString.length - encodeResults.read) * 3);
            encodeResultsMissingPart = this.textEncoder.encodeInto(
                headString.slice(encodeResults.read, headString.length),
                headStringMissingPart
            );
        }

        const jsonPartLength =
            (encodeResultsMissingPart.written|0) == 0
                ? encodeResults.written
                : encodeResults.written + headStringMissingPart.subarray(0, encodeResultsMissingPart.written).length;

        const packedBodyLength = 4 + jsonPartLength + this.packedBodyOffset;

        if (this.packedBody.length < packedBodyLength) {
            this.packedBody = new Uint8Array(packedBodyLength);
        }

        const jsonPart = this.packedHead.subarray(0, encodeResults.written);
        const jsonPartSecond = headStringMissingPart.subarray(0, encodeResultsMissingPart.written);

        this.packedBody.set(jsonPart, 4);

        if (jsonPartSecond.length > 0) {
            this.packedBody.set(jsonPartSecond, jsonPart.length + 4);
        }

        this.packedBody[0] = jsonPartLength & 0xff;
        this.packedBody[1] = (jsonPartLength >> 8) & 0xff;
        this.packedBody[2] = (jsonPartLength >> 16) & 0xff;
        this.packedBody[3] = (jsonPartLength >> 24) & 0xff;

        let offset = 4 + jsonPartLength;
        for (let i = 0; (i|0) < (this.getTailsLength()|0); i=(i+1|0)>>>0) {
            this.packedBody.set(this.getTailAt(i|0), offset|0);
            offset = offset + this.getTailAt(i|0).length|0;
        }

        return this.packedBody.slice(0, packedBodyLength|0);
    }

    unpack(buffer) {
        "use strict";
        const jsonPartLength = buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24);
        const fullJsonPartLength = jsonPartLength + 4;
        const obj = JSON.parse(this.decodeBuffer(buffer.subarray(4, fullJsonPartLength)));

        return this.unpackDecodeSomething(obj, buffer, fullJsonPartLength);
    }

    unpackDecode(buffer, fullJsonPartLength, fromIndex, toIndex, constructor) {
        "use strict";
        return new constructor(buffer.slice(fullJsonPartLength + fromIndex|0, fullJsonPartLength + toIndex|0).buffer);
    }

    unpackDecodeSomething(something, buffer, fullJsonPartLength) {
        "use strict";
        const getType = this.getType.bind(this);
        const unpackDecodeSomething = this.unpackDecodeSomething.bind(this);
        const unpackDecode = this.unpackDecode.bind(this);
        switch (getType(something).id) {
            case 10:
                if (something.startsWith("$TA_")) {
                    const id = parseInt(something.charAt(4) + something.charAt(5));
                    something = something.slice(12, something.length - 1);
                    const [fromIndex, toIndex] = something.split("T=").map(Number);
                    something = unpackDecode(buffer, fullJsonPartLength, fromIndex, toIndex, this.TPS[id]["instanceof"]);
                }
                break;
            case 23:
                something.forEach((to_within, to_index) => {
                    const id = getType(to_within).id;
                    if ([10, 23, 24].includes(id)) {
                        something[to_index] = unpackDecodeSomething(to_within, buffer, fullJsonPartLength);
                    }
                });
                break;
            case 24:
                Object.entries(something).forEach(([key, value]) => {
                    const id = getType(value).id;
                    if ([10, 23, 24].includes(id)) {
                        something[key] = unpackDecodeSomething(value, buffer, fullJsonPartLength);
                    }
                });
        }

        return something;
    }
}

if (typeof module !== "undefined") {
    module.exports = SuperJSONatural;
} else {
    window.SuperJSONatural = SuperJSONatural;
}