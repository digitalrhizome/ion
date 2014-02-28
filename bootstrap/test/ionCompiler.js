(function(){var _ion_test_ionCompiler_ = function(module,exports,require){var index, tests;

index = require('../compiler');

tests = {
  "var x = 10": "'use strict';\nlet x = 10;",
  "for name, value of foo\n    console.log(name + value)": "'use strict';\nfor (let name in foo) {\n    let value = foo[name];\n    console.log(name + value);\n}",
  "for var name, value of {a:1,b:2,c:3}\n    console.log(name + value)": "'use strict';\n{\n    let _ref = {\n            a: 1,\n            b: 2,\n            c: 3\n        };\n    for (let name in _ref) {\n        let value = _ref[name];\n        console.log(name + value);\n    }\n}    ",
  "for var name in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "for name, index in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let index = _i;\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "var object =\n    x: 1\n    y: 2\n    foo:\n        z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        foo: { z: 3 }\n    };",
  "var array = []\n    1\n    2\n    3": "'use strict';\nlet array = [\n        1,\n        2,\n        3\n    ];",
  "var kids = []\n    {}\n        name: \"Alpha\"\n        age: 10\n    {}\n        name: \"Beta\"\n        age: 8": "'use strict';\nlet kids = [\n        {\n            name: 'Alpha',\n            age: 10\n        },\n        {\n            name: 'Beta',\n            age: 8\n        }\n    ];",
  "try\n    doSomething(1)\ncatch e\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    log(e);\n}",
  "try\n    doSomething(1)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} finally {\n    log(e);\n}",
  "try\n    doSomething(1)\ncatch e\n    console.error(e)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    console.error(e);\n} finally {\n    log(e);\n}",
  "for key, name of foo\n    if name is 'a'\n        break\n    else if name is 'b'\n        continue\n    else if name is 'c'\n        return\n    else if name is 'd'\n        throw new Error(\"D\")\n    else\n        return\n            x: 1\n            y: 2": "'use strict';\nfor (let key in foo) {\n    let name = foo[key];\n    if (name === 'a') {\n        break;\n    } else if (name === 'b') {\n        continue;\n    } else if (name === 'c') {\n        return;\n    } else if (name === 'd') {\n        throw new Error('D');\n    } else {\n        return {\n            x: 1,\n            y: 2\n        };\n    }\n}",
  "console.log(\"Hello {{name}}\")": "'use strict';\nconsole.log('Hello ' + name);",
  "console.log(\"{{name}}\")": "'use strict';\nconsole.log('' + name);",
  "console.log(\"{{ 1 }}{{ 2 }}\")": "'use strict';\nconsole.log('' + 1 + 2);",
  "return \"\"\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>' + title + '</title></head>\\n    <body>\\n    ' + body + '\\n    </body>\\n</html>';",
  "return ''\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>{{ title }}</title></head>\\n    <body>\\n    {{ body }}\\n    </body>\\n</html>';",
  "do -> x": "'use strict';\n(function () {\n    return x;\n}());",
  "do (x, y) => x + y": "'use strict';\n(function (x, y) {\n    return x + y;\n}.bind(this)(x, y));",
  "const ion = import \"ion\"": "'use strict';\nconst ion = require('ion');",
  "export\n    secret: 97542": "'use strict';\nmodule.exports = exports = { secret: 97542 };",
  "export var x = 1, y = 2": "'use strict';\nlet x = exports.x = 1;\nlet y = exports.y = 2;",
  "export const\n    x = 1\n    y = 2\n    z = 3": "'use strict';\nconst x = exports.x = 1;\nconst y = exports.y = 2;\nconst z = exports.z = 3;",
  "var {x,y} = {x:1,y:2}": "'use strict';\nlet _ref = {\n        x: 1,\n        y: 2\n    };\nlet x = _ref.x;\nlet y = _ref.y;",
  "for key, {x:[a,b],y:{c:d}} of points\n    console.log(x, y)": "'use strict';\nfor (let key in points) {\n    let _ref = points[key];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "for {x:[a,b],y:{c:d}}, index in points\n    console.log(x, y)": "'use strict';\nfor (let _i = 0; _i < points.length; _i++) {\n    let index = _i;\n    let _ref = points[_i];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "foo ? bar": "'use strict';\nfoo != null ? foo : bar;",
  "foo ?? bar": "'use strict';\nfoo != void 0 ? foo : bar;",
  "x ?= y": "'use strict';\nx = x != null ? x : y;",
  "x ??= y": "'use strict';\nx = x != void 0 ? x : y;",
  "for const x, index in foo\n    log(x)": "'use strict';\nfor (let _i = 0; _i < foo.length; _i++) {\n    const index = _i;\n    const x = foo[_i];\n    log(x);\n}",
  "[x,y] = [y,x]": "'use strict';\nconst _ref = [\n        y,\n        x\n    ];\nx = _ref[0];\ny = _ref[1];",
  "a?.b": "'use strict';\na != null ? a.b : void 0;",
  "a?.b.c?.d": "'use strict';\na != null ? a.b.c != null ? a.b.c.d : void 0 : void 0;",
  "a?()": "'use strict';\na != null ? a() : void 0;",
  "a?.b?.c?()": "'use strict';\na != null ? a.b != null ? a.b.c != null ? a.b.c() : void 0 : void 0 : void 0;",
  "a?.b().c?()": "'use strict';\na != null ? a.b().c != null ? a.b().c() : void 0 : void 0;",
  "y = (x) -> 2": "'use strict';\ny = function (x) {\n    return 2;\n};",
  "s?": "'use strict';\ns != null;",
  "# also test comments\nvar regex = /foo/": "'use strict';\nlet regex = /foo/;",
  "for var i = 0; i < 10; i++\n    console.log(i)": "'use strict';\nfor (let i = 0; i < 10; i++) {\n    console.log(i);\n}",
  "for key of object if key[0] isnt '_' for c in key\n    console.log(c)": "'use strict';\nfor (let key in object) {\n    if (key[0] !== '_') {\n        for (let _i = 0; _i < key.length; _i++) {\n            let c = key[_i];\n            console.log(c);\n        }\n    }\n}",
  "console.log([key for key of object if key is cool])": "'use strict';\nlet _ref = [];\nfor (let key in object) {\n    if (key === cool) {\n        _ref.push(key);\n    }\n}\nconsole.log(_ref);",
  "(console.log)\n    1\n    2\n    {}\n        x: 1\n        y: 2": "'use strict';\nconsole.log(1, 2, {\n    x: 1,\n    y: 2\n});",
  "var x = ->\n    try\n        foo()\n        bar()\n    catch e\n        baz()": "'use strict';\nlet x = function () {\n    try {\n        foo();\n        bar();\n    } catch (e) {\n        baz();\n    }\n};",
  "if foo\n    # bar": "'use strict';\nif (foo) {\n}",
  "foo bar baz, 3": "'use strict';\nfoo(bar(baz, 3));",
  "trim = (a = \"\") -> a.trim()": "'use strict';\ntrim = function (a) {\n    a = a != null ? a : '';\n    return a.trim();\n};",
  "(foo)\n    1\n    2": "'use strict';\nfoo(1, 2);",
  "(compile)\n    foo: 1\n    bar: 2\n    baz:\n        a: 1\n        b: 2": "'use strict';\ncompile({\n    foo: 1,\n    bar: 2,\n    baz: {\n        a: 1,\n        b: 2\n    }\n});",
  "var array = [1,2,3]\n    4\n    5\n    6": "'use strict';\nlet array = [\n        1,\n        2,\n        3,\n        4,\n        5,\n        6\n    ];",
  "var point = new Point(10, 20)\n    z: 30": "'use strict';\nlet point = new Point(10, 20);\npoint.z = 30;",
  "var object = {x:1, y:2}\n    z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        z: 3\n    };",
  "origin = Point\n    x: 1\n    y: 2": "'use strict';\norigin = new Point();\norigin.x = 1;\norigin.y = 2;",
  "origin = Line\n    a: Point\n        x: 0\n        y: 0\n    b: Point\n        x: 10\n        y: 20": "'use strict';\norigin = new Line();\nlet _ref = new Point();\n_ref.x = 0;\n_ref.y = 0;\norigin.a = _ref;\nlet _ref2 = new Point();\n_ref2.x = 10;\n_ref2.y = 20;\norigin.b = _ref2;",
  "input:\n    # ignore this comment\n    x: 10\n    y: 20\n    z:\n        # also ignore this one\n        a: 1\n        b: 2\n    w: Point\n        x: 0\n        y: 0": "'use strict';\nif (input == null)\n    input = {};\ninput.x = 10;\ninput.y = 20;\nif (input.z == null)\n    input.z = {};\ninput.z.a = 1;\ninput.z.b = 2;\nlet _ref = new Point();\n_ref.x = 0;\n_ref.y = 0;\ninput.w = _ref;",
  "var point = Point\n    [x]: 1\n    [y]: 2": "'use strict';\nlet point = new Point();\npoint[x] = 1;\npoint[y] = 2;",
  "var element = div\n    id: 'foo'\n    style:\n        color: 'red'\n    for key, value of {y: 2, z: 3}\n        [key]: value\n    div\n        \"Hello\"\n    div\n        \"World\"\n    if name?\n        \"Welcome: \" + name": "'use strict';\nlet element = new div();\nelement.id = 'foo';\nif (element.style == null)\n    element.style = {};\nelement.style.color = 'red';\n{\n    let _ref = {\n            y: 2,\n            z: 3\n        };\n    for (let key in _ref) {\n        let value = _ref[key];\n        element[key] = value;\n    }\n}\nlet _ref = new div();\n_ref.add('Hello');\nelement.add(_ref);\nlet _ref2 = new div();\n_ref2.add('World');\nelement.add(_ref2);\nif (name != null) {\n    element.add('Welcome: ' + name);\n}",
  "class Foo extends import 'Bar'\n    static:\n        toString: true": "'use strict';\nconst Foo = ion.defineClass('Foo', { static: { toString: true } }, [require('Bar')]);",
  "export class Foo extends import 'Bar'\n    static:\n        toString: true": "'use strict';\nconst Foo = ion.defineClass('Foo', { static: { toString: true } }, [require('Bar')]);\nmodule.exports = exports = Foo;",
  "var self = @\nvar x = @x\nvar y = @.y\nvar z = this.z": "'use strict';\nlet self = this;\nlet x = this.x;\nlet y = this.y;\nlet z = this.z;",
  "var x = {}\n    [key]: value": "'use strict';\nlet x = {};\nx[key] = value;",
  "if foo\n    return {}\n        for key, value of object\n            [key]: value": "'use strict';\nif (foo) {\n    let _ref = {};\n    for (let key in object) {\n        let value = object[key];\n        _ref[key] = value;\n    }\n    return _ref;\n}"
};

exports.test = function() {
  var e, expected, input, output;
  for (input in tests) {
    expected = tests[input];
    if (expected === null) {
      console.log('---------------------------------------------------');
      console.log(JSON.stringify(index.compile(input, {
        postprocess: false
      }), null, '  '));
      console.log('-Postprocessed------------------------------------');
      console.log(JSON.stringify(index.compile(input, {
        generate: false
      }), null, '  '));
      console.log('---------------------------------------------------');
      try {
        console.log(index.compile(input));
      } catch (_error) {
        e = _error;
        console.log(e.message);
      }
    } else {
      output = index.compile(input);
      if (output.trim() !== expected.trim()) {
        console.log('-Output---------------------------------------------');
        console.log(output);
        throw new Error("\n" + output + "\n!=\n" + expected);
      }
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/ionCompiler',_ion_test_ionCompiler_);
    else
      _ion_test_ionCompiler_.call(this, module, exports, require);
  }
  else {
    _ion_test_ionCompiler_.call(this);
  }
}).call(this)