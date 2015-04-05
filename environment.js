;(function(exports) {

	var Hash = function() {
		this.map = {};
		
		this.set = function(key, value) {
			this.map[key] = value;	
		};
		
		this.find = function(key) {
			return this.map[key];
		};

		this.hasKey = function(key) {
			return this.map.hasOwnProperty(key);
		};

	};

	var Environment = function() {
		this.map = new Hash();
		this.outer = null;

		this.find = function(symbol) {
			if (this.map.hasKey(symbol)) {
				return this.map.find(symbol);
			} else if (this.outer !== null){
				return this.outer.find(symbol);
			} else {
				return undefined;
			}
		};

		this.update = function(lib) {
			for (key in lib) {
				if (lib.hasOwnProperty(key)) {
					this.map.set(key, lib[key]);
				}
			}
		};

		this.set = function(key, value) {
			this.map.set(key, value);
		}

	};

	exports.Environment = Environment;

})(typeof exports === 'undefined' ? this : exports);