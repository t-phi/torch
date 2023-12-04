let crypto = require('node:crypto');
class GenerateID{

   static getID( length ) {
         let result = new Uint8Array(length || 10);
         crypto.getRandomValues(result);

         return this.hexEncode(result) ;
   }
    
   
   // Encode bytes as hex, from Java in a Nutshell by David Flanagan  
   static hexEncode( byte_buffer){
        return Buffer.from(byte_buffer).toString('hex');
   }
}


module.exports = GenerateID;