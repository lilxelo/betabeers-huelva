//Inclusión de la librería pillars
var project = require('pillars');

project.configure({debug:true});
// Pillars.js incorpora un servicio http built-in, así que
// tomamos e iniciamos del servicio http, mediante el método .start();
project.services.get('http').start();

/*
Si queremos configurar el proyecto....
project.services.get('http').configure({timeout:8000,port:3001}).start(); 
*/


project.routes.add(new Route({path:"render"},gw=>{
	gw.render("static/auto-render.pug");
}));

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
