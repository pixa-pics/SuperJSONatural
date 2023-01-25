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
SuperJSONatural.TYPES = [{
  id: 0,
  name: "undefined",
  fixed: true,
  bytes: 0,
  header: 0,
  "typeof": "undefined",
  "instanceof": undefined
}, {
  id: 1,
  name: "null",
  fixed: true,
  bytes: 0,
  header: 0,
  "typeof": "object",
  "instanceof": undefined
}, {
  name: "NaN",
  id: 2,
  fixed: true,
  bytes: 0,
  header: 0,
  "typeof": "number",
  "instanceof": Object
}, {
  name: "Infinity",
  id: 3,
  fixed: true,
  bytes: 0,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "Boolean",
  id: 4,
  fixed: true,
  bytes: 1,
  header: 0,
  "typeof": "boolean",
  "instanceof": undefined
}, {
  name: "Int32",
  id: 5,
  fixed: true,
  bytes: 4,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "Uint32",
  id: 6,
  fixed: true,
  bytes: 4,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "Float32",
  id: 7,
  fixed: true,
  bytes: 4,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "BigInt64",
  id: 8,
  fixed: true,
  bytes: 8,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "Float64",
  id: 9,
  fixed: true,
  bytes: 4,
  header: 0,
  "typeof": "number",
  "instanceof": undefined
}, {
  name: "String",
  id: 10,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "string",
  "instanceof": ""
}, {
  name: "ArrayBuffer",
  id: 11,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": ArrayBuffer
}, {
  name: "Int8Array",
  id: 12,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Int8Array
}, {
  name: "Uint8Array",
  id: 13,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Uint8Array
}, {
  name: "Uint8ClampedArray",
  id: 14,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Uint8ClampedArray
}, {
  name: "Int16Array",
  id: 15,
  fixed: false,
  lbytes: 2,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Int16Array
}, {
  name: "Uint16Array",
  id: 16,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Uint16Array
}, {
  name: "Int32Array",
  id: 17,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Int32Array
}, {
  name: "Uint32Array",
  id: 18,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Uint32Array
}, {
  name: "Float32Array",
  id: 19,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Float32Array
}, {
  name: "Float64Array",
  id: 20,
  fixed: false,
  lbytes: 2,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Float64Array
}, {
  name: "BigInt64Array",
  id: 21,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": BigInt64Array
}, {
  name: "BigUint64Array",
  id: 22,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": BigUint64Array
}, {
  name: "Array",
  id: 23,
  fixed: false,
  bytes: 0,
  header: 2,
  "typeof": "object",
  "instanceof": Array
}, {
  name: "Object",
  id: 24,
  fixed: false,
  bytes: 0,
  header: 2,
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
          for (var i = 12; i <= 22; i++) {
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
SuperJSONatural.prototype.stringify = function (data) {
  var tree_for_json = null;
  function encode_something(to, something, get_type, to_string) {
    var type = get_type(something);
    if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {
      // Encode Typed Array
      to = "$TA_" + type.id + "_B64$" + to_string(something.buffer);
    } else if ((type.id | 0) == 23) {
      to = Array.from(something);
      something.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        var id = get_type(to_within).id;
        if ((id | 0) >= 12 && (id | 0) <= 24) {
          to[to_index] = encode_something(null, to_within, get_type, to_string);
        }
      });
    } else if ((type.id | 0) == 24) {
      to = Object.assign({}, something);
      Object.entries(something).forEach(function (entry) {
        // 0 -> key, 1 -> value
        var id = get_type(entry[1]).id;
        if ((id | 0) >= 12 && (id | 0) <= 24) {
          to[entry[0]] = encode_something(null, entry[1], get_type, to_string);
        }
      });
    } else {
      to = something;
    }
    return to;
  }
  var bytesToBase64 = this.bytesToBase64;
  function encode(it) {
    return bytesToBase64(new Uint8Array(it));
  }
  var getTypeFromData = this.getTypeFromData;
  function get_type(something) {
    return getTypeFromData(something);
  }
  tree_for_json = encode_something(tree_for_json, data, get_type, encode);
  return JSON.stringify(tree_for_json);
};
SuperJSONatural.prototype.parse = function (tree_for_json) {
  var data = null;
  function decode_something(to, something, types, get_type, from_string) {
    var type = get_type(something);
    if ((type.id | 0) == 10) {
      if (something.startsWith("$TA_")) {
        var id = parseInt(something.charAt(4) + something.charAt(5), 10);
        something = from_string(something, 11, types[id]["instanceof"]);
      }
      to = something;
    } else if ((type.id | 0) == 23) {
      to = [];
      something.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        to[to_index] = decode_something(null, to_within, types, get_type, from_string);
      });
    } else if ((type.id | 0) == 24) {
      to = {};
      Object.entries(something).forEach(function (entry) {
        // 0 -> key, 1 -> value
        to[entry[0]] = decode_something(null, entry[1], types, get_type, from_string);
      });
    } else {
      to = something;
    }
    return to;
  }
  var base64ToBytes = this.base64ToBytes;
  function decode(string, offset, constructor) {
    return base64ToBytes(string, offset, constructor);
  }
  var getTypeFromData = this.getTypeFromData;
  function get_type(something) {
    return getTypeFromData(something);
  }
  return decode_something(data, JSON.parse(tree_for_json), SuperJSONatural.TYPES, get_type, decode);
};
SuperJSONatural.prototype.pack = function (data) {
  var tree_for_json = null;
  function encode_something(to, something, get_type, to_string) {
    var type = get_type(something);
    if ((type.id | 0) <= 22 && (type.id | 0) >= 12) {
      // Encode Typed Array
      to = "$TA_" + type.id + "_PA&" + to_string(something.buffer);
    } else if ((type.id | 0) == 23) {
      to = [];
      something.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        to[to_index | 0] = encode_something(null, to_within, get_type, to_string);
      });
    } else if ((type.id | 0) == 24) {
      to = {};
      Object.entries(something).forEach(function (entry) {
        // 0 -> key, 1 -> value
        to[entry[0]] = encode_something(null, entry[1], get_type, to_string);
      });
    } else {
      to = something;
    }
    return to;
  }
  var bytesToBase64 = this.bytesToBase64;
  var packed_body = new Uint8Array(0);
  var packed_body_offset = 0;
  function encode(it) {
    // Append the tail to the packed body
    var tail = new Uint8Array(it);

    // Increase packed_body_size of 4096 bytes min at once
    if (packed_body.length - packed_body_offset < tail.length) {
      var increase = Math.max(2048, tail.length);
      var new_packed_body = new Uint8Array(packed_body.length + increase);
      new_packed_body.set(packed_body, 0);
      packed_body = new_packed_body;
    }
    var from = packed_body_offset,
      to = packed_body_offset + tail.length;
    packed_body.set(tail, from);
    packed_body_offset = to;

    // Return the positions for getting a slice at unpacking
    return "F=" + from + "T=" + to + "$";
  }
  var getTypeFromData = this.getTypeFromData;
  function get_type(something) {
    return getTypeFromData(something);
  }
  tree_for_json = encode_something(tree_for_json, data, get_type, encode);
  var json_part = SuperJSONatural.encodeString(JSON.stringify(tree_for_json));
  var json_part_length = json_part.length;
  var packed = new Uint8Array(2 + json_part.length + packed_body_offset);
  packed[0] = json_part_length >> 0 & 0xff;
  packed[1] = json_part_length >> 8 & 0xff;
  packed.set(json_part, 2);
  packed.set(packed_body.subarray(0, packed_body_offset), 2 + json_part.length);
  return packed;
};
SuperJSONatural.prototype.unpack = function (buffer) {
  var data = null;
  function decode_something(to, something, types, get_type, from_string) {
    var type = get_type(something);
    if ((type.id | 0) == 10) {
      if (something.startsWith("$TA_")) {
        var id = parseInt(something.charAt(4) + something.charAt(5));
        something = something.slice(12, something.length - 1); // $TA_XX_PA&F= --> "XXXT=XXXX" <-- $
        var from_to = something.split("T=");
        var from_index = parseInt(from_to[0]);
        var to_index = parseInt(from_to[1]);
        something = from_string(from_index, to_index, types[id]["instanceof"]);
      }
      to = something;
    } else if ((type.id | 0) == 23) {
      to = [];
      something.forEach(function (to_within, to_index) {
        // to_index -> key, to_within -> value
        to[to_index] = decode_something(null, to_within, types, get_type, from_string);
      });
    } else if ((type.id | 0) == 24) {
      to = {};
      Object.entries(something).forEach(function (entry) {
        // 0 -> key, 1 -> value
        to[entry[0]] = decode_something(null, entry[1], types, get_type, from_string);
      });
    } else {
      to = something;
    }
    return to;
  }
  var json_part_length = 0 | buffer[0] << 0 | buffer[1] << 8;
  var full_json_part_length = json_part_length + 2 | 0;
  var json_part = buffer.subarray(2, full_json_part_length);
  var obj = JSON.parse(SuperJSONatural.decodeBuffer(json_part));
  var base64ToBytes = this.base64ToBytes;
  function decode(from_index, to_index, constructor) {
    return new constructor(buffer.slice(full_json_part_length + from_index, full_json_part_length + to_index).buffer);
  }
  var getTypeFromData = this.getTypeFromData;
  function get_type(something) {
    return getTypeFromData(something);
  }
  return decode_something(data, obj, SuperJSONatural.TYPES, get_type, decode);
};
if (typeof module != "undefined") {
  module.exports = SuperJSONatural;
} else {
  window.SuperJSONatural = SuperJSONatural;
}
