var CustomerBrand = require("../../dataobjects/CustomerBrand.js");

class CustomerBrandsSet {

	constructor( json ){
		this.data = new Map(); // 2D map using name and language as keys
		this.import(json);
	}

	import( json ) {
		/// keys are brands, values are objects with keys as language, and values as location appname keys

				for( const name in json)
				{
					for( const language in json[name]  )
					{
						 const obj = json[name][language];
						 const location = obj.location;
						 const file     = obj.apps_config;
						 this.add(  new CustomerBrand({name: name, lang: language, cfg: `${location}/${file}`})  );

					}
				}
   }



    getByKeys(name, language)
		{
       var obj = this.data.get(name);
			 if( obj == null)
			 		return null;
			 return this.data.get(name).get(language);
    }


   add( customerBrand )
	 {
		  const name = customerBrand.name;
			const language = customerBrand.lang;

			var obj = this.data.get(name);
			if (obj == null)
				this.data.set(name,  new Map());
			this.data.get(name).set(language,  customerBrand);
   }



   toString()
	 {
		 		var tmp = "";
		 		this.data.forEach( (map1, name )=> {
						map1.forEach( (customerBrand, language ) => {
							tmp += customerBrand.toString() + "\n";
						})
				});
		   	return tmp;
   }

}

module.exports = CustomerBrandsSet;
