;(function(exports) {
    var SintaxError = function(message) {
		this.message = message;
	};

	var Symbol = function(val) {
		this.value = val;
	};

	function atom(token) {
		if (token === '#t') {
			return true;
		} else if (token === '#f') {
			return false;
		} else if (!isNaN(parseFloat(token))) {
			return parseFloat(token);
		} else if (token === 'lambda' || token === 'let' || token === 'set!' || token === 'quote' || token === 'if' || token === 'apply' || token === 'define' || token === 'begin'){
            return token
		} else {
			return new Symbol(token);
		}
	}

	function readFrom(tokens) {
		if (tokens.length === 0) {
			throw new SintaxError('Parse error.');
		}

		var token = tokens.shift();
		if (token === '(') {
			var L = [];
			while (tokens[0] !== ')') {
				L.push(readFrom(tokens));
			}
			tokens.shift();
			return  L;
		} else if (token === ')') {
			throw new SintaxError('Parse error: unexpected \')\'.');
		} else if (token !== ''){
			return atom(token);
		} else {
    	    return readFrom(tokens);   
		}
	}

	/* Taken from: http://maryrosecook.com/blog/post/little-lisp-interpreter */
	function tokenize(input) {
		return input.split('"')
                .map(function(x, i) {
                   if (i % 2 === 0) { // not in string
                     return x.replace(/\(/g, ' ( ')
                             .replace(/\)/g, ' ) ')
                             .replace(/\'/g, ' quote ');
                   } else { // in string
                     return x.replace(/ /g, "!whitespace!");
                   }
                 })
                .join('"')
                .trim()
                .split(/\s+/)
                .map(function(x) {
                  return x.replace(/!whitespace!/g, " ");
                });
	}

	function ignoreComments(input) {
		var re = /;;.*\n/;
		var res = input.replace(re, '');
		return res;
	}

	function parse(input) {
		return readFrom(tokenize(ignoreComments(input)));
	}

	exports.parse = parse;
	exports.Symbol = Symbol;
	exports.SintaxError = SintaxError;

})(typeof exports === 'undefined' ? this : exports);