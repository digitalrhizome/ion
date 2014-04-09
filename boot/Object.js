void (function(){var _Object_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Object = ion.defineClass({
        id: 'Object',
        constructor: function Object(properties) {
            if (properties != null) {
                for (let key in properties) {
                    let value = properties[key];
                    this[key] = value;
                }
            }
        },
        properties: {
            toJSON: function () {
                const properties = {};
                if (this.constructor.id != null) {
                    properties.$ = this.constructor.id;
                }
                {
                    let _ref = this;
                    for (let key in _ref) {
                        let value = _ref[key];
                        if (this.hasOwnProperty(key)) {
                            properties[key] = value;
                        }
                    }
                }
                return properties;
            }
        }
    }, null);
module.exports = exports = Object;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('Object',_Object_);
    else
      _Object_.call(this, module, exports, require);
  }
  else {
    _Object_.call(this);
  }
}).call(this)