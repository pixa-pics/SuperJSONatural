# SuperJSONatural - 10kB
## Truly one of the world faster serializer/parser on the web

![SuperJSONatural branding logo](https://raw.githubusercontent.com/pixa-pics/SuperJSONatural/main/Branding.png)

## Information :mag:

![MIT](https://img.shields.io/badge/license-MIT-green)

JSON yet, somehow lighter & faster with the support of all JS TypedArray! It uses a Base64 optimized algorithm... when you use stringify and parse

And for pack/unpack usage, it is binary serialization which use a JSON tree and lookup table which refer to a buffer appended to the json also encoded inside a buffer using TextEncoder(), up to 5x faster and somehow significally faster than the trusted CBOR-X while being 3.5x lighter! Check the demo ;)

If you use larger TypedArray than buffer, simply use pack/unpack and work with ArrayBuffer.
Meanwhile if you can't, the good old stringify/parse function will works fine based on String!
 
![npm](https://img.shields.io/npm/dw/superjsonatural?label=NPM%20DOWNLOAD&logo=NPM)
 
DEMO : [Go to codepen.io](https://codepen.io/vipertechofficial/pen/jOpyNZy) :sparkles:


## Install :package:

> Download it from NPM easily

**Run :**


```diff 
+ npm install superjsonatural
```

And you get that piece of technology for JSON parsing!

## How to use it? :wrench:

```JavaScript

import SuperJSONatural from "superjsonatural"; // In node.js
/* OR */
var SuperJSONatural = window.SuperJSONatural; // Use the minified version for browser (> safari 10 & > Chrome 51)

var data = {
    name: "Prof. Bernice Champlin Jr.",
    male: true,
    female: false,
    timestamp: Date.now(),
    hair: Uint8Array.of(0, 55, 77, 65, 9, 1, 1, 1, 1, 200, 44, 22, 9, 0),
    email: "stevie.conn@luettgen.com",
    phone: 3476774277,
    description: "Et voluptatem incidunt repellat. Qui laboriosam quis accusamus optio sed. Non qui qui quasi aliquid.",
	other: {
		ANARRAY: ["lol", 99],
		prop: 992,
		str: "str",
		hair: Uint32Array.of(999)
	}
};

// It will be a string when encoded, always
var encoded = SuperJSONatural().stringify(data);
var decoded = SuperJSONatural().parse(encoded);
console.log(data, encoded, decoded)

// NEW!!! It will be a Uint8Array (Like a bytes array buffer)
var encoded = SuperJSONatural().pack(data);
var decoded = SuperJSONatural().unpack(encoded);
console.log(data, encoded, decoded)

```
