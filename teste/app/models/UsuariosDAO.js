function UsuariosDAO(connection){
    this._connection = connection(); // recebe o objeto db exportado de dbConnection
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray((erro, result) => {
				console.log(result);
				if(result[0] != undefined) {
					res.send('<h1> Usuário já cadastrado! </h1>')
					console.log('Email e senha já cadastrados')
				}
			});
			console.log('Usuário foi cadastrado!')
			collection.insert(usuario);	
			
		});
		mongoclient.close();
		res.render('cadastro', {validacao: {}})
	});
}

UsuariosDAO.prototype.listaUsuarios = function(callback, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find().toArray((erro, result) => {
				res.render('consulta', {result: result});
				console.log(result);
			});
			
			
		});
		mongoclient.close();
	});
}

UsuariosDAO.prototype.inserirData = function(usuario, req, res) {
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);	
		});
		mongoclient.close();
		
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
					req.session.data_usuario = result[0].data_usuario;
				}

				if(req.session.autorizado) {
					res.redirect('calendario');	
				}
				
				if(req.session.autorizado != true) {
					res.render('index', {validacao : {}});
				}
			});

			mongoclient.close();
		});
	});
    console.log(usuario);
}



// this._connection.open( function(err, mongoclient){
// 	mongoclient.collection("usuarios", function(err, collection){
// 		collection.find(usuario).toArray((erro, result) => {
// 			res.render('consulta', {result: result});
// 		});		
// 	});
// });

module.exports = () => {
    return UsuariosDAO;
}