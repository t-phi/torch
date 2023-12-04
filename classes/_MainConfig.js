class MainConfig{
  constructor(input) {

     if( typeof input == "object" )
     {
       this.va = new ValidAppSet();
     }

  }
}


package com.bce.emergis.shortcircuitframework.confighandlers;

import com.bce.emergis.shortcircuitframework.confighandlers.mainconfig.*;
import com.bce.emergis.shortcircuitframework.utils.*;


import java.util.*;

import org.w3c.dom.*;

import com.bce.emergis.shortcircuitframework.confighandlers.mainconfig.CustomerBrandsSet;
import com.bce.emergis.shortcircuitframework.confighandlers.mainconfig.ValidAppsSet;




public class MainConfig {
   ValidAppsSet va;
   CustomerBrandsSet cb;
   String cfg;





   public MainConfig(String aFileName){

	  NodeList nl1 = XMLHelper.getNodeList("application", aFileName) ;
	  NodeList nl2 = XMLHelper.getNodeList("customer", aFileName) ;

	  va = new ValidAppsSet(nl1);
	  cb = new CustomerBrandsSet(nl2);
    }

    public String getBrandConfig(String aLanguage, String aBrand){
       return cb.getBrandConfig( aLanguage, aBrand);
    }


    public boolean isValidApp(String appName){
    	return va.isValidApp( appName );
    }

    public String toString(){
   	String tmp = "";
   	tmp += "Valid Applications\n" + va.toString();
   	tmp += "\n";
   	tmp += "Customer Brands\n" + cb.toString();
   	tmp += "\n";
   	return tmp;
   }
   public Vector getValidApps(){
   	return va.appList();
   }



}
