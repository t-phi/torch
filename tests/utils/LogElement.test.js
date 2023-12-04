var LogElement = require("../../classes/utils/LogElement.js");

console.log("test");

var le = new LogElement( {
          level: 5,
          component: "thi.part.here",
          code: "code",
          description: "this is a description of things",
          options: {a: 'a', b: 'b'}
      });


console.log(le.toString());
