module.exports = (app) => {
    app.get('/cadastro', (req, res) => {
        app.app.controllers.cadastro.admin(app, req, res);
    });

    app.post('/cadastro', (req, res) => {
		app.app.controllers.cadastro.usuario_salvar(app, req, res);
    });
}