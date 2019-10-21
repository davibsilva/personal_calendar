module.exports = (app) => {
    app.get('/calendario', (req, res) => {
        app.app.controllers.calendario.calendario(app, req, res);
    });
    app.post('/calendario', (req, res) => {
        app.app.controllers.calendario.autenticacao(app, req, res);
    });
    app.post('/inserirData', (req, res) => {
        app.app.controllers.calendario.salvarData(app, req, res);
    });
}