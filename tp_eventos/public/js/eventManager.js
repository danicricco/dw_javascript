//En este archivo vamos a poner el manejador de eventos
//Esta es una clase java que encapsula la logica de negocios de los eventos
//y las llamadas ajax al servidor


var ManejadorEventos=function(){
  
    var that={};
    that.cargarEvento=function(evento){
        var ajaxRequest={type:'POST',url:'/evento'};
        ajaxRequest.contentType = 'application/json; charset=utf-8';
		ajaxRequest.data=JSON.stringify(evento);
        var promise=$.ajax(ajaxRequest);
        promise.done(function(evento){
            alert('success '+evento.id);
        });
    };
    
    that.getTipoEventos=function(){
        var ajaxRequest={url:'/eventos/eventosPosibles'};
        return $.ajax(ajaxRequest);
    };
    return that;
};