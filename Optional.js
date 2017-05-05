// JS Optional
(function UMD(name, context, definition) {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = definition();

    } else if (typeof define === "function" && define.amd) {
        define(definition);

    } else {
        context[name] = definition(name, context);
    }
}("Optional", this, function DEF(name, context) {

    function typeOf(value) {
        var type = typeof value;
        if (type === "object") {
            if (value) {
                if (value instanceof Array) {
                    type = "array";
                }
            } else {
                type = "null";
            }
        }
        return type;
    }

    var isNaN = Number.isNaN || function(value) {
        return value !== value;
    };

    var isFunction = function (fn) {
        return typeOf(fn) === "function";
    };

    /**
     * Create new Optional instance
     *
     * @param val
     * @constructor
     */
    function Optional(val) {
        var type = typeOf(val);
        this.value = (type !== "null" && type !== "undefined") ? val : null;
    }

    /**
     * If a value is present in this Optional, returns the value, otherwise return null.
     *
     * @returns {null|*}
     */
    Optional.prototype.get = function () {
        return this.value;
    };

    /**
     * Indicates whether some other object is "equal to" this Optional.
     *
     * @param {Optional|*} val
     * @returns {boolean}
     */
    Optional.prototype.equals = function (val) {
        if (val instanceof Optional) {
            return this.equals(val.get());
        }

        if (this.value === val) {
            return true;
        }

        if (isNaN(val) && isNaN(this.value)) {
            return true;
        }

        return false;
    };

    /**
     * If a value is present, and consumer is present, invoke the specified consumer with the value, otherwise do nothing.
     * If a value is present, and consumer is not present, return true if Optional value is not 'null' of 'undefined',
     * otherwise return false.
     *
     * @param {function?} consumer
     * @returns {boolean|Optional}
     */
    Optional.prototype.isPresent = function (consumer) {
        if (arguments.length === 0) {
            var type = typeOf(this.value);
            return type !== "null" && type !== "undefined";
        }

        if (this.isPresent()) {
            return Optional.ofNullable(consumer(this.value));
        }

        return this;
    };

    /**
     * If a value is present, pass the Optional value to predicate function, return an Optional describing the value,
     * otherwise return an empty Optional.
     *
     * @param {function} predicate
     * @returns {Optional}
     */
    Optional.prototype.filter = function (predicate) {

        if (!isFunction(predicate)) {
            throw new TypeError("First argument should function.");
        }

        if (!this.isPresent()) {
            return Optional.EMPTY;
        }

        var result = predicate(this.value);
        var type = typeOf(result);

        if (type === "boolean") {
            return result ? this : Optional.EMPTY;
        }

        return (type !== "null" && type !== "undefined") ? this : Optional.EMPTY;
    };

    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an Optional describing the result.
     * Otherwise return an empty Optional.
     *
     * @throws TypeError
     * @param {function} mapper
     * @returns {Optional}
     */
    Optional.prototype.map = function (mapper) {

        if (!isFunction(mapper)) {
            throw new TypeError("First argument should function.");
        }

        if (!this.isPresent()) {
            return Optional.EMPTY;
        }

        return Optional.ofNullable(mapper(this.value));
    };

    /**
     * Return the value if present, otherwise return other.
     *
     * @param {*} other
     * @returns {null|*}
     */
    Optional.prototype.orElse = function (other) {
        return this.isPresent() ? this.value : other;
    };

    /**
     * Return the value if present, otherwise invoke 'other.get' and return the result of that invocation.
     *
     * @param {Optional} other
     * @returns {null|*}
     */
    Optional.prototype.orElseGet = function (other) {
        return this.isPresent() ? this.value : other.get();
    };

    /**
     * Empty Optional instance
     *
     * @type {Optional}
     */
    Optional.EMPTY = new Optional(null);

    /**
     * Returns an empty Optional instance.
     *
     * No value is present for this Optional.
     * @returns {Optional}
     */
    Optional.empty = function () {
        return Optional.EMPTY;
    };

    /**
     * Returns an Optional with the specified value.
     *
     * @param {*} val
     * @returns {Optional}
     */
    Optional.of = function (val) {
        return new Optional(val);
    };

    /**
     * Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional.
     *
     * @param {*} val
     * @returns {Optional}
     */
    Optional.ofNullable = function (val) {
        var type = typeOf(val);
        return type !== "null" && val !== "undefined" ? new Optional(val) : Optional.EMPTY;
    };

    return Optional;
}));
