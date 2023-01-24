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

var SuperJSONatural = function SuperJSONatural() {
  if (!(this instanceof SuperJSONatural)) {
    return new SuperJSONatural();
  }
};

/*
MIT License
Copyright (c) 2020 Egor Nepomnyaschih
Copyright (c) 2022 - 2023 Affolter Matias
*/

SuperJSONatural.bytesToBase64 = function (bytes) {
  "use strict";

  const base64abcCC = Uint8ClampedArray.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
  let i = 2,
    j = 0;
  let l = bytes.length | 0;
  let k = l % 3;
  let n = Math.floor(l / 3) * 4 + (k && k + 1);
  let N = Math.ceil(l / 3) * 4;
  let result = new Uint8ClampedArray(N);
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
  let s = "";
  for (i = 0; i < result.length; i = (i + 1024 | 0) >>> 0) {
    s = s.concat(String.fromCharCode.apply(null, result.subarray(i, Math.min(i + 1024 | 0, result.length))));
  }
  return s;
};
SuperJSONatural.base64ToBytes = function (str) {
  const base64error_code = 255;
  const base64codes = Uint8ClampedArray.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
  const base64codes_length = base64codes.length | 0;
  function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
  }
  function getBase64CodesBufferResults(buffer) {
    return Uint8ClampedArray.of(buffer >> 16, buffer >> 8 & 0xFF, buffer & 0xFF);
  }
  function getBase64CodesBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4) {
    return Uint8ClampedArray.of(buffer_1 >> 16, buffer_1 >> 8 & 0xFF, buffer_1 & 0xFF, buffer_2 >> 16, buffer_2 >> 8 & 0xFF, buffer_2 & 0xFF, buffer_3 >> 16, buffer_3 >> 8 & 0xFF, buffer_3 & 0xFF, buffer_4 >> 16, buffer_4 >> 8 & 0xFF, buffer_4 & 0xFF);
  }
  function getBase64Code(char_code) {
    char_code = (char_code | 0) >>> 0;
    if ((char_code | 0) >>> 0 >= (base64codes_length | 0) >>> 0) {
      throw new Error("Unable to parse base64 string.");
    }
    const code = (base64codes[char_code] | 0) >>> 0;
    if ((code | 0) >>> 0 == (base64error_code | 0) >>> 0) {
      throw new Error("Unable to parse base64 string.");
    }
    return code;
  }
  function getBase64CodesBuffer(str_char_codes) {
    return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
  }
  if ((str.length % 4 | 0) > 0) {
    throw new Error("Unable to parse base64 string.");
  }
  const index = str.indexOf("=") | 0;
  if ((index | 0) > -1 && (index | 0) < (str.length - 2 | 0)) {
    throw new Error("Unable to parse base64 string.");
  }
  let str_char_code = Uint8ClampedArray.from(str.split("").map(function (s) {
    return charCodeAt(s);
  }));
  let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
    n = str.length | 0,
    result = new Uint8ClampedArray(3 * (n / 4));
  let str_char_code_splitted = new Uint8ClampedArray(16);
  let i = 0,
    j = 0;
  for (; (i + 16 | 0) < (n | 0); i = (i + 16 | 0) >>> 0, j = (j + 12 | 0) >>> 0) {
    // Single Operation Multiple Data (SIMD) up to 3x faster

    str_char_code_splitted.set(str_char_code.subarray(i, i + 16 | 0));
    result.set(getBase64CodesBufferResultsBy4(getBase64CodesBuffer(str_char_code_splitted.subarray(0, 4)), getBase64CodesBuffer(str_char_code_splitted.subarray(4, 8)), getBase64CodesBuffer(str_char_code_splitted.subarray(8, 12)), getBase64CodesBuffer(str_char_code_splitted.subarray(12, 16))), j);
  }
  for (; (i | 0) < (n | 0); i = (i + 4 | 0) >>> 0, j = (j + 3 | 0) >>> 0) {
    // Single Operation Single Data (normal)
    result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i, i + 4 | 0))), j);
  }
  return result.slice(0, result.length - missingOctets | 0);
};
SuperJSONatural.TYPES = [{
  id: 0,
  name: "undefined",
  fixed: true,
  bytes: 0,
  header: 0,
  typeof: "undefined",
  instanceof: undefined
}, {
  id: 1,
  name: "null",
  fixed: true,
  bytes: 0,
  header: 0,
  typeof: "object",
  instanceof: undefined
}, {
  name: "NaN",
  id: 2,
  fixed: true,
  bytes: 0,
  header: 0,
  typeof: "number",
  instanceof: Object
}, {
  name: "Infinity",
  id: 3,
  fixed: true,
  bytes: 0,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "Boolean",
  id: 4,
  fixed: true,
  bytes: 1,
  header: 0,
  typeof: "boolean",
  instanceof: undefined
}, {
  name: "Int32",
  id: 5,
  fixed: true,
  bytes: 4,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "Uint32",
  id: 6,
  fixed: true,
  bytes: 4,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "Float32",
  id: 7,
  fixed: true,
  bytes: 4,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "BigInt64",
  id: 8,
  fixed: true,
  bytes: 8,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "Float64",
  id: 9,
  fixed: true,
  bytes: 4,
  header: 0,
  typeof: "number",
  instanceof: undefined
}, {
  name: "String",
  id: 10,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "string",
  instanceof: ""
}, {
  name: "ArrayBuffer",
  id: 11,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: ArrayBuffer
}, {
  name: "Int8Array",
  id: 12,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Int8Array
}, {
  name: "Uint8Array",
  id: 13,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Uint8Array
}, {
  name: "Uint8ClampedArray",
  id: 14,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Uint8ClampedArray
}, {
  name: "Int16Array",
  id: 15,
  fixed: false,
  lbytes: 2,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Int16Array
}, {
  name: "Uint16Array",
  id: 16,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Uint16Array
}, {
  name: "Int32Array",
  id: 17,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Int32Array
}, {
  name: "Uint32Array",
  id: 18,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Uint32Array
}, {
  name: "Float32Array",
  id: 19,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Float32Array
}, {
  name: "Float64Array",
  id: 20,
  fixed: false,
  lbytes: 2,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Float64Array
}, {
  name: "BigInt64Array",
  id: 21,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: BigInt64Array
}, {
  name: "BigUint64Array",
  id: 22,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: BigUint64Array
}, {
  name: "Array",
  id: 23,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: Array
}, {
  name: "Object",
  id: 24,
  fixed: false,
  bytes: 0,
  header: 2,
  typeof: "object",
  instanceof: ""
}];
SuperJSONatural.getTypeFromData = function (data) {
  switch (typeof data) {
    case "object":
      if (data == null) {
        return SuperJSONatural.TYPES[1];
      } else if (data instanceof ArrayBuffer) {
        return SuperJSONatural.TYPES[11];
      } else if ("buffer" in data) {
        if (data.buffer instanceof ArrayBuffer) {
          // Data is a typed array
          for (var i = 12; i <= 22; i++) {
            if (data instanceof SuperJSONatural.TYPES[i].instanceof) {
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
          if (data < -2147483648) {
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
SuperJSONatural.prototype.encode = function (data) {
  var tree_for_json = null;
  function encode_something(to, something, get_type, to_string) {
    var type = get_type(something);
    if (type.id <= 22 && type.id >= 12) {
      // Encode Typed Array
      to = "$TA_" + type.id + "_B64$" + to_string(something.buffer);
    } else if (type.id === 23) {
      to = Array.from(something);
      to.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        to[to_index] = encode_something(null, to_within, get_type, to_string);
      });
    } else if (type.id === 24) {
      to = Object.assign({}, something);
      Object.entries(to).forEach(function (entry) {
        // 0 -> key, 1 -> value
        to[entry[0]] = encode_something(null, entry[1], get_type, to_string);
      });
    } else {
      to = something;
    }
    return to;
  }
  function encode(it) {
    return SuperJSONatural.bytesToBase64(new Uint8Array(it));
  }
  tree_for_json = encode_something(tree_for_json, data, SuperJSONatural.getTypeFromData, encode);
  return JSON.stringify(tree_for_json);
};
SuperJSONatural.prototype.decode = function (tree_for_json) {
  var data = null;
  function decode_something(to, something, types, get_type, from_string) {
    var type = get_type(something);
    if (type.id === 10) {
      if (something.startsWith("$TA_")) {
        var id = parseInt(something.charAt(4) + something.charAt(5), 10);
        something = something.replace("$TA_" + id + "_B64$", "");
        something = new types[id].instanceof(from_string(something));
      }
      to = something;
    } else if (type.id === 23) {
      to = Array.from(something);
      to.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        to[to_index] = decode_something(null, to_within, types, get_type, from_string);
      });
    } else if (type.id === 24) {
      to = Object.assign({}, something);
      Object.entries(to).forEach(function (entry) {
        // 0 -> key, 1 -> value
        to[entry[0]] = decode_something(null, entry[1], types, get_type, from_string);
      });
    } else {
      to = something;
    }
    return to;
  }
  function decode(it) {
    return SuperJSONatural.base64ToBytes(it).buffer;
  }
  return decode_something(data, JSON.parse(tree_for_json), SuperJSONatural.TYPES, SuperJSONatural.getTypeFromData, decode);
};
if (module) {
  module.exports = SuperJSONatural;
} else {
  window.SuperJSONatural = SuperJSONatural;
}
