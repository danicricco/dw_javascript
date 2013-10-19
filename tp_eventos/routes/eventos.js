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