/*
---
name: kenta.AOP
description: AOP for MooTools 1.3.x
authors: Cristian Carlesso http://mykenta.blogspot.com
copyright: Cristian Carlesso
license: MIT-style license.
version: 1.2
requires: [Events, Class.PatternMutators]
provides: [AOP]
...
*/

AOP = new (new Class({
	Implements:    [Events],
	_call:         0,
	getCallNumber: function(){
		var _call = 0 + this._call++
		return _call
	}
}))

!function(){

	var $uid = function(x){
		return x._privateUID || (x._privateUID = String.uniqueID())
	}

	Class.defineMutator(new RegExp("^((?!(" + (function(){
		var current = []
		for (var m in Class.Mutators) {
			var desc = '' + m
			if (desc.split('')[0] != '$') {
				current.push(desc)
			} else {
				var extract = desc.replace("$mutator:/", "")
				current.push(extract.substring(0, extract.length - 1))
			}
		}
		return current.join('|')
	})() + ")).*)$"), function(fn, name){

		var wrapFN = function(fn){
			return function(){
				var parameter = {
					description: this.Aspect,
					uniqueID:    $uid(this),
					name:        name,
					params:      arguments,
					callno:      AOP.getCallNumber()
				}
				if ('Aspect' in this) {
					//PRE
					AOP.fireEvent('pre', parameter)

					if (parameter.cancel) {
						return
					}
					if (parameter.returnthis) {
						return parameter.returnthis
					}
				}

				parameter.result = fn.apply(this, arguments)
				if ('Aspect' in this) {
					//POST
					AOP.fireEvent('post', parameter)

					if (parameter.cancel) {
						return
					}
					if (parameter.returnthis) {
						return parameter.returnthis
					}
				}

				return parameter.result
			}
		}

		if (name == "implement") {
			var imp = this.implement
			var me = this
			this.implement = function(key, value){
				if (typeOf(key) == 'string' && typeOf(value) == 'function') {
					imp.apply(me, [ key, wrapFN(value) ])
					return me
				}
				return imp.apply(me, arguments)
			}
		} else {
			if (typeOf(name) == 'string' && typeOf(fn) == 'function') {
				this.prototype[name] = wrapFN(fn)
			} else {
				this.prototype[name] = fn
			}
		}
	})

}()