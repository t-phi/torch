class ValidationObject{

      constructor( ){
      }


      copy(){
      	     return new this.constructor(this);
      }


      test(test_string)
      {
         return false;
      }


}

module.exports = ValidationObject;
