module.exports = (app) => {
    app.get('/consulta', (req, res) => {
        app.app.controllers.consulta.consultaUsuarios(app, req, res);
    });
}
