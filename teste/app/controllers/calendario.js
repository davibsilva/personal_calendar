module.exports.calendario = (app, req, res) => {
    
    if(req.session.autorizado) {
        res.render('calendario');
    } else {
        res.render('index', {validacao: {}});
    }
   

}
module.exports.autenticacao = (app, req, res) => {
    res.render('calendario');
}

module.exports.salvarData = (app, req, res) => {
    var dadosForm = req.body;

    const connection = app.config.dbConnection;
    const usuariosModel = new app.app.models.UsuariosDAO(connection);

    usuariosModel.inserirData(dadosForm);
    res.render('calendario', {validacao: {}});
}