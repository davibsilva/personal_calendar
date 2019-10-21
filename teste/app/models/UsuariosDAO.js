function UsuariosDAO(connection){
    this._connection = connection(); // recebe o objeto db exportado de dbConnection
}
// UsuariosDAO.prototype.inserirUsuario = function(usuario){
//     this._connection.open( function(erro, mongoclient){
//         mongoclient.collection('usuarios', (erro, collection) => {
//             collection.insert(usuario);
//         });
//     });
// }

function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoclient.close();
		});
	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray((erro, result) => {
				console.log(result);

				if(result[0] != undefined) {

					req.session.autorizado = true;

					req.session.email = result[0].email; 
					req.session.senha = result[0].senha;
				}

				if(req.session.autorizado) {
					res.redirect('calendario');	
				}
				
				if(req.session.autorizado != true) {
					var msg = 'Usuário não encontrado, cadastre pela rota /cadastro'
					res.render('index', {validacao : {}});
				}
			});

			mongoclient.close();
		});
	});
    console.log(usuario);
}

UsuariosDAO.prototype.getUsuarios = function(callback){
	this._connection.query('select * from usuarios', callback);
}


module.exports = () => {
    return UsuariosDAO;
}