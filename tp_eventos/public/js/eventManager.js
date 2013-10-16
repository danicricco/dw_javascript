//En este archivo vamos a poner el manejador de eventos
//Esta es una clase java que encapsula la logica de negocios de los eventos
//y las llamadas ajax al servidor


var ManejadorEventos=function(){
  
    var that={};
    that.crearEventoFamiliar=function(){
    };
    that.crearEventoEmpresarial=function(){
    };
    that.getTipoEventos=function(){
        var ajaxRequest={url:'/eventos/eventosPosibles'};
        return $.ajax(ajaxRequest);
    };
    return that;
};