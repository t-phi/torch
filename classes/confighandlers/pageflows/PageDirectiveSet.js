
let PageDirectiveTask = require("../../dataobjects/PageDirectiveTask.js");

class PageDirectiveSet {


   constructor(page_id, decision_id, json){

    this.data = new Map();

    // Reuse page directive for init actions, so init action could be a list of action, localAction, soapcall or validation.
    this.initActions = null;
   	let initNode = null;
   	
   	let startDecision = decision_id;
   	let pageID = page_id || "";


   	for(let  i=0; i < json.getLength(); i++)
   	{ 
   		let tmp          = nl.item(i);
   		
   		if( tmp.getNodeName().equals("decision") )
   		{
   		   this.processDecision( tmp );
   		}
   		else if ( tmp.getNodeName().equals("initActions") )
   		{
   			initNode = tmp;
    	}
   		
   	}
   	
   	if ( initNode != null )
   		initActions = new PageDirective( "initActions", "initActions", "", "", "", "", initNode.getChildNodes() );
	
   	if( startDecision == null) { startDecision = "" ; }
   }	

   getStartDecision(){ return this.startDecision; }
   getPageID(){ return this.pageID; }

   private void processDecision(Node n){
        NamedNodeMap tmp2 = n.getAttributes();
   	if (tmp2 != null )
   	{
   		
   		
           String next = "";
           String nextState = "";
           String nextTrue = "";
           String nextFalse = "";
           String name = "";


           
   	   Node tmp3         = tmp2.getNamedItem("next");
  	   if (tmp3 != null)
     	       next       = tmp3.getNodeValue();
     	      
    	   Node tmp4         = tmp2.getNamedItem("nextState");
  	   if (tmp3 != null)
   	       nextState       = tmp4.getNodeValue();


   	   Node tmp5         = tmp2.getNamedItem("nextTrue");
   	   if (tmp5 != null)
   	       nextTrue       = tmp5.getNodeValue();


   	   Node tmp6         = tmp2.getNamedItem("nextFalse");
  	   if (tmp6 != null)
   	       nextFalse       = tmp6.getNodeValue();

   	   Node tmp7         = tmp2.getNamedItem("id");
  	   if (tmp7 != null)
     	       name       = tmp7.getNodeValue();

   	   
   	   NodeList children = n.getChildNodes();	
   	   
   	   
   	   add(  new PageDirective( "decision", name, next, nextTrue, nextFalse, nextState, children )  );
   	}

   }
   
  


   public int size(){
   	return data.size();
   }
   
   public PageDirective get(int i){
        return  (PageDirective) data.get(i);   	
   }

   public PageDirective get(String aKey){
        for( int i=0; i < data.size(); i++)
        {
           	PageDirective tmp = (PageDirective) data.get(i);
           	if (tmp != null)
           	{
           		if (tmp.getID().equals(aKey) )
           		{ return tmp; }
           	}
        }
        return null;
   }

   
   
   public void add(PageDirective anElement){
       data.add(anElement);	
   }
   
   
   
   public String toString(){
   	String result = "";
   	
   	for(int i=0; i < data.size(); i++)
   	{
   		result += "startDecision: " + startDecision + "\n";
   		PageDirective info = get(i);
   		result += info.toString();
   		result += "\n\n";
   	}
   	return result;
   }
   

    
	public PageDirective getInitActions() {
		return this.initActions;
	}
	public void setInitActions(PageDirective initActions) {
		this.initActions = initActions;
	}
}