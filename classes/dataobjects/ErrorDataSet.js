class ErrorDataSet {

   constructor({data}){  // allow for array of values as an alternative?
     this.data = data || [];
   }


   add(anElement){
       this.data.push(anElement);
   }

   size(){
   	   return this.data.length();
   }

   get(i){
   	return  data[i];
   }


   toString(){
      return this.data.join();
   }

   copy(){
     var obj = {data: []};
     this.data.forEach( (element) => {
        obj.data.push( element.copy() );
     })
      return new this.constructor(obj);
   }



}
module.exports = ErrorDataSet;
