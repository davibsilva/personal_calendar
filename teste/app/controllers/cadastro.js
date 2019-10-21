module.exports.admin = (app, req, res) => {
    res.render('cadastro', {validacao : {}, usuario : {}});
}

module.exports.usuario_salvar = (app, req, res) => {
    var dadosForm = req.body;

    req.assert('email','E-mail é obrigatório').notEmpty();
	req.assert('senha','Senha é obrigatório').notEmpty();
	req.assert('email','Insira um e-mail válido').isEmail();
    req.assert('senha','Insira senha de no mínimo 4 caracteres').len(4, 25);
    
    var erros = req.validationErrors();

    if(erros) {
        res.render("cadastro", {validacao : erros, usuario : usuario });
        return;
    }

    const connection = app.config.dbConnection;
    const usuariosModel = new app.app.models.UsuariosDAO(connection);

    usuariosModel.inserirUsuario(dadosForm, res);
}




