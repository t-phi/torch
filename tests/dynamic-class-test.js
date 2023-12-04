const jsonObj = {
    constructor: {
        name: "someName",
    },
    getter: {
        function1: () => "someOutput",
        function2: () => false,
    }
}


function baseClass(obj) {
  for(i in obj){
    this[i] = obj[i];
  }
}

const handler = {
  construct(target, args) {
    return new target(jsonObj.constructor);
  }
};

const NewClass = new Proxy(baseClass, handler);
var obj = new NewClass(jsonObj);
console.log(obj);

console.log( obj.function1() );
