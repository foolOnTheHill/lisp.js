function toString(exp) {
	if (exp instanceof Array) {
		var formattedExprs = exp.map(toString);
		var res = '(' + formattedExprs.join(' ') + ')';
		return res;
	} else {
		return String(exp);
	}
}
