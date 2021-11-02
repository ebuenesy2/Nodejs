'use strict';
const dayjs = require('dayjs'); // ! Zaman
const dotenv = require('dotenv'); // ! env
dotenv.config(); // ! env
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const fs = require("fs"); //! Dosya
const path = require("path"); //! Dosya
const mkdir = require("mkdirp").sync; //! Dosya
const mime = require("mime-types"); //! Dosya
const sharp = require('sharp');  //! Dosya Yükleme
const fastifyPlugin = require('fastify-plugin'); // ! Fastify
const fastify = require('fastify')({logger: false}); // ! Fastify
fastify.register(require('fastify-formbody')) // ! Fastify
this.fastify = fastify; // ! Fastify
const fastifyStatic = require('fastify-static')  // ! Fastify-static


//! File
fastify.register(require('fastify-multipart'), {
	addToBody: true,
	limits: {
		fieldNameSize: 100, // Max field name size in bytes
		fieldSize: 53000000, // Max field value size in bytes
		fields: 20,         // Max number of non-file fields
		fileSize: 53000000,      // For multipart forms, the max file size
		files: 10,           // Max number of file fields
		headerPairs: 2000   // Max number of header key=>value pairs 
	}
});

//! Public file
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public')
})



// dev test 7
module.exports = {
	name: 'api',

	settings: {
		port: process.env.PORT || 3001
	},
	

		// ! ------ Socket -------------------------------
	

	   // ! ------ Socket Son -------------------------------

	created() {

		try {

		// ! ------ Get -------------------------------

			// http://localhost:3000
			fastify.get('/', function (req, res) {		

				console.log('Get Yapıldı - Anasayfa [ api-service.js ] - [ moleculer ]');			

				res.send({

					title: 'Yıldırım Dev -  Anasayfa  Get - api - fastify - moleculer - json - [ Port ] [ 3001 ]',
					zaman: dayjs().toDate()
				});

			}) // Get

			// http://localhost:3000
			fastify.get('/env', function (req, res) {
				res.send({
					title: 'env',
					env: process.env.APi_URL
				});

				console.log('Get Yapıldı - Anasayfa [ api-service.js ]');
				console.log(process.env.APi_URL)
			}) // Get

		// http://localhost:3000
		fastify.get('/version', function (req, res) {
			res.send({
				title: 'Verison',
				version: process.env.Version
			});

			console.log('Get Yapıldı - Anasayfa [ api-service.js ]');
			console.log(process.env.Version)
		}) // Get



		// ! ------ Post -----------------------------

			// http://localhost:3000/
			fastify.post('/', function (req, res) {

				//res.send(req.body.name);

				res.send(req.body);
				console.log(req.body);

			}) //post	



		// ! ------  Token -------------------------------

			// ! Get Token
			fastify.post('/token', function (req, res) {


				const secret = 'secret';
				const data = req.body;
				const jwt = sign(data, secret);
				res.send({
					Token: jwt
				});

			}) // ! Get Token	



		//! -------------------------   Token Resolution	-----------------------------

			fastify.post('/token_post', function (req, res) {

				var token = req.body.token;
				var decoded = jwt_decode(token);

				res.send(decoded)

			}) //! Token	

		//! -------------------------   Token Çözme	Son	-----------------------------

		//************************************* Web  **************************************************** */

		//!-------------  Logs -----------------------------------------------------------------------------------------

			fastify.post('/api/logs/post', async (req, res) => this.broker.call("logs.post",{...req.body})) //! POST

			fastify.get('/api/logs/info',async (req,res)=> this.broker.call("logs.info")) //! İnfo
			fastify.get('/api/logs/all', async (req, res) => this.broker.call("logs.all")) //!All
			fastify.get('/api/logs/:id', async (req, res) => this.broker.call("logs.find",{id: req.params.id})) //!Search
			fastify.post('/api/logs/add', async (req, res) => this.broker.call("logs.add",{...req.body})) //! CREATE
			fastify.post('/api/logs/update', async (req, res) => this.broker.call("logs.update",{...req.body})) //! UPDATE
			fastify.post('/api/logs/delete', async (req, res) => this.broker.call("logs.delete",{...req.body})) //! DELETE	

			fastify.post('/api/logs/find_user', async (req, res) => this.broker.call("logs.find_user",{...req.body})) //! find_user

		//!---------------- Logs son --------------------------------------------------------------------------------------------
			
		//!-------------  File --------------------------------------------------------------------------------------------------

			fastify.get('/api/file/info',async (req,res)=> this.broker.call("file.info")) //! İnfo
			fastify.get('/api/file/all', async (req, res) => this.broker.call("file.all")) //!All
			fastify.get('/api/file/:id', async (req, res) => this.broker.call("file.find",{id: req.params.id})) //!Search
			fastify.post('/api/file/add', async (req, res) => this.broker.call("file.add",{...req.body})) //! CREATE
			fastify.post('/api/file/update', async (req, res) => this.broker.call("file.update",{...req.body})) //! UPDATE
			fastify.post('/api/file/delete', async (req, res) => this.broker.call("file.delete",{...req.body})) //! DELETE

			fastify.get('/api/file/html',async (req,res)=> this.broker.call("file.html")) //! Html
			fastify.post('/api/file/find_user', async (req, res) => this.broker.call("file.find_user",{...req.body})) //! Search User			
			fastify.post('/api/file/getFile',async (req,res)=> this.broker.call("file.getFile",{...req.body})) //! File Info
			fastify.post('/api/file/upload',async (req,res)=> this.broker.call("file.upload",{...req.body})) //! Upload
			fastify.post('/api/file/fileDelete',async (req,res)=> this.broker.call("file.fileDelete",{...req.body})) //! DELETE FİLE

			fastify.post('/api/file/getFileCurl',async (req,res)=> this.broker.call("file.getFileCurl",{...req.body})) //! cURLFile info 
			fastify.post('/api/file/uploadCurl',async (req,res)=> this.broker.call("file.uploadCurl",{...req.body})) //! cURLFile Upload 
		
		//!-------------  File --------------------------------------------------------------------------------------------------


		//!-------------  user --------------------------------------------------------------------------------------------------

    		fastify.get('/api/user/info',async (req,res)=> this.broker.call("user.info")) //! İnfo
			fastify.post('/api/user/post', async (req, res) => this.broker.call("user.post",{...req.body})) //! POST
			fastify.get('/api/user/all', async (req, res) => this.broker.call("user.all")) //!All
			fastify.get('/api/user/:id', async (req, res) => this.broker.call("user.find",{id: req.params.id})) //!Search

			fastify.post('/api/user/find_post', async	 (req, res) => this.broker.call("user.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/user/find_token', async (req, res) => this.broker.call("user.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/user/add', async (req, res) => this.broker.call("user.add",{...req.body})) //! CREATE
			fastify.post('/api/user/update', async (req, res) => this.broker.call("user.update",{...req.body})) //! UPDATE
			fastify.post('/api/user/delete/:id', async (req, res) => this.broker.call("user.delete",{id: req.params.id,...req.body})) //! DELETE
			
			fastify.post('/api/user/loginOnline', async (req, res) => this.broker.call("user.loginOnline",{...req.body})) //! Login
			fastify.post('/api/user/loginOut', async (req, res) => this.broker.call("user.loginOut",{...req.body})) //! Loginout

		//!---------------- user son ----------------------------------------------------------------------------------------------


	    //************************************* Admin  **************************************************** */

		//!-------------  admin --------------------------------------------------------------------------------------------------

			fastify.get('/api/admin/info',async (req,res)=> this.broker.call("admin.info")) //! İnfo
			fastify.post('/api/admin/post', async (req, res) => this.broker.call("admin.post",{...req.body})) //! POST
			fastify.get('/api/admin/all', async (req, res) => this.broker.call("admin.all")) //!All
			fastify.get('/api/admin/:id', async (req, res) => this.broker.call("admin.find",{id: req.params.id})) //!Search

			fastify.post('/api/admin/find_user', async (req, res) => this.broker.call("admin.find_user",{...req.body})) //!  Search-Post
			fastify.post('/api/admin/find_token', async (req, res) => this.broker.call("admin.find_token",{...req.body})) //!  Search-Post
			fastify.post('/api/admin/add', async (req, res) => this.broker.call("admin.add",{...req.body})) //! CREATE
			fastify.post('/api/admin/update', async (req, res) => this.broker.call("admin.update",{...req.body})) //! UPDATE
			fastify.post('/api/admin/delete/:id', async (req, res) => this.broker.call("admin.delete",{id: req.params.id,...req.body})) //! DELETE

			
			fastify.post('/api/admin/loginOnline', async (req, res) => this.broker.call("admin.loginOnline",{...req.body})) //! Login
			fastify.post('/api/admin/loginOut', async (req, res) => this.broker.call("admin.loginOut",{...req.body})) //! Loginout

		//!---------------- admin son ----------------------------------------------------------------------------------------------

		//!------------- message  --------------------------------------------------------------------------------------------------

			fastify.get('/api/message/info',async (req,res)=> this.broker.call("message.info")) //! İnfo
			fastify.post('/api/message/post', async (req, res) => this.broker.call("message.post",{...req.body})) //! POST
			fastify.get('/api/message/all', async (req, res) => this.broker.call("message.all")) //! All
			fastify.get('/api/message/find/:id', async (req, res) => this.broker.call("message.find",{id: req.params.id})) //!Search	
			fastify.post('/api/message/view/:id', async (req, res) => this.broker.call("message.view",{id: req.params.id,...req.body})) //!Search - View
					
			fastify.post('/api/message/add', async (req, res) => this.broker.call("message.add",{...req.body})) //! CREATE		
			fastify.post('/api/message/update', async (req, res) => this.broker.call("message.update",{...req.body})) //! UPDATE
			fastify.post('/api/message/delete/:id', async (req, res) => this.broker.call("message.delete",{id: req.params.id,...req.body})) //! DELETE
			fastify.post('/api/message/deleted_update/:id', async (req, res) => this.broker.call("message.deleted_update",{id: req.params.id,...req.body})) //! DELETED MESSAGE
		
			fastify.post('/api/message/inbox', async (req, res) => this.broker.call("message.inbox",{...req.body})) //! Inbox			
		
		//!---------------- message son ----------------------------------------------------------------------------------------------
		   		   			
		//!------------- ssk  --------------------------------------------------------------------------------------------------

			fastify.get('/api/ssk/info',async (req,res)=> this.broker.call("ssk.info")) //! İnfo
			fastify.post('/api/ssk/post', async (req, res) => this.broker.call("ssk.post",{...req.body})) //! POST
			fastify.get('/api/ssk/all', async (req, res) => this.broker.call("ssk.all")) //! All
			fastify.get('/api/ssk/:id', async (req, res) => this.broker.call("ssk.find",{id: req.params.id})) //!Search	

			fastify.post('/api/ssk/add', async (req, res) => this.broker.call("ssk.add",{...req.body})) //! CREATE		
			fastify.post('/api/ssk/update', async (req, res) => this.broker.call("ssk.update",{...req.body})) //! UPDATE
			fastify.post('/api/ssk/delete/:id', async (req, res) => this.broker.call("ssk.delete",{id: req.params.id,...req.body})) //! DELETE
			
	    //!---------------- ssk son ----------------------------------------------------------------------------------------------


		//!------------- pricing  --------------------------------------------------------------------------------------------------

		  	fastify.get('/api/pricing/info',async (req,res)=> this.broker.call("pricing.info")) //! İnfo
		  	fastify.post('/api/pricing/post', async (req, res) => this.broker.call("pricing.post",{...req.body})) //! POST
			fastify.get('/api/pricing/all', async (req, res) => this.broker.call("pricing.all")) //! All
			fastify.get('/api/pricing/:id', async (req, res) => this.broker.call("pricing.find",{id: req.params.id})) //!Search	

			fastify.post('/api/pricing/add', async (req, res) => this.broker.call("pricing.add",{...req.body})) //! CREATE		
			fastify.post('/api/pricing/update', async (req, res) => this.broker.call("pricing.update",{...req.body})) //! UPDATE
			fastify.post('/api/pricing/delete/:id', async (req, res) => this.broker.call("pricing.delete",{id: req.params.id,...req.body})) //! DELETE
				
		//!---------------- pricing son ----------------------------------------------------------------------------------------------	

		//!------------- blogs  --------------------------------------------------------------------------------------------------

			fastify.get('/api/blogs/info',async (req,res)=> this.broker.call("blogs.info")) //! İnfo
			fastify.post('/api/blogs/post', async (req, res) => this.broker.call("blogs.post",{...req.body})) //! POST
			fastify.get('/api/blogs/all', async (req, res) => this.broker.call("blogs.all")) //! All
			fastify.get('/api/blogs/:id', async (req, res) => this.broker.call("blogs.find",{id: req.params.id})) //!Search	

			fastify.post('/api/blogs/add', async (req, res) => this.broker.call("blogs.add",{...req.body})) //! CREATE		
			fastify.post('/api/blogs/update', async (req, res) => this.broker.call("blogs.update",{...req.body})) //! UPDATE
			fastify.post('/api/blogs/delete', async (req, res) => this.broker.call("blogs.delete",{...req.body})) //! DELETE
		
		//!---------------- blogs son ----------------------------------------------------------------------------------------------


		//************************************* Server  **************************************************** */
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
