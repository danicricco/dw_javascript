
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var eventos = require('./routes/eventos');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('uc_key'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Inicio de pantalla 1 - Home
app.get('/', routes.index);


//Inicio de pantalla 2 - Eleccion de tipo de evento
app.get('/inicioCargaEventoFamiliar', routes.inicioCargaEventoFamiliar);
app.get('/inicioCargaEventoEmpresarial', routes.inicioCargaEventoEmpresarial);

//Llamada ajax para obtener los tipos de eventos posibles
app.get('/eventos/eventosPosibles',eventos.eventosPosibles);

//Inicio de pantalla 3 - Datos Generales del evento
app.get('/agregarEvento/:tipoEvento',eventos.iniciarCargaEvento);

app.post('/eventos/cargarEvento',eventos.cargarEvento);

//Inicio de pantalla 4 - Configuracion de evento
app.get('/eventos/configurar',eventos.iniciarConfiguracion);

//Listar los eventos
app.get('/eventos/list',eventos.listarEventos);

//Retorna una lista de las actividades que puede tener un tipo de evento
app.get('/configuracion/:tipoEvento',eventos.listaDeActividades);

app.get('/libro',eventos.iniciarLibroEvento);

app.get('/evento',eventos.obtenerEvento);

app.get('/ofertas',eventos.iniciarOferta);

app.get('/ofertas/list',eventos.listarOfertas);

app.post('/evento',eventos.agregarEvento);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
