# js.optional

Optionals for JS

# Installation

Download the [latest release](https://github.com/pelish8/js.optional/releases) from GitHub or from [NPM](https://www.npmjs.com/package/js.optional)

via npm:
``` bash
$ npm install js.optional
```

then just require in node:
``` javascript
var Optional = require('js.optional');
var numberOptional = Optional.of(123);
```
## API

1. ``` equals({*}) ``` - Indicates whether some other object is "equal to" this Optional.
1. ``` filter({function}) ``` - If a value is present, pass the Optional value to predicate function, return an Optional describing the value, otherwise return an empty Optional.
1. ``` isPresent() ``` - If a value is present, return true if Optional value is not 'null' of 'undefined', otherwise return false.
1. ``` isPresent({function}) ``` - If a value is present, invoke the specified consumer with the value, otherwise do nothing.
1. ``` map({function}) ``` - If a value is present, apply the provided mapping function to it, and if the result is non-null, return an Optional describing the result. Otherwise return an empty Optional.
1. ``` orElse({*}) ``` - Return the value if present, otherwise return other.
1. ``` orElseGet({Optional}) ``` - Return the value if present, otherwise invoke 'other.get' and return the result of that invocation.

### Static
1. ``` empty() ``` - Returns an empty Optional.
1. ``` of() ``` - Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional.
1. ``` ofNullable() ``` - Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional.


# Contributing

Found a bug or missing feature? Please open an [issue](https://github.com/pelish8/js.optional/issues)!

Send your feedback. Send your pull requests. All contributions are appreciated!

# License

js.optional may be freely distributed under the MIT license.
