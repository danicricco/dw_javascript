//esto es un objeto que simula los datos guardados en la BD
//aca guardamos los dos tipos de evento y sus subclasificaciones
var eventosPosibles={
    'familiar':[
        {id:'boda',title:'Casamiento',description:'Un casamiento es un...'},
        {id:'bautismo',title:'Bautismo',description:'Para Bautismo es fundamental...'},
        {id:'navidad',title:'Navidad',description:'Din din doon.'},
        {id:'cumple',title:'Cumpleaños de 15',description:'akarasyyyy'}
    ],
    'empresarial':[
        {id:'lanzamiento',title:'Lanzamiento de producto',description:'Lo fundamental es '},
        {id:'workshop',title:'Workshop',description:'Workshop... dkkk'},
        {id:'brindis_final',title:'Brindis de fin de año',description:'brindis final'}
    ]
    
};


//este es un mapa desde el tipo de evento con todas las actividades que se requiren
var configurationPorTipo={
 'boda':['lugar','entrada','plato_fuerte','postre','dj','sacerdote','mesa_dulces'],
 'cumple':['lugar','entrada','plato_fuerte','postre','dj'],    
 'workshop':['lugar','presentador','musica','proyector']
};



var OfertasDAO=function(){
    var that={};
    //es un mapa desde la actividad a las ofertas disponibles
    var mapaOfertas={};
    
    that.agregarOferta=function(oferta){
        var ofertas=mapaOfertas[oferta.actividad];
        if(!ofertas){
            ofertas=[];
        }
        ofertas[ofertas.length]=oferta;
        mapaOfertas[oferta.actividad]=ofertas;
    };
    that.listOfertas=function(actividad){
        var ofertas=mapaOfertas[actividad];
        if(ofertas){
            return ofertas;
        }
        return [];
    };
    return that;
};
//Esta clase simula el acceso a la BD
var EventDAO=function(){
    var that={};
    // una bolsa donde se agregan todos los eventos
    var eventos=[];
    //agrega el evento dentro de la lista
    that.agregarEvento=function(evento){
        evento.id=eventos.length;
        eventos[evento.id]=evento;
        return evento;
    };
    that.modificarEvento=function(evento){
        if(evento && evento.id){
            eventos[evento.id]=evento;
        }
        throw 'Evento no valido. Debe tener un id';
    };
    that.getEvento=function(id){
        return eventos[id];
    };
    that.list=function(){
        return eventos;
    };
    that.configurar=function(eventId,actividades){
        if(eventos[eventId]){
            eventos[eventId].actividades=actividades;
        }else{
            return null;
        }
        
        
    };
    return that;
};

var eventDAO=EventDAO();
var ofertasDAO=OfertasDAO();

exports.eventosPosibles = function(req, res){
 
 if(req.session.tipoEvento){
     //solo si el tipoEvento esta definido en la session
     //retorna los eventos de ese tipo
     res.send(eventosPosibles[req.session.tipoEvento]);
 }else{
     res.send(500,'El tipo de evento no fue inicializado');
 }
 
}

exports.iniciarCargaEvento=function(req,res){
  var tipoEvento=req.params.tipoEvento;
  //guarda en la session el tipo de evento que se eligio
  req.session.cargaEvento={};
  req.session.cargaEvento.tipoEvento=tipoEvento;  
  res.render("cargaEventos");
};



exports.listarEventos=function(req,res){
    res.send(eventDAO.list());
};

//Inicia la pantalla 4 - Configuracion, eleccion de actividades
exports.iniciarConfiguracion=function(req,res){
  var idEvento=req.query.evento_id;
  var evento=eventDAO.getEvento(idEvento);
  res.render("configurationEvento",{'evento_id':idEvento,tipoEvento:evento.tipo});
    
};
exports.listaDeActividades=function(req,res){
    var tipoEvento=req.params.tipoEvento;
     res.send(configurationPorTipo[tipoEvento]);
};

//Inicia la pantalla 5 - El libro
exports.iniciarLibroEvento=function(req,res){
    var idEvento=req.query.evento_id;
    res.render("libro",{'evento_id':idEvento});
};

exports.obtenerEvento=function(req,res){
    var idEvento=req.query.evento_id;
    res.send(eventDAO.getEvento(idEvento));
};

exports.iniciarOferta=function(req,res){
    var idEvento=req.query.evento_id;
    var actividad=req.query.actividad;
    res.render("ofertas",{'evento_id':idEvento,'actividad':actividad});
};
exports.listarOfertas=function(req,res){
    var actividad=req.query.actividad;
    var ofertas=ofertasDAO.listOfertas(actividad);
    res.send(ofertas);
    
};
exports.agregarEvento=function(req,res){
  var eventoGuardado=eventDAO.agregarEvento(req.body);
    return res.send(eventoGuardado);
};

//Recibe un json y configura las actividades del evento
//{evento_id:1,actividades:['lugar','entrada','plato_fuerte']);
exports.configurarEvento=function(req,res){
  var eventoId=req.body.evento_id;
  var evento=eventDAO.getEvento(eventoId);
  if(evento){
      var eventoConfigurado=eventDAO.configurar(eventId,req.body.actividades);
      res.send(200,eventoConfigurado);
  }else{
      res.send(404,'No se encontro el evento '+eventoId);
  }
    
};
//---------------------------------------------------------------------
//funciones para agregar datos de prueba
//---------------------------------------------------------------------

function agregarEventosDePrueba(){
    eventDAO.agregarEvento({name:'Mi casamiento',tipo:'boda',fecha_aprox:'2013-01-10',presupuesto_min:10,presupuesto_max:50});
    eventDAO.agregarEvento({name:'Mi cumple',tipo:'cumple',fecha_aprox:'2013-01-10',presupuesto_min:10,presupuesto_max:50});
    eventDAO.agregarEvento({name:'Iphone 6',tipo:'workshop',fecha_aprox:'2014-01-10',presupuesto_min:1000,presupuesto_max:50000});
};
function configurarDePrueba(){
    eventDAO.configurar(1,['lugar','entrada','plato_fuerte']);
    eventDAO.configurar(2,['lugar','presentador']);
};
function cargarOfertasPrueba(){
    ofertasDAO.agregarOferta({'actividad':'lugar','nombre':'Belvedere','precio':5000,'description':'Un lugar bonito'});
    ofertasDAO.agregarOferta({'actividad':'lugar','nombre':'Sheraton','precio':15000,'description':'Un lugar lujoso'});
     
    ofertasDAO.agregarOferta({'actividad':'plato_fuerte','nombre':'Tia Techa','precio':5000,'description':'Ricas empanadas'});
    ofertasDAO.agregarOferta({'actividad':'plato_fuerte','nombre':'Mc donal','precio':15000,'description':'las hamburguesas'});
    
};
agregarEventosDePrueba();
configurarDePrueba();
cargarOfertasPrueba();

