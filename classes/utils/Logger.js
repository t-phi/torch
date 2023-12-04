const os = require("os");

const winston = require("winston");
const { combine, timestamp, label, printf, json } = winston.format;
const LogElement = require("./LogElement.js");
class Logger
{

    setLoglevel(level)
    {
      this.level = level;
    }

    constructor({filename, token, level, transports, user_context} )
    {
    	this.filename    = filename || "";
    	this.token       = token || "";
      this.level       = level || "silly";
      this.transports  = transports || [];
      this.hostname    =  os.hostname();
      this.networkInterfaces = os.networkInterfaces();
      this.macs = this.getMACs() || ["__:__:__:__:__:__"];
      this.IPs = this.getIPs() || ["___.___.___.___"];
      this.component = "";
      this.user_context = user_context || {};



      const myFormat = printf(({ level, message, label, timestamp }) => {

        var line, component,code, session, key;
        if(message.component != null)
        {
            component =`${message.component}`;
            delete message.component;
        }
        if(message.code != null)
        {
            code = `${message.code}`;
            delete message.code;
        }

        component ||= this.component;

        line =  `${timestamp},[${this.hostname}:[${this.IPs}]:[${this.macs}]],[${level}],(${component}),(${code}),"${message.description}",`;
        delete message.description;

        if(message.data.size==0)
        {
          delete message.data;
        }

        line += JSON.stringify(message);
        return line;
      });
      if(this.transports.length == 0)
      {
          if(this.filename == "")
          {   this.transports = new winston.transports.Console()         }
          else
          {   this.transports = new winston.transports.File({ filename: filename })       }
      }

      this.logger = winston.createLogger({
        level: this.level,
        format: winston.format.combine(
          timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS (Z)'}),
          myFormat,
          //winston.format.align(),
          //json(),
        ),
        transports: this.transports,
      });

    }
    setComponent(component)
    {
      this.component = component;
    }
    getIPs()
    {
      var results = [];

      var interfaces = Object.values(this.networkInterfaces);

      interfaces.forEach( (interface_) => {
        interface_.forEach( (connection) => {
             if((connection.address != "127.0.0.1") && (connection.address != "::1"))
                results.push( connection.address );
        })
      });

     return results;
    }
    getMACs()
    {
      var results = [];

      var interfaces = Object.values(this.networkInterfaces);

      interfaces.forEach( (interface_) => {
        interface_.forEach( (connection) => {
             if(connection.mac != "00:00:00:00:00:00")
                results.push( connection.mac );
        })
      });

     return results;
    }

    error(input){ input.user_context ||= this.user_context;   this.logger.error( new LogElement(input));}
    warn(input){ input.user_context ||= this.user_context;    this.logger.warn( new LogElement(input));}
    info(input){ input.user_context ||= this.user_context;    this.logger.info( new LogElement(input));}
    verbose(input){ input.user_context ||= this.user_context; this.logger.verbose( new LogElement(input));}
    debug(input){ input.user_context ||= this.user_context;   this.logger.debug( new LogElement(input));}
    silly(input){ input.user_context ||= this.user_context;   this.logger.silly( new LogElement(input));}


/*

    // open file output for each write to avoid log entries crossing each other in heavy load situations.
    log(le) {
   	  try{
             if (le.getLevel() <= loglevel)
             {
               fs()
               var out = new DataOutputStream(new FileOutputStream(
                   fileName, true));
               String output = "";

               le.setToken(token);
               out.writeBytes(le.toString());
             }
             else {}

    	  }
    	  catch(e)
    	  {
    	  }

    }
*/

}

module.exports = Logger;
