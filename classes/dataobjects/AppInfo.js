class AppInfo {
      constructor( {name, language, pageflow,  templates,  fieldnames,  validations,  restCalls, permissions, permissionCheck} ){
      	    this.name             = name            || "";
            this.language         = language        || "";
            this.pageflow         = pageflow        || "";
            this.templates        = templates       || "";
            this.fieldnames       = fieldnames      || "";
            this.validations      = validations     || "";
            this.restCalls        = restCalls       || "";
            this.permissions      = permissions     || "";
            this.permissionCheck  = permissionCheck || false;
      }

      setPermissions( name){ this.permissions = name;      }

      setPermissionCheckOn(b){ this.permissionCheck = b || false;      }

      isPermissionCheckOn(){  return this.permissionCheck;      }

        getName(){ return this.name; }
        getLanguage(){ return this.language; }
        getPageflow(){     return this.pageflow;     }
        getTemplates(){    return this.templates;    }
        getFieldnames(){   return this.fieldnames;   }
        getValidations(){  return this.validations;  }
        getRESTCalls(){    return this.restCalls;    }
        getPermissions(){  return this.permissions;  }

      toString(){
       		var result = "";
       		if(this.permissionCheck)
       			result += "permissionCheck=on, ";
            result += "name=" + this.getName() + ", ";
            result += "language=" + this.getLanguage() + ", ";
       		result += "pageflow=" + this.getPageflow() + ", ";
       		result += "templates=" + this.getTemplates() + ", ";
       		result += "fieldnames=" + this.getFieldnames() + ", ";
       		result += "validations=" + this.getValidations() + ", ";
       		result += "restCalls=" + this.getRESTCalls() ;
       		if(this.permissions != null)
       			result += ", permissions=" + this.getPermissions();
       		return result;

      }


      copy()
      {
      	   var appInfo = new AppInfo(this);
      	   return appInfo;
      }

}

module.exports=AppInfo;
