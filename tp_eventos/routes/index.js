
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.inicioCargaEventoEmpresarial = function(req, res){
  req.session.tipoEvento='empresarial';
  res.render('eventosInicio', { tipoEvento:'Empresarial'});
};

exports.inicioCargaEventoFamiliar = function(req, res){
    //deja en la session la informacin que el evento que se usa es empresarial
    req.session.tipoEvento='familiar';
  res.render('eventosInicio', {tipoEvento:'Familiar' });
};