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


//Este es un mapa desde el tipo de actividad 
//a las ofertas disponibles
var ofertas={    
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
        eventos[eventId].actividades=actividades;
    };
    return that;
};

var eventDAO=EventDAO();
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

//Llamada ajax que agrega un evento
exports.cargarEvento=function(req,res){
    
};

exports.listarEventos=function(req,res){
    res.send(eventDAO.list());
};

exports.iniciarConfiguracion=function(req,res){
  var idEvento=req.query.evento_id;
  var evento=eventDAO.getEvento(idEvento);
  res.render("configurationEvento",{'evento_id':idEvento,tipoEvento:evento.tipo});
    
};
exports.listaDeActividades=function(req,res){
    var tipoEvento=req.params.tipoEvento;
     res.send(configurationPorTipo[tipoEvento]);
};


//recibe la lista de actividades que se pueden asignar a un evento
exports.configurarEvento=function(req,res){
    
};

exports.iniciarLibroEvento=function(req,res){
    var idEvento=req.query.evento_id;
    res.render("libro",{'evento_id':idEvento});
};

exports.obtenerEvento=function(req,res){
    var idEvento=req.query.evento_id;
    res.send(eventDAO.getEvento(idEvento));
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
agregarEventosDePrueba();
configurarDePrueba();


