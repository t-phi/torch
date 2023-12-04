let Info = require("./Info.js");

//var ShortDAOSet = require("./ShortDAOSet.js");
class ShortDAO {

	/*
	** shortDAO is a recursive data type
	**  - Each node is of type shortDAO.
	**  - Each node contains a name, value, displayValue, and type
	**  - Each node may have a set of children which are all shortDAO nodes.
	**  - Order of the children is preserved
	**
	** Data is expected to be assigned and read only, then the object is deleted.
	** Manipulation of the data structure is not optimal.
	*/
	constructor( info )
	{
		if( ! (info instanceof Info) )
			info = new Info(info);
		this.info         = info || new Info();
		this.children     = new ShortDAOSet();
	}


	/*
						public ShortDAO( Node anXMLNode )
						{
						     info = new Info( anXMLNode);

						     if(  info.isValidType() )
						     { children = new ShortDAOSet( anXMLNode.getChildNodes() ); }
						}


						public void setChildren( Node anXMLNode )
						{
						     if(  info.isValidType() )
						     { children = new ShortDAOSet( anXMLNode.getChildNodes() ); }
						}

						public void setChildren( NodeList anXMLNodeList )
						{
						     if(  info.isValidType() )
						     { children = new ShortDAOSet( anXMLNodeList ); }
						}

*/
	setChildren( children )
	{
			if( typeof children === typeof this.children )
				this.children = newChildren;
	}

	addChild( child )
	{
		if (typeof child === typeof this)
				this.children.addNode( child );
	}

	add(  aKey, aChild )	{	this.children.add( aKey, aChild );	}



	hasChildren()	{		return (this.children.size() > 0);		}
	isValidType(){	  return this.info.isValidType();       }
	isViewable(){     return this.info.isViewable();        }
	size()	{					return this.children.size();						}

	getChildren()	{	        				return this.children;										}
	getChildStringByIndex(index){		return this.children.getString(index);	}
	getChildStringByKey(aKey){			return this.children.getString(aKey);		}
	getChildByIndex(index){					return this.children.getByIndex(index);				}
	getChildByKey(aKey){						return this.children.getByKey(aKey);					}

  getName() {        							return this.info.getName();        			}
  getValue() {        						return this.info.getValue();        		}
  getDisplayValue() {        			return this.info.getDisplayValue();     }
  getDescription(){               return this.info.getDescription();      }
  getViewSetting(){        				return this.info.getViewSetting();      }
  getType() {        							return this.info.getType();        			}


  setValue(  aValue ) {             this.info.setValue( aValue );        }
  setName( aName ) {             		this.info.setName( aName );                     }
  setDisplayValue( aLabel ){        this.info.setDisplayValue( aLabel );        }
  setDescription( aDescription ){   this.info.setDescription( aDescription );        }
  setViewSetting( setting ){        this.info.setViewSetting( setting );        }



	toString()
	{
		var result = "";
		result += "Info: "         + this.info.toString()          + "\n";
		result += "CHILDREN: {"  + this.children.toString() + "}\n\n";
		return result;
	}

	toJSONObject()
	{

		var obj = {
			info: this.info.toJSONObject(),
			children: this.children.toJSONObject(),
		};
		return obj;
	}

	toJSON()
	{
			return JSON.stringify(this.toJSONObject());
	}

	/*
						public String toXML()
						{
							String result = "";

							if (getType().equals(""))
							{
							    result += getValue();
							}
							else
							{
							   result += "<" + getType() + " ";
							   result +=    "name=\"" + getName() + "\" ";
							   result +=    "value=\"" + getValue() + "\" ";
							   result +=    "displayValue=\"" + getValue() + "\" ";
							   result +=    "description=\"" + info.getDescription() + "\" ";
							   result +=    "viewSetting=\"" + info.getViewSetting() + "\" ";
							   result +=    "hasOptions=\"" + ((hasChildren())?"true":"false") + "\" ";
							   result +=    ">";
							   result +=    children.toXML();
							   result +=    "</" + getType() + ">";
						        }
							return result;


						}

						public String toXMLIfViewable()
						{
							String result = "";

							if( this.info.isViewable() )
							{
							      if (this.getType().equals(""))
							      {
							          result += getValue();
							      }
							      else
							      {
							         result += "<" + XMLHelper.encode(getType()) + " ";
							         result +=    "name=\"" + XMLHelper.encode(getName()) + "\" ";
							         result +=    "value=\"" + XMLHelper.encode(getValue()) + "\" ";
							         result +=    "displayValue=\"" + XMLHelper.encode(getDisplayValue()) + "\" ";
							         result +=    "description=\"" + XMLHelper.encode(info.getDescription()) + "\" ";
							         result +=    "viewSetting=\"" + XMLHelper.encode(info.getViewSetting()) + "\" ";
							         result +=    "hasChildren=\"" + ((hasChildren())?"true":"false") + "\" ";
							         result +=    ">";
							         result +=    children.toXMLIfViewable();
							         result +=    "</" + getType() + ">";
						              }
						        }
							return result;


	}

*/
	copy()
	{
			//return structuredClone(this);

	        var copy = new ShortDAO( this.info.copy() );
					var size = this.size();
	        for(var i=0; i < this.size(); i++)
	        {
	                copy.addChild( this.getChildByIndex(i).copy() );
	        }
	        return copy;

	}


  type() {return this.constructor.name};


}



////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


//var ShortDAO = require("./ShortDAO.js");
//var Info		 = require("./Info.js");

class ShortDAOSet {

	constructor(json)	{
		//this.data = new Map(); // replace 3 structures below with basic javascript map since it uses indexes and keys and preserves order already
		//... map only allows one item per key... not sure if that will work... yes it's ok on this object

		/// nope... map only has iterator for looking up by index... not as efficient as having an array to lookup position

		this.hDataValue = {}; //new Map(); // maps aren't json stringifiable
		this.hDataIndex = {}; //new Map();
		this.vDataKeys  = [];

		if( json == null)
				return;

		if(typeof json == "string")
				json = JSON.parse(json);
	}


	/*
	    for(int i=0; i < anXMLNodeList.getLength(); i++)
	    {
	        Node currentNode = anXMLNodeList.item(i);
	        NamedNodeMap myNodeMap = currentNode.getAttributes();
	        String fileName = "";
	        if (currentNode.hasAttributes())
	        {
	        	try
	        	{
	        		fileName = myNodeMap.getNamedItem("externalRead").getNodeValue();
	        		myNodeMap = readExternalParams(myNodeMap, fileName);
	        	}
	        	catch (Exception e)
	        	{
	        		//System.out.println("Unable to access externalRead attribute");
	        	}

	        }
	    		ShortDAO tmp = new ShortDAO(  anXMLNodeList.item(i) );
	        if( tmp.isValidType() )
	        {
	  				add( tmp );
		    	}
		    	else
		    	{
		          //need to determine type of node. If it is a value, and not a node, then add a string to the children.
		                  // otherwise add the subnodes.

		    	}



			}
			*/





	/*
		private NamedNodeMap readExternalParams(NamedNodeMap myNodeMap, String fileName)
		{

			try
			{
				NodeList importedNode = XMLHelper.getNodeList("IAU", fileName);


				for (int x=0; x < myNodeMap.getLength(); x++)
				{
					String currentNodeValue = myNodeMap.item(x).getNodeValue();

					if (currentNodeValue.indexOf("/IAU")>=0)
					{
						myNodeMap.item(x).setNodeValue(XPathAPI.selectSingleNode(importedNode.item(0), currentNodeValue).getFirstChild().getNodeValue());
					}
				}
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			return myNodeMap;
		}
	*/



		_add(key, value)
		{
			this.vDataKeys.push(key);
			this.hDataValue[key] = value;
			this.hDataIndex[key] =  ""+(this.vDataKeys.length -1);
		}

		add(parameters)
		{
				var name;
				var value;
				var obj;

				if( parameters instanceof Info)
				{
					parameters = new ShortDAO(parameters);
				}
				if( parameters instanceof ShortDAO)
				{
						obj = parameters;
						name = obj.getName();

						this._add(name, obj); // store given object
				}
				else{
					({name, value} = parameters);
					obj = new ShortDAO( parameters ); // convert to ShortDOA as standard object
					if( name != null)
							this._add(name, obj);
				}
		}

/*
								add(String aKey, String aValue){

								      if( this.hDataIndex.get( aKey ) == null )   // This is a new element
								      {
											    this.vDataKeys.add(aKey);
											    this.hDataValue.put(aKey, aValue);
											    this.hDataIndex.put( aKey,  ""+(vDataKeys.size() -1) );
											}
											else   // This is an element with a key that already exists. Update the value.
											{// don't need to update indices since they will remain the same.
									        	this.hDataValue.put(aKey, aValue);
											}

								}


								public void add( ShortDAO aNode ){

								        if( hDataIndex.get( aNode.getName() ) == null )   // This is a new element
								        {
									    vDataKeys.add(aNode.getName());
									    hDataValue.put(aNode.getName(), aNode);
									    hDataIndex.put( aNode.getName(),  ""+(vDataKeys.size() -1) );
									}
									else   // This is an element with a key that already exists. Update the value.
									{
									        // don't need to update indices since they will remain the same.
									        hDataValue.put(aNode.getName(), aNode);
									}

								}

*/

		getStringByIndex(index)
		{
			var aKey = this.vDataKeys[index];
			if (aKey == null) return null;
			return this.getStringByKey(aKey);
		}


		getStringByKey(aKey)
		{
			var obj =  this.hDataValue[aKey];
			if( obj != null)
			{
			    if( typeof obj == "string" )
			    	return obj;

					if( typeof obj == "ShortDAO" )
			    	return obj.getValue();
			}
			return "";
		}


		getByIndex( i )
		{
			if( i == null) 		return null;

			var aKey =  this.vDataKeys[i];

			if (aKey == null) return null;

			return this.getByKey(aKey);

		}


		getByKey( aKey)
		{
			if( aKey == null)
				return null;

			var obj =  this.hDataValue[aKey];
			if( obj != null )
			{
			    if( typeof obj == "string" )		    /// if stored value is a string always return a ShortDAO
			    	return new ShortDAO( { type: "", name: aKey, value: obj, displayValue: obj, description: obj, viewable: "true" } );

					if(  obj instanceof ShortDAO )
			    	return obj;
			}
			return null;
		}


		size()
		{
			return this.vDataKeys.length;
		}


		toString()
		{
			var  result = "";

			for(var i=0; i < this.size();  i++)
			{
				result += "["+i+"] { "
				result += this.getByIndex(i).toString();
				result += "} \n\n";
			}
			return result;

		}

/*
		toXML()
		{
			var  result = "";
			for(var i=0; i < this.size();  i++)
			{
				result += this.getByIndex(i).toXML();
			}
			return result;

		}
*/

		toXMLIfViewable()
		{
			var  result = "";
			for(var i=0; i < this.size();  i++)
			{
				result += this.getByIndex(i).toXMLIfViewable();
			}
			return result;

		}


		merge( input )
		{
			if( typeof input != typeof this)
				return null;

			var selfCopy  = this.copy();
			var inCopy 		= input.copy();

			for(var i=0; i < inCopy.size(); i++)
			{
				selfCopy.add( inCopy.getByIndex(i) ); // doesn't this assume that each element is a ShortDAO?
			}
			return selfCopy;

		}


		copy(){ // use builtin structuredClone function?

//				return structuredClone(this);

					     var copy = new ShortDAOSet();

					     for(var i=0; i < this.size(); i++)
					     {
					        copy.add( this.getByIndex(i).copy() ); // doesn't this assume that each element is a ShortDAO?
					     }

					     return copy;
		}


		toJSONObject()
		{
				var obj = [];

				for(var i=0; i < this.size(); i++)
				{
					 obj.push( this.getByIndex(i).copy().toJSONObject() ); // doesn't this assume that each element is a ShortDAO?
				}
				return obj;
		}

		toJSON()
		{
				return JSON.stringify( this.toJSONObject() )
		}



}


module.exports = {ShortDAO, ShortDAOSet};
