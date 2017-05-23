//Inclusión de la librería pillars
var project = require('pillars');

// Configuración del proyecto mediante .configure()
project.configure({
	debug:true, 
	renderReload: true,
	cors: false,
	maxUploadSize: 1*1024*1024
});

// Pillars.js incorpora un servicio http built-in, así que tomamos e iniciamos del servicio http, mediante el método .start();
// Para configurar el servicio, se usa el método .configure()
project.services.get('http').configure({
	port:3001,
	timeout: 8000
}).start();

// Hola Mundo con las propiedades de route
project.routes.add(new Route({
	port: 3001,
	path:"hola",
	method: "GET",
	host: "localhost",
	https: false,
	multipart: false,
	cors: false,
	session: true
},gw=>{
	gw.session.counter = gw.session.counter || 0;
	gw.session.counter++;	
	gw.html("Hola Mundo, esta es tu visita:"+ gw.session.counter);
}));


//Creación de un nuevo servicio http
project.services.add((new HttpService({
  id:'http2',
  port: 3002
})).start()); 

//Controlador para desactivar el servicio http
project.routes.add(new Route({
	path: "off"
},gw=>{
	project.services.get("http2").stop();
	gw.send("Desactivado el servicio http2");
}));

//Controlador para activa el servicio http2
project.routes.add(new Route({
	path: "on"
},gw=>{
	project.services.get("http2").start();
	gw.send("Activado el servicio http2");
}));

/*Los controladores filtran la petición por: port, path, method, host y https */
//Ejemplo filtrado de controlador por puerto de petición
project.routes.add(new Route({
	path:"/info",
	port: 3002
},gw=>{
	gw.json(project);
}));

//Ejemplo de envío de un json
project.routes.add(new Route({
	path:"/json"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32",
		func : function(){console.log("Holita");}
	};	
	gw.json(data);
}));

// Ejemplo de envío de datos a un template
project.routes.add(new Route({
	path:"/mytemplate"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32"
	};	
	gw.render("static/user.hbs", data);
}));


//Ejemplo de video en streaming


//Ejemplo de query string, el get de php vaya ?a=2&b="hola"
/*Los datos del query string están en gw.query*/



//Ejemplo rutas parametrizadas
/*
project.routes.add(new Route({
	path:"/:var1/:var2"
},gw=>{
	gw.json(gw.pathParams["var1"]);
}));
*/

//Ejemplo directorio estático
//Añadimos un nuevo controlador que activa el directorio estático (el directorio estático es el middleware directory.js)
let pillarsDocsStatic = new Route({
  id:'pillarsDocsStatic',
  path:'/*:path',
  directory:{
    path:'./static',
    listing:true
  }
});
project.routes.add(pillarsDocsStatic);
