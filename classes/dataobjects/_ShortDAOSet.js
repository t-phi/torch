
var ShortDAO = require("./ShortDAO.js");
var Info		 = require("./Info.js");

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
				result += this.getByIndex(i);
				result += "";
			}
			return result;

		}

		toXML()
		{
			var  result = "";
			for(var i=0; i < this.size();  i++)
			{
				result += this.getbyIndex(i).toXML();
			}
			return result;

		}


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
				selfCopy.add( inCopy.get(i) ); // doesn't this assume that each element is a ShortDAO?
			}
			return selfCopy;

		}


		copy(){ // use builtin structuredClone function?


				return structuredClone(this);

					     var copy = new ShortDAOSet();

					     for(var i=0; i < this.size(); i++)
					     {
					        copy.add( this.get(i).deepCopy() ); // doesn't this assume that each element is a ShortDAO?
					     }

					     return copy;

		}




}

module.exports = ShortDAOSet;
