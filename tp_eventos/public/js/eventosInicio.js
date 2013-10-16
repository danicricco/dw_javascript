

var activarTipoEvento=function(tipoEvento){
    $('#eventoInicio_tipoEvento_description').html(tipoEvento.description);
};
//recibe una lista de tipos de evento y los pinta en una lista
var mostrarTipoEventos=function(tipoEventos){
    //obtiene el elemento y a su vez pone su contenido en vacio
    var tipoEventosDOM=$("#eventoInicio_tipoEventos").html("");
    var i=0;
    var liDOM;
    for(i=0;i<tipoEventos.length;i++){
        liDOM=$('<li class="tipoEvento" >'+tipoEventos[i].title+'</li>');
        tipoEventosDOM.append(liDOM);
        
        //aca hay una llamada a una funcion inline
        //para generar un closure y que cada elemento de la lista
        //quede atadoa su respectivo tipo de evento
        liDOM.click((function(tipo){
            return function(){activarTipoEvento(tipo)};
        })(tipoEventos[i]));
    }
};

$(document).ready(
    function(){
        //El objeto ManejadorEventos esta en eventManager.js (por lo tanto, este archivo se tiene que incluir primero )
        var manejadorEventos=ManejadorEventos();
        manejadorEventos.getTipoEventos().done(mostrarTipoEventos);
    }
);