h = require ('handlebars');

//https://nodejs.dev/en/learn/reading-files-with-nodejs/

fs = require('fs');
var json_string;
var template_string;
fs.readFile('C:/PHIL/Programming/Javascript/telus/classes/samplepage.json', 'utf8', (err,data) => {
  if (err) throw err;

  console.log("DATA: " + data);
  var json = JSON.parse(data);


  fs.readFile('C:/PHIL/Programming/Javascript/telus/classes/sampletemplate.handlebars.template', 'utf8', (err2, data2) => {
    if (err2) throw err2;
    template_string = data2;

    var template = h.compile(template_string);
    console.log(template(json));
  });
});
