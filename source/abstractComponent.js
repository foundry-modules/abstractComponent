/**
 * abstractComponent
 * Creates an abstraction of the actual component class.
 *
 * Copyright (c) 2012 Jason Ramos
 * www.stackideas.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

window.abstractComponent = function(name) {

	var self.run = self = window[name] = function() {
		self.queue.push({
			type: "run",
			context: this,
			args: arguments
		});
	}

	// Where the list of function calls are stored.
	self.queue = [];

	self.ready = function() {
		self.queue.push({
			method: "ready",
			context: this,
			args: arguments
		});
	}

	self.require = function() {

		var chain = [{
			method: "require",
			context: this,
			args: arguments
		}];

		var methods = "library,script,stylesheet,language,template,view,done,always,fail,progress".split(","),
			instance = {};

		for (i in methods) {

			var method = methods[i];

			instance[method] = (function(method) {

				return function() {
					chain.push({
						method: method,
						context: this,
						args: arguments;
					});
				};

			}(method)); // Creates a closure for the method variable.
		}

		self.queue.push(chain);

		return instance;
	}
}
