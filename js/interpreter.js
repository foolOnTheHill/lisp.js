;(function(exports) {
	var ExecutionError = function(message) {
		this.message = message;
	}

	var GlobalEnvironment = new Environment();
	GlobalEnvironment.update(Library);

	function eval(exp, env) {
		if (exp instanceof Symbol) {
			var v = env.find(exp.value);

			if (v === undefined) {
				throw new ExecutionError('Error: \''+String(exp.value)+'\' is not defined.');
			} else {
				return v;
			}

		} else if (!(exp instanceof Array)) {
			return exp;
		} else if (exp[0] === 'quote') {
			return exp[1];
		} else if (exp[0] === 'if') {
			var condition = exp[1];
			var conseq = exp[2];
			var alt = exp[3];

			return eval(eval(condition, env) ? conseq : alt, env);
		} else if (exp[0] === 'set!') {
			var symbol = exp[1].value;
			var re = exp[2];
			env.set(symbol, eval(re, env));
		} else if (exp[0] === 'let') {
			var bind = exp[1];
			var body = exp[2];

			var innerEnv = new Environment();
			innerEnv.update(Library);
			innerEnv.outer = env;

			var symbol, val;
			for (var t=0; t < bind.length; t++) {
				symbol = bind[t][0].value;
				val = bind[t][1];
				innerEnv.set(symbol, eval(val, innerEnv));
			}

			return eval(body, innerEnv);
		} else if (exp[0] === 'define') {
	 		var variable = exp[1].value;
	 		var value = exp[2];
	 		env.set(variable, eval(value, env));
	 	} else if (exp[0] === 'lambda') {
	 		/* Adapted from http://maryrosecook.com/blog/post/little-lisp-interpreter*/
	 		var val = function() {
	 			var argsList = arguments;
	 
	 			var scope = exp[1].reduce(function(a, par, i) {
	 				a[par.value] = argsList[i];
	 				return a;
	 			}, {});

	 			var newEnv = new Environment();
	 			newEnv.update(Library);
	 			newEnv.update(scope);
	 			newEnv.outer = env;

	 			return eval(exp[2], newEnv);
	 		};

	 		return val;
		} else if (exp[0] === 'begin') {
			exp.shift();
			var body = exp, val;
			for (var e=0; e < body.length; e++) {
				val = eval(body[e], env); 
			}
			return eval(val, env);
		} else {
			console.log(exp);

			var re = [], tmp;
			for (var e=0; e < exp.length; e++) {
				tmp = eval(exp[e], env);
				re.push(tmp);
			}

			if (re[0] instanceof Function) {
				var pc = re.shift();
				return pc.apply(undefined, re);
			} else {
				return re;
			}
		}
	}

	function interpret(p) {
		var s = parse(p), r;
		return toString(eval(s, GlobalEnvironment));
	}

	exports.interpret = interpret;
	exports.ExecutionError = ExecutionError;

})(typeof exports === 'undefined' ? this : exports);
