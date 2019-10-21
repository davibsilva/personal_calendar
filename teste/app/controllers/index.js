module.exports.login_page = (app, req, res) => {
    res.render('index', {validacao : {}});
}

module.exports.autenticar = (app, req, res) => {
    
    var dadosForm = req.body;

    req.assert('email', 'Email invalido').isEmail();
    req.assert('email', 'Email não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render("index", {validacao: erros});
        return;
    }
    
    var connection = app.config.dbConnection;
    var UsuariosDAO = new app.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

    // res.send('tudo ok para criar a sessão');

}
