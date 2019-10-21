module.exports = (app) => {
    app.get('/', (req, res) => {
        app.app.controllers.index.login_page(app, req, res)
    });

    app.post('/autenticar', (req, res) => {
        app.app.controllers.index.autenticar(app, req, res)
    });

    app.get('/autenticar', (req, res) => {
        app.app.controllers.index.autenticar(app, req, res)
    });
} 