$(document).ready(
    function(){
        var eventManager=ManejadorEventos();
        $("#submit").click(
            function(){
                var evento={name:'Bautismo ',tipo:'bautismo',fecha_aprox:'2013-01-10',presupuesto_min:10,presupuesto_max:50};
                eventManager.cargarEvento(evento);   
            }
        );
    }
);