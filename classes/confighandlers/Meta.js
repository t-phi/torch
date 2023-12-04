class Meta {

      constructor(json){
        const allowed_vars = ["type", "version", "servicetype", "tenant_root", "config_type"];
        allowed_vars.forEach((item, i) => {
          this[item] = json[item];
        });

        if( this.type == null)
        {
          throw "No type attribute set in meta data of config. Must be dædalus.";
        }

        if (this.type != "dædalus")
          if (this.type.toUpperCase() != "DAEDALUS")
          {
              throw `Invalid type attribute set in meta data of config (${this.type}). Must be dædalus.`;
          }

      }

      getType(){ return this.type; }
      getVersion(){ return this.version; }
      getServiceType(){ return this.servicetype; }
      getTenantRoot(){ return this.tenant_root; }
      getConfigType(){ return this.config_type; }



      toString(){
     		var result = "";
        result += "type=" + this.getType()     + ", ";
        result += "version=" + this.getVersion()     + ", ";
        result += "servicetype=" + this.getServiceType()     + ", ";
        result += "tenant_root=" + this.getTenantRoot()     + ", ";
        result += "config_type=" + this.getConfigType()     + ", ";
     		return result;
      }


      copy(){
      	   return new Meta( this );
      }

      toJSONObject()
      {

        var obj = {

          type: this.type,
          version: this.version,
          servicetype:  this.servicetype,
          tenant_root: this.tenant_root,
          config_type: this.config_type,
        };
        return obj;
      }

      toJSON()
      {
          return JSON.stringify(this.toJSONObject());
      }


}

module.exports = Meta;
