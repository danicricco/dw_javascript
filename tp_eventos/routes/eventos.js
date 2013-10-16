//esto es un objeto que simula los datos guardados en la BD
//aca guardamos los dos tipos de evento y sus subclasificaciones
var eventos={
    'familiar':[
        {id:'boda',title:'Casamiento'},
        {id:'bautismo',title:'Bautismo'},
        {id:'navidad',title:'Navidad'},
        {id:'cumple',title:'Cumpleaños de 15'}
    ],
    'empresarial':[
        {id:'lanzamiento',title:'Lanzamiento de producto'},
        {id:'workshop',title:'Workshop'},
        {id:'brindis_final',title:'Brindis de fin de año'}
    ]
    
};

exports.eventosPosibles = function(req, res){
 
 if(req.session.tipoEvento){
     //solo si el tipoEvento esta definido en la session
     //retorna los eventos de ese tipo
     res.send(eventos[req.session.tipoEvento]);
 }else{
     res.send(500,'El tipo de evento no fue inicializado');
 }
 
}