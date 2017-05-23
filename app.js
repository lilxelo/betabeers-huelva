//Inclusión de la librería pillars
var project = require('pillars');

project.configure({debug:true, renderReload: true});

// Pillars.js incorpora un servicio http built-in, así que
// tomamos e iniciamos del servicio http, mediante el método .start();
project.services.get('http').configure({port:3001}).start();

/*Nuevo servicio http*/
project.services.add((new HttpService({
  id:'http2',
  port: 3002
})).start()); 
/*
Si queremos configurar el proyecto....
project.services.get('http').configure({timeout:8000,port:3001}).start(); 
*/

project.routes.add(new Route({
	path:"/mytemplate"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32"
	};
	gw.json(data);
	//gw.render("static/user.hbs", data);
}));


project.routes.add(new Route({
	path:"/info",
	port: 3002
},gw=>{
	gw.json(project);
}));

/*
project.routes.add(new Route({
	path:"/:var1/:var2"
},gw=>{
	gw.send("La ruta es:",var1,var2);
}));
*/
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
