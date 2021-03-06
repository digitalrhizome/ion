void (function(){var _ion_mergePatch_ = function(module,exports,require){'use strict';
var ion = require('./'), isObject = function (a) {
        var type = typeof a;
        return a != null && type === 'object' || type === 'function';
    }, deleteValue = null, isPrivate = function (name) {
        return name[0] === '_';
    }, watchImmediate = function (object, handler) {
        if (!isObject(object)) {
            throw new Error('Cannot watch: #{object}');
        }
        watch.count = (watch.count != null ? watch.count : 0) + 1;
        var watching = true;
        var propertyWatchers = {};
        var watchProperties = function (changes) {
            var properties = (changes != null ? changes.map(function (a) {
                    return a.name;
                }) : void 0) != null ? changes.map(function (a) {
                    return a.name;
                }) : Object.keys(object);
            for (var _i = 0; _i < properties.length; _i++) {
                var name = properties[_i];
                (function (name) {
                    if (watching) {
                        propertyWatchers[name] != null ? propertyWatchers[name]() : void 0;
                        var value = object[name];
                        if (isObject(value)) {
                            propertyWatchers[name] = watch(value, function (patch) {
                                var _ref = {};
                                _ref[name] = patch;
                                handler(_ref);
                            });
                        } else {
                            delete propertyWatchers[name];
                        }
                    }
                }(name));
            }
        };
        watchProperties(null);
        var unobserve = ion.observe(object, function (changes) {
                if (watching) {
                    var patch = null;
                    for (var _i2 = 0; _i2 < changes.length; _i2++) {
                        var _ref2 = changes[_i2];
                        var name = _ref2.name;
                        if (!isPrivate(name)) {
                            patch = patch != null ? patch : {};
                            patch[name] = object.hasOwnProperty(name) ? object[name] : deleteValue;
                        }
                    }
                    watchProperties(changes);
                    if (patch != null) {
                        handler(patch);
                    }
                }
            });
        return function () {
            watch.count--;
            watching = false;
            unobserve();
            unobserve = null;
            for (var key in propertyWatchers) {
                var unwatch = propertyWatchers[key];
                unwatch();
            }
            propertyWatchers = null;
        };
    }, increment = /[+-]\d+/;
var canSetProperty = exports.canSetProperty = function (object, key) {
        return !(typeof object === 'function' && key === 'name');
    }, merge = exports.merge = function (target, values, options, schema) {
        if ((schema != null ? schema.type : void 0) === 'integer' && increment.test(values)) {
            values = (typeof target === 'number' ? target : 0) + parseInt(values.substring(1));
        }
        var deleteNull = (options != null ? options.deleteNull : void 0) != null ? options.deleteNull : true;
        if ((values != null ? values.constructor : void 0) !== Object) {
            return values;
        }
        if (!isObject(target)) {
            if ((options != null ? options.factory : void 0) != null) {
                target = options.factory(values);
            } else {
                target = {};
            }
        }
        for (var key in values) {
            var value = values[key];
            if (deleteNull && value === deleteValue) {
                delete target[key];
                ion.changed(target);
            } else {
                var itemSchema = (schema != null ? schema.items : void 0) != null ? schema.items : schema != null ? schema.properties != null ? schema.properties[key] : void 0 : void 0;
                var newValue = merge(target[key], value, options, itemSchema);
                if (newValue !== target[key] && canSetProperty(target, key)) {
                    target[key] = newValue;
                    ion.changed(target);
                }
            }
        }
        return target;
    }, combine = exports.combine = function (patch1, patch2) {
        return merge(patch1, patch2, { deleteNull: false });
    }, watch = exports.watch = function (object, handler) {
        var active = false;
        var combinedPatch = void 0;
        var finalCallback = function () {
            handler(combinedPatch);
            active = false;
            combinedPatch = void 0;
        };
        var delayedHandler = function (patch) {
            combinedPatch = combine(combinedPatch, patch);
            if (!active) {
                ion.nextCheck(finalCallback);
                active = true;
            }
        };
        return watchImmediate(object, delayedHandler);
    }, diff = exports.diff = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return void 0;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return newValue != null ? newValue : null;
        }
        var patch = void 0;
        for (var name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                if (!newValue.hasOwnProperty(name)) {
                    patch = patch != null ? patch : {};
                    patch[name] = null;
                } else {
                    var propertyDiff = diff(oldValue[name], newValue[name]);
                    if (propertyDiff !== void 0) {
                        patch = patch != null ? patch : {};
                        patch[name] = propertyDiff;
                    }
                }
            }
        }
        for (var name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                patch = patch != null ? patch : {};
                patch[name] = newValue[name];
            }
        }
        return patch;
    }, isChange = exports.isChange = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return false;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return true;
        }
        if (Array.isArray(newValue) && JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            return true;
        }
        for (var name in newValue) {
            if (!oldValue.hasOwnProperty(name)) {
                if (!(newValue[name] != null)) {
                    continue;
                } else {
                    return true;
                }
            }
            if (isChange(oldValue[name], newValue[name])) {
                return true;
            }
        }
        return false;
    }, test = exports.test = function () {
        var equal = function (a, b) {
            return !isChange(a, b) && !isChange(b, a);
        };
        return {
            merge: function () {
                if (!equal({
                        a: {
                            b: 2,
                            c: 3
                        },
                        d: 4
                    }, merge({ a: { b: 2 } }, {
                        a: { c: 3 },
                        d: 4
                    })))
                    throw new Error('Assertion Failed: (equal({a:{b:2,c:3},d:4}, merge({a:{b:2}}, {a:{c:3},d:4})))');
                if (!equal({ b: 2 }, merge(null, { b: 2 })))
                    throw new Error('Assertion Failed: (equal({b:2}, merge(null, {b:2})))');
                if (!equal({
                        a: 1,
                        b: 2
                    }, merge({
                        a: 1,
                        b: 2,
                        c: 3
                    }, { c: void 0 })))
                    throw new Error('Assertion Failed: (equal({a:1,b:2}, merge({a:1,b:2,c:3}, {c:undefined})))');
                var double = function (x) {
                    return x * 2;
                };
                if (!equal({ a: double }, merge({}, { a: double })))
                    throw new Error('Assertion Failed: (equal({a:double}, merge({},{a:double})))');
                if (!equal({ a: [] }, merge({
                        a: [
                            1,
                            2
                        ]
                    }, { a: [] })))
                    throw new Error('Assertion Failed: (equal({a:[]}, merge({a:[1,2]}, {a:[]})))');
            },
            isChange: function () {
                if (!isChange({ a: 1 }, null))
                    throw new Error('Assertion Failed: (isChange({a:1}, null))');
                if (!!isChange(null, null))
                    throw new Error('Assertion Failed: (not isChange(null, null))');
                if (!isChange(void 0, null))
                    throw new Error('Assertion Failed: (isChange(undefined, null))');
                if (!isChange(null, void 0))
                    throw new Error('Assertion Failed: (isChange(null, undefined))');
                if (!!isChange({ a: 1 }, { a: 1 }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {a:1}))');
                if (!!isChange({
                        a: {
                            b: 2,
                            c: 3
                        }
                    }, { a: { b: 2 } }))
                    throw new Error('Assertion Failed: (not isChange({a:{b:2,c:3}}, {a:{b:2}}))');
                if (!isChange({ a: { b: 2 } }, { a: { b: 3 } }))
                    throw new Error('Assertion Failed: (isChange({a:{b:2}}, {a:{b:3}}))');
                if (!!isChange({ a: 1 }, { b: null }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {b:null}))');
                if (!isChange({
                        a: [
                            1,
                            2
                        ]
                    }, { a: [] }))
                    throw new Error('Assertion Failed: (isChange({a:[1,2]}, {a:[]}))');
            },
            diff: function () {
                if (!equal({ b: 2 }, diff({ a: 1 }, {
                        a: 1,
                        b: 2
                    })))
                    throw new Error('Assertion Failed: (equal({b:2}, diff({a:1}, {a:1,b:2})))');
                if (!equal({
                        a: {
                            b: 3,
                            c: null
                        }
                    }, diff({
                        a: {
                            b: 2,
                            c: 4
                        }
                    }, { a: { b: 3 } })))
                    throw new Error('Assertion Failed: (equal({a:{b:3,c:null}}, diff({a:{b:2,c:4}}, {a:{b:3}})))');
                if (!equal({ a: 1 }, diff(null, { a: 1 })))
                    throw new Error('Assertion Failed: (equal({a:1}, diff(null, {a:1})))');
                if (!equal({ c: { d: { f: 4 } } }, diff({
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 2
                            }
                        }
                    }, {
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 4
                            }
                        }
                    })))
                    throw new Error('Assertion Failed: (equal({c:{d:{f:4}}}, diff({a:1,b:2,c:{d:{e:1,f:2}}}, {a:1,b:2,c:{d:{e:1,f:4}}})))');
                if (!equal(null, diff({ a: 1 }, void 0)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, undefined)))');
                if (!equal(null, diff({ a: 1 }, null)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, null)))');
                if (!equal(void 0, diff({ a: { b: 2 } }, { a: { b: 2 } })))
                    throw new Error('Assertion Failed: (equal(undefined, diff({a:{b:2}}, {a:{b:2}})))');
            },
            observe: function (done) {
                var source = {
                        name: 'Kris',
                        age: 41,
                        children: {
                            Sadera: {
                                grandchildren: {
                                    One: 1,
                                    Two: 2
                                }
                            },
                            Orion: {},
                            Third: {}
                        }
                    };
                var target = ion.clone(source, true);
                var unwatch = watch(source, function (patch) {
                        target = merge(target, patch);
                        if (equal(source, target)) {
                            done();
                            unwatch();
                        }
                    });
                {
                    source.name = 'Fred';
                    source.children = ion.patch(source.children, {
                        Orion: {
                            a: 1,
                            b: 2,
                            c: 12
                        },
                        Sadera: { grandchildren: { three: 3 } }
                    });
                }
                delete source.children.Third;
                ion.sync();
            }
        };
    }();
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/mergePatch',_ion_mergePatch_);
    else
      _ion_mergePatch_.call(this, module, exports, require);
  }
  else {
    _ion_mergePatch_.call(this);
  }
}).call(this)
//# sourceMappingURL=./mergePatch.map