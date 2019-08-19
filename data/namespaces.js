// Bring in the room class
const Namespace =  require('../classes/Namespace');
const Room =  require('../classes/Room');

// Set up the namespaces
let namespaces = [];
let wikiNs = new Namespace(0,'Jordan','https://images-na.ssl-images-amazon.com/images/I/61Jz46vAfiL._SL1500_.jpg','/jordan');
let mozNs = new Namespace(1,'Nike','https://images-na.ssl-images-amazon.com/images/I/61rbwgxdCKL._SL1500_.jpg','/nike');
let linuxNs = new Namespace(2,'Addidas','https://cdn2.bigcommerce.com/server1500/ac84d/products/1203/images/2686/Adidas_Logo_Stack__93206.1337144792.380.380.jpg?c=2','/addidas');

// Make the main room and add it to rooms. it will ALWAYS be 0
wikiNs.addRoom(new Room(0,'Michael Jordan','Jordan'));
wikiNs.addRoom(new Room(1,'Chris Paul','Jordan'));
wikiNs.addRoom(new Room(2,'Russel Westbrook','Jordan'));

mozNs.addRoom(new Room(0,'Kobe','Nike'));
mozNs.addRoom(new Room(1,'Lebron','Nike'));
mozNs.addRoom(new Room(2,'Kyrie Irving','Nike'));
mozNs.addRoom(new Room(3,'Paul George','Nike'));

linuxNs.addRoom(new Room(0,'Derick Rose','Addidas'));
linuxNs.addRoom(new Room(1,'James Harden','Addidas'));
linuxNs.addRoom(new Room(2,'Kevin Garnett','Addidas'));
linuxNs.addRoom(new Room(3,'Tim Duncan','Addidas'));

namespaces.push(wikiNs,mozNs,linuxNs);

module.exports = namespaces;