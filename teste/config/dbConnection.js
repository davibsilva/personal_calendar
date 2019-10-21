// importar mongodb

const mongo = require('mongodb');

const connMongoDB = () => {
	console.log('Entrou na função de conexao');
	var db = new mongo.Db(
		'calendario_db',
		new mongo.Server(
			'localhost', // endereçod o servidor
			27017, // porta de conexao
			{}
		),
		{}
	);

	return db;

}

module.exports = () => {
	return connMongoDB;
}