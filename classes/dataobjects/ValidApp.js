class ValidApp {

	constructor({name}){
		this.name = name;
	}

	toString()
	{
		return "name=" + this.name;
	}


	name(){
		   return this.name;
	}

	copy(){
	    return new ValidApp( this );
	}


	toJSONObject()
	{

		var obj = {
			name:               this.name              ,
		};
		return obj;
	}

	toJSON()
	{
			return JSON.stringify(this.toJSONObject());
	}

}
module.exports = ValidApp;
