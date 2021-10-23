'use strict';
const dayjs = require('dayjs'); // ! Zaman
const fastifyPlugin = require('fastify-plugin'); // ! Fastify
const fastify = require('fastify')({
	logger: false
}); // ! Fastify
fastify.register(require('fastify-formbody')) // ! Fastify
this.fastify = fastify;

const mongoose = require('mongoose'); // ! Mongoose

const dotenv = require('dotenv'); // ! env
dotenv.config(); // ! env

// dev test 7
module.exports = {
	name: 'api',

	settings: {
		port: process.env.PORT || 3001
	},

	created() {

		try {

			// ! ------ Get -------------------------------

			// http://localhost:3000
			fastify.get('/', function (req, res) {
				res.send({
					title: 'Get Yapıldı Anasayfa [ api-service.js ] - [ eczane ]',
					zaman: dayjs().toDate()
				});

				console.log('Get Yapıldı - Anasayfa [ api-service.js ] - [ eczane ]');
			}) // Get

			// http://localhost:3000
			fastify.get('/env', function (req, res) {
				res.send({
					title: 'env',
					env: process.env.MONGO_URL
				});

				console.log('Get Yapıldı - Anasayfa [ api-service.js ]');
				console.log(process.env.MONGO_URL)
			}) // Get

			// ! ------ Post -----------------------------

			// http://localhost:3000/
			fastify.post('/', function (req, res) {

				//res.send(req.body.name);

				res.send(req.body);
				console.log(req.body);

			}) //post	

			// ! ------  Put -------------------------------

			// http://localhost:3000
			fastify.put('/', function (req, res) {
				res.send({
					title: 'Put  Yapıldı Anasayfa [ api-service.js ] - [ eczane ]',
					zaman: dayjs().toDate()
				});

				console.log('Put Yapıldı - Anasayfa [ api-service.js ] - [ eczane ]');
			}) // Get


			// ! ------------------  Eczane Gerekli Kod    **********************

			fastify.get('/api/pharmacy/bilgiler', async (req, res) => {
				return this.broker.call("pharmacy.bilgiler")
			}) //! Bilgiler
			fastify.post('/api/pharmacy/post', async (req, res) => this.broker.call("pharmacy.post", {
				...req.body
			})) //! POST

			fastify.post('/api/pharmacy/add', async (req, res) => this.broker.call("pharmacy.create", {
				...req.body
			})) //! CREATE
			fastify.post('/api/pharmacy/update', async (req, res) => this.broker.call("pharmacy.update", {
				...req.body
			})) //! UPDATE
			fastify.post('/api/pharmacy/delete', async (req, res) => this.broker.call("pharmacy.remove", {
				id: req.body.id
			})) //! DELETE

			fastify.get('/api/pharmacy/all', async (req, res) => this.broker.call("pharmacy.find")) //! All
			fastify.get('/api/pharmacy/:id', async (req, res) => this.broker.call("pharmacy.get", {
				id: req.params.id
			})) // ! SEARCH


			// ! ------------------  Eczane Gerekli Kod   Son  **********************


			// ! Server dinliyor
			const start = async () => {
				try {
					await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
				} catch (err) {
					fastify.log.error(err)
					process.exit(1)
				}
			}

			// ! Başlatıyor
			start()





		} catch (err) {
			console.log(err);
		}
	}
};
