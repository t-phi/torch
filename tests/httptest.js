const https = require('https');

console.log("hello");

let request = https.get('https://jsonplaceholder.typicode.com/users?_limit=2', (res) => {
    if (res.statusCode !== 200) {
      console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
      res.resume();
      return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
        console.log("DATA CHUNK: [" + chunk + "]");
    });

    res.on('close', () => {
      console.log('Retrieved all data: ' + data);
      var people = new People(JSON.parse(data));
      console.log(people);
    });
});


class People {
  constructor(peopleArray) {
    this.people = [];
    peopleArray.forEach( (personData) => {
        this.people.push( new Person(personData) );
    });
  }
}
class Person {
  constructor({id, name, username, email, address, phone, website, company}) {
    this.id  = id;
    this.name  = name;
    this.username  = username;
    this.email  = email;
    this.address  = new Address(address);
    this.phone  = phone;
    this.website  = website;
    this.company  = new Company(company);
  }
}


class Company{
  constructor({name, catchPhrase, bs}) {
    this.name         = name;
    this.catchPhrase  = catchPhrase;
    this.bs           = bs;
  }

}


class Address{
  constructor({street, suite, city, zipcode, geo}) {
    this.street     = street;
    this.suite      = suite;
    this.city       = city;
    this.zipcode    = zipcode;
    this.geo        = new Geo(geo);

  }
}


/*
"geo": {
   "lat": "-43.9509",
   "lng": "-34.4618"
 }
 */
class Geo{
  constructor({lat, long}) {
    this.lat     = lat;
    this.long      = long;

  }
}
