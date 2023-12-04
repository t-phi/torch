class CustomerBrand {

	constructor({ name, lang, cfg }){
		this.name = name || "";
		this.lang = lang || "";
		this.cfg  = cfg || "";
	}

  toString()
	{
		var tmp = "";
		tmp +=  "name=" 		+ this.name + ", ";
		tmp +=  "lang=" + this.lang + ", ";
		tmp +=  "cfg=" 	+ this.cfg;
		return tmp;

	}

	name(){ return name; }
	language() { return lang; }
	config() { return cfg; }

	copy()
	{
			 var obj = new CustomerBrand(this);
			 return obj;
	}
}

module.exports = CustomerBrand;
