void (function(){var _ion_runtime_ObjectExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ObjectExpression = ion.defineClass({
        name: 'ObjectExpression',
        properties: {
            setLeftValue: function (value) {
                this.value = value;
            },
            activate: function () {
                ObjectExpression.super.prototype.activate.apply(this, arguments);
                this.typeExpression = this.typeExpression != null ? this.typeExpression : this.context.createRuntime(this.objectType != null ? this.objectType : null);
                this.unobserve = this.typeExpression.observe(this.typeWatcher = this.typeWatcher != null ? this.typeWatcher : ion.bind(function (value) {
                    if (!this.value || value != null) {
                        this.statements != null ? this.statements.deactivate() : void 0;
                        this.statements = null;
                        value = value != null ? value : {};
                    } else {
                        value = this.value;
                    }
                    if (!(this.statements != null)) {
                        var context = this.context.newContext(value);
                        context.setFastInsert(true);
                        this.statements = context.createRuntime({
                            type: 'BlockStatement',
                            body: this.properties
                        });
                        this.statements.activate();
                        context.setFastInsert(false);
                    }
                    this.setValue(value);
                }, this));
            },
            deactivate: function () {
                ObjectExpression.super.prototype.deactivate.apply(this, arguments);
                this.statements != null ? this.statements.deactivate() : void 0;
                this.unobserve();
            }
        }
    }, DynamicExpression);
module.exports = exports = ObjectExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ObjectExpression',_ion_runtime_ObjectExpression_);
    else
      _ion_runtime_ObjectExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ObjectExpression_.call(this);
  }
}).call(this)
//# sourceMappingURL=./ObjectExpression.map