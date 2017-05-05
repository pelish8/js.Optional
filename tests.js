var Optional = require("./Optional");

QUnit.module("test static", function (obj) {

    QUnit.test("Optional.empty", function (assert) {
        var opt = Optional.empty();

        assert.deepEqual(opt, Optional.EMPTY);
        assert.deepEqual(opt.get(), null);
    });

    QUnit.test("Optional.empty with argument", function (assert) {
        var opt = Optional.empty("");

        assert.deepEqual(opt.get(), null);
    });


    QUnit.test("Optional.of", function (assert) {
        var opt = Optional.of("sale");

        assert.deepEqual(opt.get(), "sale");
    });

    QUnit.test("Optional.of", function (assert) {
        var opt = Optional.of(0);

        assert.deepEqual(opt.get(), 0);
    });

    QUnit.test("Optional.of 0.0", function (assert) {
        var opt = Optional.of(0.0);

        assert.deepEqual(opt.get(), 0.0);
    });

    QUnit.test("Optional.of 1", function (assert) {
        var opt = Optional.of(1);

        assert.deepEqual(opt.get(), 1);
    });

    QUnit.test("Optional.of false", function (assert) {
        var opt = Optional.of(false);

        assert.deepEqual(opt.get(), false);
    });

    QUnit.test("Optional.of true", function (assert) {
        var opt = Optional.of(true);

        assert.deepEqual(opt.get(), true);
    });

    QUnit.test("Optional.of NaN", function (assert) {
        var opt = Optional.of(NaN);

        assert.deepEqual(opt.get(), NaN);
    });

    QUnit.test("Optional.of empty", function (assert) {
        var opt = Optional.of();

        assert.deepEqual(opt.get(), null);
    });

    QUnit.test("Optional.ofNullable", function (assert) {
        var opt = Optional.ofNullable("sale");

        assert.deepEqual(opt.get(), "sale");
    });

    QUnit.test("Optional.ofNullable 0", function (assert) {
        var opt = Optional.ofNullable(0);

        assert.deepEqual(opt.get(), 0);
    });

    QUnit.test("Optional.ofNullable 0.0", function (assert) {
        var opt = Optional.ofNullable(0.0);

        assert.deepEqual(opt.get(), 0.0);
    });

    QUnit.test("Optional.ofNullable 1", function (assert) {
        var opt = Optional.ofNullable(1);

        assert.deepEqual(opt.get(), 1);
    });


    QUnit.test("Optional.ofNullable false", function (assert) {
        var opt = Optional.ofNullable(false);

        assert.deepEqual(opt.get(), false);
    });

    QUnit.test("Optional.ofNullable true", function (assert) {
        var opt = Optional.ofNullable(true);

        assert.deepEqual(opt.get(), true);
    });

    QUnit.test("Optional.ofNullable NaN", function (assert) {
        var opt = Optional.ofNullable(NaN);

        assert.deepEqual(opt.get(), NaN);
    });

    QUnit.test("Optional.ofNullable empty", function (assert) {
        var opt = Optional.ofNullable();

        assert.deepEqual(opt, Optional.EMPTY);
    });

});


QUnit.module("test isPresent", function (obj) {
    QUnit.test("Optional.isPresent", function (assert) {
        var opt = Optional.of("test");

        assert.equal(opt.isPresent(), true);
    });

    QUnit.test("Optional.isPresent empty 1", function (assert) {
        var opt = Optional.empty();

        assert.equal(opt.isPresent(), false);
    });

    QUnit.test("Optional.isPresent empty null", function (assert) {
        var opt = Optional.ofNullable(null);

        assert.equal(opt.isPresent(), false);
    });

    QUnit.test("Optional.isPresent empty undefined", function (assert) {
        var opt = Optional.ofNullable(undefined);

        assert.equal(opt.isPresent(), false);
    });

    QUnit.test("Optional.isPresent empty number", function (assert) {
        var opt = Optional.ofNullable(0);

        assert.equal(opt.isPresent(), true);
    });

    QUnit.test("Optional.isPresent empty true", function (assert) {
        var opt = Optional.ofNullable(true);

        assert.equal(opt.isPresent(), true);
    });

    QUnit.test("Optional.isPresent empty false", function (assert) {
        var opt = Optional.ofNullable(false);

        assert.equal(opt.isPresent(), true);
    });

    QUnit.test("Optional.isPresent empty NaN", function (assert) {
        var opt = Optional.ofNullable(NaN);

        assert.equal(opt.isPresent(), true);
    });
});


QUnit.module("test filter", function (obj) {

    QUnit.test("Optional.filter", function (assert) {
        var opt = Optional.of("test");

        var result = opt.filter(function (value) {
            return value === "test";
        });

        assert.deepEqual(result.get(), "test");
    });

    QUnit.test("Optional.filter not equal", function (assert) {
        var opt = Optional.of("test");

        var result = opt.filter(function (value) {
            return value !== "test";
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.filter empty 1", function (assert) {
        var opt = Optional.of();

        var result = opt.filter(function (value) {
            return value === "test";
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.filter empty 2", function (assert) {
        var opt = Optional.empty()

        var result = opt.filter(function (value) {
            return value === "test";
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.filter undefined", function (assert) {
        var opt = Optional.of("test")

        var result = opt.filter(function (value) {
            return undefined;
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.filter null", function (assert) {
        var opt = Optional.of("test")

        var result = opt.filter(function (value) {
            return null;
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.filter no filter", function (assert) {
        var opt = Optional.of("test")

        assert.throws(function () {
            var result = opt.filter();
        });
    });

    QUnit.test("Optional.filter NaN", function (assert) {
        var opt = Optional.of("test")

        var result = opt.filter(function (value) {
            return NaN;
        });

        assert.deepEqual(result.get(), "test");
    });
});

QUnit.module("test mapper", function (obj) {

    QUnit.test("Optional.mapper string", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return value.toUpperCase();
        });

        assert.deepEqual(result.get(), "TEST");
        assert.notEqual(result, opt);
    });

    QUnit.test("Optional.mapper null", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return null;
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.mapper undefined", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return undefined;
        });

        assert.deepEqual(result, Optional.EMPTY);
    });

    QUnit.test("Optional.mapper number 0", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return 0;
        });

        assert.deepEqual(result.get(), 0);
    });

    QUnit.test("Optional.mapper number 1", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return 1;
        });

        assert.deepEqual(result.get(), 1);
    });

    QUnit.test("Optional.mapper true", function (assert) {
        var opt = Optional.of("test")

        var result = opt.map(function (value) {
            return NaN;
        });

        assert.deepEqual(result.get(), NaN);
    });

    QUnit.test("Optional.mapper no mapper", function (assert) {
        var opt = Optional.of("test")

        assert.throws(function () {
            var result = opt.map();
        });
    });

    QUnit.test("Optional.mapper pass number", function (assert) {
        var opt = Optional.of("test")

        assert.throws(function () {
            var result = opt.map(1);
        });
    });

    QUnit.test("Optional.mapper pass string", function (assert) {
        var opt = Optional.of("test")

        assert.throws(function () {
            var result = opt.map("test");
        });
    });

    QUnit.test("Optional.mapper pass boolean", function (assert) {
        var opt = Optional.of("test")

        assert.throws(function () {
            var result = opt.map(false);
        });
    });
});

QUnit.module("test orElse", function (obj) {

    QUnit.test("Optional.orElse value", function (assert) {
        var result = Optional
            .of("test")
            .orElse("default value");

            assert.equal(result, "test");
    });


    QUnit.test("Optional.orElse default value", function (assert) {
        var result = Optional
            .empty()
            .orElse("default value");

            assert.equal(result, "default value");
    });

    QUnit.test("Optional.orElse value number 0", function (assert) {
        var result = Optional
            .of(0)
            .orElse("default value");

            assert.equal(result, 0);
    });

    QUnit.test("Optional.orElse value number 1", function (assert) {
        var result = Optional
            .of(1)
            .orElse("default value");

            assert.equal(result, 1);
    });

});

QUnit.module("test orElseGet", function (obj) {

    QUnit.test("Optional.orElseGet value", function (assert) {
        var result = Optional
            .of("test")
            .orElseGet(Optional.of("default value"));

            assert.equal(result, "test");
    });


    QUnit.test("Optional.orElseGet default value", function (assert) {
        var result = Optional
            .empty()
            .orElseGet(Optional.of("default value"));

            assert.equal(result, "default value");
    });

    QUnit.test("Optional.orElseGet value number 0", function (assert) {
        var result = Optional
            .of(0)
            .orElseGet(Optional.of("default value"));

            assert.equal(result, 0);
    });

    QUnit.test("Optional.orElseGet value number 1", function (assert) {
        var result = Optional
            .of(1)
            .orElseGet(Optional.of("default value"));

            assert.equal(result, 1);
    });

});

QUnit.module("test equals", function (obj) {
    QUnit.test("Optional.equals string", function (assert) {
        var result = Optional.of("test");

        assert.equal(result.equals("test"), true);
    });

    QUnit.test("Optional.equals number 0", function (assert) {
        var result = Optional.of(0);

        assert.equal(result.equals(0), true);
    });


    QUnit.test("Optional.equals number 1", function (assert) {
        var result = Optional.of(1);

        assert.equal(result.equals(1), true);
    });

    QUnit.test("Optional.equals number NaN", function (assert) {
        var result = Optional.of(NaN);

        assert.equal(result.equals(NaN), true);
    });

    QUnit.test("Optional.equals Optional same value", function (assert) {
        var result = Optional.of("test");
        var cmp = Optional.of("test");

        assert.equal(result.equals(cmp), true);
    });

    QUnit.test("Optional.equals Optional diff value", function (assert) {
        var result = Optional.of("test1");
        var cmp = Optional.of("test");

        assert.equal(result.equals(cmp), false);
    });

});
