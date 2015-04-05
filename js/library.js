var Library = {
	'+': function(a, b) {
		return a+b;
	},
	'-': function(a, b) {
		return a-b;
	},
	'*': function(a, b) {
		return a*b;
	},
	'/': function(a, b) {
		return a/b;
	},
	'=': function(a, b) {
		if ((a instanceof Array) && (b instanceof Array)) {
			if (a.length != b.length) {
				return false;
			} else {
				for (var i = 0; i < a.length; i++) {
					if (a[i] !== b[i]) {
						return false;
					}
				}
				return true;
			}
		} else {
			return a === b;
		}
	},
	'eq?': function(a, b) {
		if ((a instanceof Array) && (b instanceof Array)) {
			if (a.length != b.length) {
				return false;
			} else {
				for (var i = 0; i < a.length; i++) {
					if (a[i] !== b[i]) {
						return false;
					}
				}
				return true;
			}
		} else {
			return a === b;
		}
	},
	'>': function (a, b) {
		return a > b;
	},
	'<': function(a, b) {
		return a < b;
	},
	'<=': function(a, b) {
		return a <= b;
	},
	'>=': function(a, b) {
		return a >= b;
	},
	'and': function(a, b) {
		return (a && b);
	},
	'or': function(a, b) {
		return (a || b);
	},
	'not': function(a) {
		return !a;
	},
	'length': function(lst) {
		return lst.length;
	},
	'append': function(fst, lst) {
		return fst.concat(lst);
	},
	'list': function(lst) {
		return lst
	},
	'car': function(lst) {
		return lst[0];
	},
	'cdr': function(lst) {
		return lst.slice(1);
	},
	'cons': function(a, lst) {
		return [a].concat(lst);
	}	
};