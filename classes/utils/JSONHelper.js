/*** Produced by Philippe Beauchamp based on previous work attributed to him prior to TELUS ***/


class JSONHelper {


/*
    static get(url) {
        this.url = url;
        this.json;

        import mod from url assert { type: 'json' };
        this.json = mod;
    }
*/


   static load(filename)
   {
     const fs = require('fs');

     let rawdata = fs.readFileSync(filename);
     let json = JSON.parse(rawdata);
     return json;
   }

   static write(json, filename)
   {
      var fs = require('fs');
      fs.writeFile(filename, JSON.stringify(json, null, 4));
   }

    static string2JSON(string)
    {
      return JSON.parse(string);
    }



    /*
        recursiveGetProperty(yourObject, '_events', function(obj) {
            // do something with it.
        });
    */
    recursiveGetProperty(obj, lookup, callback) {
        for (property in obj) {
            if (property == lookup) {
                callback(obj[property]);
            } else if (obj[property] instanceof Object) {
                recursiveGetProperty(obj[property], lookup, callback);
            }
        }
    }



    /*
    a string
    a number
    an object (JSON object)
    an array
    a boolean
    null
    */

    static processJSON( parameters)
    {
      var {json, nullFunction, scalarFunction, arrayFunction, arrayElementFunction, objectFunction, objectPairFunction}  = parameters

      if( json == null )
      {
        if(nullFunction != null) nullFunction(json);
      }
      else if( (typeof json == "string") || (typeof json == "boolean") || (typeof json == "number"))
      {
        if(scalarFunction != null) scalarFunction(json);
      }
      else if( Array.isArray(json))
      {
        if(arrayFunction != null) arrayFunction(json);
        json.forEach( (value) => {
          if(arrayElementFunction != null) arrayElementFunction(value);
          parameters.json=value;
          this.processJSON(parameters);
        });
      }
      else if( typeof json == "object")
      {

          if(objectFunction != null) objectFunction(json);
          Object.keys(json).forEach( (key) => {
            var value = json[key];
            if(objectPairFunction != null) objectPairFunction(key,value);
            parameters.json=value;
            this.processJSON(parameters);

          });
      }

    }

}



module.exports = JSONHelper;

/*
function main()
{
    json = {
      a: ['A','B','C',{d:'e'},,'F'],
      b: {E: 'e', F: 'f', g: [1,2,3,4,5]},
      c: 'C',
      d: {'':'Z','': ''},
    };

    JSONHelper.processJSON({
      json: json,
      arrayFunction:        (json)=>{console.log("array")},
    //  objectFunction:       (json)=>{console.log("object")},

      nullFunction:         (json)=>{console.log("null")},
      scalarFunction:       (value)=>{console.log("SCALAR(" + value + ")")},

      arrayElementFunction: (value)=>{console.log("arrayelement")},
      objectPairFunction:   (key, value)=>{console.log(`${key}: `)},
    });
    //console.log();

}


main();
*/
