void (function(){var _ion_runtime_MemberExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var MemberExpression = ion.defineClass({
        name: 'MemberExpression',
        properties: {
            activate: function () {
                MemberExpression.super.prototype.activate.apply(this, arguments);
                this.objectExpression = this.objectExpression != null ? this.objectExpression : this.context.createRuntime(this.object);
                this.propertyExpression = this.propertyExpression != null ? this.propertyExpression : this.context.createRuntime(this.computed ? this.property : this.property.name);
                this.propertyExpression.watch(this.propertyWatcher = this.propertyWatcher != null ? this.propertyWatcher : function (propertyValue) {
                    this.propertyValue = propertyValue;
                    this.updateValue();
                }.bind(this));
                this.objectExpression.watch(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : function (objectValue) {
                    this.objectValue = objectValue;
                    this.updateValue();
                    this.objectObserver != null ? this.objectObserver() : void 0;
                    if (objectValue != null) {
                        this.objectObserver = ion.observe(objectValue, function (changes) {
                            this.updateValue();
                        }.bind(this), this.propertyValue);
                    }
                }.bind(this));
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.objectExpression.unwatch(this.objectWatcher);
                this.propertyExpression.unwatch(this.propertyWatcher);
            },
            updateValue: function () {
                var value = void 0;
                if (this.objectValue != null && this.propertyValue != null) {
                    value = ion.get(this.objectValue, this.propertyValue);
                }
                this.setValue(value);
            },
            setMemberValue: function (value) {
                if (this.objectValue != null && this.propertyValue != null) {
                    ion.set(this.objectValue, this.propertyValue, value);
                }
            }
        }
    }, DynamicExpression);
module.exports = exports = MemberExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/MemberExpression',_ion_runtime_MemberExpression_);
    else
      _ion_runtime_MemberExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_MemberExpression_.call(this);
  }
}).call(this)