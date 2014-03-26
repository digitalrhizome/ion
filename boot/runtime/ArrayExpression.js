'use strict';
const DynamicExpression = require('./DynamicExpression'), ion = require('../');
const ArrayExpression = ion.defineClass({
        id: 'ArrayExpression',
        constructor: function ArrayExpression() {
            ArrayExpression.super.apply(this, arguments);
            if (!(this.elements != null)) {
                throw new Error('elements is required');
            }
            if (!(this.context != null)) {
                throw new Error('context is required');
            }
        },
        properties: {
            observeElements: false,
            notifyIfActive: function () {
                if (this.isActive) {
                    this.notify();
                }
            },
            setArgumentValue: function (key, value) {
                if (this.argumentValues[key] !== value) {
                    if (this.observeElements) {
                        ion.unobserve(this.argumentValues[key], this.itemObserver);
                    }
                    this.argumentValues[key] = value;
                    if (this.observeElements) {
                        ion.observe(value, this.itemObserver = this.itemObserver != null ? this.itemObserver : function () {
                            this.notifyIfActive();
                        }.bind(this));
                    }
                    this.notifyIfActive();
                }
            },
            activate: function () {
                if (!(this.argumentValues != null)) {
                    let _ref = [];
                    {
                        let _ref2 = this.elements;
                        for (let _i = 0; _i < _ref2.length; _i++) {
                            let item = _ref2[_i];
                            _ref.push(this.context.createRuntime(item));
                        }
                    }
                    this.expressions = _ref;
                    this.argumentValues = [];
                    this.expressionWatchers = [];
                    for (let key = 0; key < this.expressions.length; key++) {
                        this.expressionWatchers[key] = this.setArgumentValue.bind(this, key);
                    }
                }
                {
                    let _ref = this.expressions;
                    for (let _i = 0; _i < _ref.length; _i++) {
                        let key = _i;
                        let expression = _ref[_i];
                        expression.watch(this.expressionWatchers[key]);
                    }
                }
                ArrayExpression.super.prototype.activate.apply(this, arguments);
                this.setValue(this.argumentValues);
            },
            deactivate: function () {
                {
                    let _ref = this.expressions;
                    for (let _i = 0; _i < _ref.length; _i++) {
                        let key = _i;
                        let expression = _ref[_i];
                        expression.unwatch(this.expressionWatchers[key]);
                    }
                }
                ArrayExpression.super.prototype.deactivate.apply(this, arguments);
            }
        },
        test: function () {
            const Context = require('./Context');
            let e = new ArrayExpression({
                    context: new Context(),
                    elements: [
                        {
                            type: 'Literal',
                            value: 1
                        },
                        {
                            type: 'Literal',
                            value: 2
                        }
                    ]
                });
            let result = void 0;
            function watcher(value) {
                result = value;
            }
            e.watch(watcher);
            if (!(JSON.stringify(result) === '[1,2]'))
                throw new Error('Assertion Failed: (JSON.stringify(result) is "[1,2]")');
        }
    }, DynamicExpression);
module.exports = exports = ArrayExpression;