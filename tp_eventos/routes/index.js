
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.inicioCargaEventoEmpresarial = function(req, res){
  res.render('eventosInicio', { tipoEvento:'Empresarial'});
};

exports.inicioCargaEventoFamiliar = function(req, res){
  res.render('eventosInicio', {tipoEvento:'Familiar' });
};