const os = require("os");

class LogElement
{
     constructor(input)
     {
        let component,  code,  description, data, user_context;

        if((typeof input == "Object") || (typeof input == typeof this))
        {
          ({component,  code,  description, data, user_context} = input);
        }
         else {
          description = input;
         }


         this.sessionToken    = "_______";
         this.component       = component   || "";
         this.code            = code        || "";
         this.description     = description || "";
         this.user_context    = user_context || new Map();
         this.data            = data     || new Map();
         this.currentDate     = "____-__-__";
         this.currentTime     = "__:__:__.___";
         this.currentTimeZone = "(__:__)";

         this.hostname    =  os.hostname();
         this.networkInterfaces = os.networkInterfaces();
         this.macs = this.getMACs() || ["__:__:__:__:__:__"];
         this.setTime();

console.log(`data: ${this.data}`);

         if( typeof this.data != "Map")
            this.data = new Map(Object.entries(this.data));
console.log(`data: ${this.data}`);


        if( typeof this.user_context != "Map")
               this.user_context = new Map(Object.entries(this.user_context));
         //myHostAddress = InetAddress.getByName("localhost").getHostAddress();

     }

     levels()
     {
       return ["", "ALARM", "ERROR", "WARN", "INFO", "DEBUG", "DEBUG2"];
     }



     //return the current level that the caller wants to log
     getLevel(){  this.level;     }
     getMACs()
     {
       var results = [];

       var interfaces = Object.values(this.networkInterfaces);

       interfaces.forEach( (interface_) => {
         interface_.forEach( (connection) => {

              results.push( connection.mac );
         })
       });

      return results;
     }
     setToken( token ) {   sessionToken = token;   }

     setTime(){
         var rightNow = new Date();

         this.currentDate       = this.calculateCurrentDate(rightNow);
         this.currentTime       = this.calculateCurrentTime(rightNow);
         this.currentTimeZone   = this.calculateCurrentTimeZone(rightNow);

     }


     calculateCurrentTimeZone( rightNow )
     {
         var result = "";
         var tz_min = rightNow.getTimezoneOffset();
         var tz_hour = Math.floor(tz_min / 60);
         var tz_min  = tz_min % 60;
         var tz_sign = (tz_min < 0)? "-" : "+" ;

         var tz_hour = (Math.floor(tz_hour) < 10)? "0" + tz_hour : "" + tz_hour;
         var tz_min  = (Math.floor(tz_min)  < 10)? "0" +  tz_min :  "" + tz_min;


         result = `${tz_sign}${tz_hour}:${tz_min}`;
         return result;

     }



     calculateCurrentTime(  rightNow )
     {
              var result = "";

         var iHour        = rightNow.getHours()
         var iMinute      = rightNow.getMinutes()
         var iSecond      = rightNow.getSeconds()
         var iMillisecond = rightNow.getMilliseconds();

         var sHour    = (iHour < 10)?   "0" + iHour : "" + iHour;
         var sMinute  = (iMinute < 10)? "0" + iMinute : "" + iMinute;
         var sSecond  = (iSecond < 10)? "0" + iSecond : "" + iSecond;

         var sMillisecond = "";
         if( iMillisecond < 10)   sMillisecond = "00" + iMillisecond;
         else if( iMillisecond < 100)  sMillisecond = "0" + iMillisecond;
         else sMillisecond = "" + iMillisecond;

         result = "" + sHour + ":" + sMinute + ":" + sSecond + "." + sMillisecond;
         return result;
     }

     calculateCurrentDate( rightNow )
     {

         const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
         return rightNow.toLocaleDateString('en-CA', options);
     }

     #encode( oldString )
     {
               // if spaces, then quote
               // if commas then quote
               // replace " with ""
               // replace \ chars with \\
               // replace \n chars with \\n
               var newString;
               newString = "\"" + oldString + "\"";
               return newString;
     }


    toJSON(){

      var user_context = {};
      var data = {};
      if(this.user_context != null)
        user_context = Object.fromEntries(this.user_context);

        if(this.data != null)
        {
          data = Object.fromEntries(this.data);
        }



      var obj = {
        component: this.component,
        code: this.code,
        description: this.description,
        user_context: user_context,
        data: data
      };
      return obj;
    }


    toString(){

      var output = "";
      output = this.currentDate;
      output += "," + this.currentTime;
      output += ",(" + this.currentTimeZone + ")";

      //output += "," + myHostName;
      //output += "," + myHostAddress;

      output += ","   + this.sessionToken;
      output += ","   + this.levels()[this.level];
      output += ","   + this.hostname;
      output += ",["   + this.getMACs() + "]";
      output += ","   + this.#encode(this.component);
      output += ",["  + this.#encode(this.code) + "]";
      output += ","   + this.#encode(this.description);
      output += ",(";
      this.options.forEach( (key, value)=>{
          output += this.#encode(key) + "=" + this.#encode(value) + ",";
      });
      output += ")";

      output += "\n";
      return output;
    }

};




module.exports = LogElement;
