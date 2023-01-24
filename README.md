# SuperJSONatural

## Information :mag:

![MIT](https://img.shields.io/badge/license-MIT-green)

JSON yet, lighter & faster with the support of all JS TypedArray! It uses a Base64 optimized algorithm...
 
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
var encoded = SuperJSONatural().stringify(data);
var decoded = SuperJSONatural().parse(encoded);
console.log(data, encoded, decoded)

```
