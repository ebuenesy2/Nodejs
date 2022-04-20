'use strict';
const dayjs = require('dayjs'); // ! Zaman
const dotenv = require('dotenv'); // ! env
dotenv.config(); // ! env
const sign = require('jwt-encode'); //! Token - Encode
const jwt_decode = require('jwt-decode'); //! Token - Decode
const fs = require("fs"); //! Dosya
const path = require("path"); //! Dosya
const mkdir = require("mkdirp").sync; //! Dosya-Klasor
const mime = require("mime-types"); //! Dosya-Bilgileri
const sharp = require('sharp');  //! Dosya Yükleme
const fastifyPlugin = require('fastify-plugin'); // ! Fastify-plugin
const fastify = require('fastify')({logger: false}); // ! Fastify
fastify.register(require('fastify-formbody')) // ! Fastify-formbody
this.fastify = fastify; // ! Fastify
const fastifyStatic = require('fastify-static')  // ! Fastify-static
fastify.register(require('fastify-cors'), { })  // ! Fastify-cors



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

		//! Home
		fastify.get('/', function (req, res) {			

			res.send({

				title: 'Yıldırım Dev -  Anasayfa  Get - api - fastify - moleculer - json - [ Port ] [ 3001 ]',
				zaman: dayjs().toDate()
			});

			console.log('\u001b[' + 32 + 'm' + 'Get Yapıldı - Anasayfa [ api-service.js ] - [ /env ] ' + '\u001b[0m');	

		}) //! End Home

		// ! ------ Env -----------------------------
		
		//! Env
		fastify.get('/env', function (req, res) {
			res.send({
				title: 'Env Bilgileri',
				PORT: process.env.PORT,
				API:
				{
					APi_URL: process.env.APi_URL,
					APi_URL_Dev: process.env.APi_URL_Dev,
					APi_URL_Local: process.env.APi_URL_Local,
					APi_Title: process.env.APi_Title,
					APi_Name: process.env.APi_Name
				},	
				Version:
				{
					Version: process.env.Version,
					Release_Date: process.env.Release_Date,
					Version_Title: process.env.Version_Title,
					Author: process.env.Author
				}				
			
			});

			console.log('\u001b[' + 32 + 'm' + 'Env Bilgileri [ /env ] ' + '\u001b[0m');	
		}) //! End Env

		// ! ------ Env  Son ------------------------

		// ! ------ Version -------------------------

		//! Version
		fastify.get('/version', function (req, res) {
			res.send({
				title: 'Verison Bilgileri',
				Version: process.env.Version,
				Release_Date: process.env.Release_Date,
				Version_Title: process.env.Version_Title,
				Author: process.env.Author
			});

			console.log('\u001b[' + 32 + 'm' + 'Verison Bilgileri [ /version ] ' + '\u001b[0m');	

		}) //! Version Son
		// ! ------ Version Son  --------------------

	    // ! ------ Bilgiler -------------------------

		//! Bilgiler
		fastify.get('/info', function (req, res) {
			res.send({
				title: 'Proje Bilgileri',
				PORT: process.env.PORT,
				API:
				{
					APi_URL: process.env.APi_URL,
					APi_URL_Dev: process.env.APi_URL_Dev,
					APi_URL_Local: process.env.APi_URL_Local,
					APi_Title: process.env.APi_Title,
					APi_Name: process.env.APi_Name
				},	
				Version:
				{
					Version: process.env.Version,
					Release_Date: process.env.Release_Date,
					Version_Title: process.env.Version_Title,
					Author: process.env.Author
				}				
			
			});

			console.log('\u001b[' + 32 + 'm' + 'Proje Bilgileri [ /info ] ' + '\u001b[0m');	
	
		}) //! End Bilgiler

		// ! ------ Bilgiler Son  --------------------
		



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



		//! -------------------------   Token Çözme	-----------------------------

			fastify.post('/token_post', function (req, res) {

				var token = req.body.token;
				var decoded = jwt_decode(token);

				res.send(decoded)

			}) //! Token	

		//! -------------------------   Token Çözme	Son	-----------------------------

		//************************************* Web  **************************************************** */

		//!-------------  Logs -----------------------------------------------------------------------------------------

		    fastify.get('/api/logs/info',async (req,res)=> this.broker.call("logs.info")) //! İnfo			
			fastify.post('/api/logs/post', async (req, res) => this.broker.call("logs.post",{...req.body})) //! POST
			fastify.get('/api/logs/html',async (req,res)=> this.broker.call("logs.html")) //! Html
			fastify.get('/api/logs/all', async (req, res) => this.broker.call("logs.all")) //! All

			fastify.get('/api/logs/:id', async (req, res) => this.broker.call("logs.find",{id: req.params.id})) //!Search
			fastify.post('/api/logs/find_user', async (req, res) => this.broker.call("logs.find_user",{...req.body})) //! Search User	
			fastify.post('/api/logs/find_fromToken', async (req, res) => this.broker.call("logs.find_fromToken",{...req.body})) //! Search User	

			fastify.post('/api/logs/add', async (req, res) => this.broker.call("logs.add",{...req.body})) //! CREATE
			fastify.post('/api/logs/update', async (req, res) => this.broker.call("logs.update",{...req.body})) //! UPDATE
			fastify.post('/api/logs/delete', async (req, res) => this.broker.call("logs.delete",{...req.body})) //! DELETE				

		//!---------------- Logs son --------------------------------------------------------------------------------------------
			
		//!-------------  File --------------------------------------------------------------------------------------------------

			fastify.get('/api/file/info',async (req,res)=> this.broker.call("file.info")) //! İnfo
			fastify.post('/api/file/post', async (req, res) => this.broker.call("file.post",{...req.body})) //! POST
			fastify.get('/api/file/html',async (req,res)=> this.broker.call("file.html")) //! Html
			fastify.get('/api/file/all', async (req, res) => this.broker.call("file.all")) //! All

			fastify.get('/api/file/:id', async (req, res) => this.broker.call("file.find",{id: req.params.id})) //! Search
			fastify.post('/api/file/find_post', async	 (req, res) => this.broker.call("file.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/file/find_token', async (req, res) => this.broker.call("file.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/file/find_user', async (req, res) => this.broker.call("file.find_user",{...req.body})) //! Search User	
			fastify.post('/api/file/add', async (req, res) => this.broker.call("file.add",{...req.body})) //! CREATE
			fastify.post('/api/file/update', async (req, res) => this.broker.call("file.update",{...req.body})) //! UPDATE
			fastify.post('/api/file/delete_update', async (req, res) => this.broker.call("file.delete_update",{...req.body})) //! DELETE			
			fastify.post('/api/file/delete', async (req, res) => this.broker.call("file.delete",{...req.body})) //! DELETE			
					
			fastify.post('/api/file/getFile',async (req,res)=> this.broker.call("file.getFile",{...req.body})) //! File Info
			fastify.post('/api/file/upload',async (req,res)=> this.broker.call("file.upload",{...req.body})) //! Upload
			fastify.post('/api/file/updateFile',async (req,res)=> this.broker.call("file.updateFile",{...req.body})) //! Upload
			fastify.post('/api/file/fileDeleteUrl',async (req,res)=> this.broker.call("file.fileDeleteUrl",{...req.body})) //! URLFile DELETE
			fastify.post('/api/file/getFileUrl',async (req,res)=> this.broker.call("file.getFileUrl",{...req.body})) //! URLFile Info 
			fastify.post('/api/file/uploadUrl',async (req,res)=> this.broker.call("file.uploadUrl",{...req.body})) //! URLFile Upload 
			fastify.post('/api/file/updateFileUrl',async (req,res)=> this.broker.call("file.updateFileUrl",{...req.body})) //! URLFile Upload 
		
		//!-------------  File --------------------------------------------------------------------------------------------------


		//!-------------  user --------------------------------------------------------------------------------------------------

    		fastify.get('/api/user/info',async (req,res)=> this.broker.call("user.info")) //! İnfo
			fastify.post('/api/user/post', async (req, res) => this.broker.call("user.post",{...req.body})) //! POST
			fastify.get('/api/user/html',async (req,res)=> this.broker.call("user.html")) //! Html
			fastify.get('/api/user/all', async (req, res) => this.broker.call("user.all")) //! All			
			fastify.get('/api/user/:id', async (req, res) => this.broker.call("user.find",{id: req.params.id})) //! Search

			fastify.post('/api/user/find_post', async	 (req, res) => this.broker.call("user.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/user/find_token', async (req, res) => this.broker.call("user.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/user/add', async (req, res) => this.broker.call("user.add",{...req.body})) //! CREATE
			fastify.post('/api/user/update', async (req, res) => this.broker.call("user.update",{...req.body})) //! UPDATE
			fastify.post('/api/user/updateUrl', async (req, res) => this.broker.call("user.updateUrl",{...req.body})) //! UPDATE - URL
			fastify.post('/api/user/delete/:id', async (req, res) => this.broker.call("user.delete",{id: req.params.id,...req.body})) //! DELETE
			
			fastify.post('/api/user/loginOnline', async (req, res) => this.broker.call("user.loginOnline",{...req.body})) //! Login
			fastify.post('/api/user/loginOnlineUsername', async (req, res) => this.broker.call("user.loginOnlineUsername",{...req.body})) //! Login User
			fastify.post('/api/user/loginOut', async (req, res) => this.broker.call("user.loginOut",{...req.body})) //! Loginout

		//!---------------- user son ----------------------------------------------------------------------------------------------

		//!-------------  admin --------------------------------------------------------------------------------------------------

			fastify.get('/api/admin/info',async (req,res)=> this.broker.call("admin.info")) //! İnfo
			fastify.post('/api/admin/post', async (req, res) => this.broker.call("admin.post",{...req.body})) //! POST
			fastify.get('/api/admin/html',async (req,res)=> this.broker.call("admin.html")) //! Html
			fastify.get('/api/admin/all', async (req, res) => this.broker.call("admin.all")) //! All
			fastify.get('/api/admin/:id', async (req, res) => this.broker.call("admin.find",{id: req.params.id})) //! Search

			fastify.post('/api/admin/find_post', async (req, res) => this.broker.call("admin.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/admin/find_token', async (req, res) => this.broker.call("admin.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/admin/add', async (req, res) => this.broker.call("admin.add",{...req.body})) //! CREATE
			fastify.post('/api/admin/update', async (req, res) => this.broker.call("admin.update",{...req.body})) //! UPDATE
			fastify.post('/api/admin/updateUrl', async (req, res) => this.broker.call("admin.updateUrl",{...req.body})) //! UPDATE - URL
			fastify.post('/api/admin/delete/:id', async (req, res) => this.broker.call("admin.delete",{id: req.params.id,...req.body})) //! DELETE
			
			fastify.post('/api/admin/loginOnline', async (req, res) => this.broker.call("admin.loginOnline",{...req.body})) //! Login
			fastify.post('/api/admin/loginOnlineUsername', async (req, res) => this.broker.call("admin.loginOnlineUsername",{...req.body})) //! Login
			fastify.post('/api/admin/loginOut', async (req, res) => this.broker.call("admin.loginOut",{...req.body})) //! Loginout

		//!---------------- admin son ----------------------------------------------------------------------------------------------

		//!------------- message  --------------------------------------------------------------------------------------------------

			fastify.get('/api/message/info',async (req,res)=> this.broker.call("message.info")) //! İnfo
			fastify.post('/api/message/post', async (req, res) => this.broker.call("message.post",{...req.body})) //! POST
			fastify.get('/api/message/html',async (req,res)=> this.broker.call("message.html")) //! Html
			fastify.get('/api/message/all', async (req, res) => this.broker.call("message.all")) //! All
			fastify.get('/api/message/find/:id', async (req, res) => this.broker.call("message.find",{id: req.params.id})) //!Search	
			
			fastify.post('/api/message/find_post', async (req, res) => this.broker.call("message.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/message/find_token', async (req, res) => this.broker.call("message.find_token",{...req.body})) //!  Search-Token		
			fastify.post('/api/message/add', async (req, res) => this.broker.call("message.add",{...req.body})) //! CREATE		
			fastify.post('/api/message/update', async (req, res) => this.broker.call("message.update",{...req.body})) //! UPDATE
			fastify.post('/api/message/delete/:id', async (req, res) => this.broker.call("message.delete",{id: req.params.id,...req.body})) //! DELETE
			fastify.post('/api/message/deleted_update/:id', async (req, res) => this.broker.call("message.deleted_update",{id: req.params.id,...req.body})) //! DELETED MESSAGE
		    
			fastify.post('/api/message/view/:id', async (req, res) => this.broker.call("message.view",{id: req.params.id,...req.body})) //!Search - View
			fastify.post('/api/message/inbox', async (req, res) => this.broker.call("message.inbox",{...req.body})) //! Inbox			
		
		//!---------------- message son ----------------------------------------------------------------------------------------------
		   		   			
		//!------------- ssk  --------------------------------------------------------------------------------------------------

			fastify.get('/api/ssk/info',async (req,res)=> this.broker.call("ssk.info")) //! İnfo
			fastify.post('/api/ssk/post', async (req, res) => this.broker.call("ssk.post",{...req.body})) //! POST
			fastify.get('/api/ssk/html',async (req,res)=> this.broker.call("ssk.html")) //! Html
			fastify.get('/api/ssk/all', async (req, res) => this.broker.call("ssk.all")) //! All
			fastify.get('/api/ssk/:id', async (req, res) => this.broker.call("ssk.find",{id: req.params.id})) //! Search	

			fastify.post('/api/ssk/find_post', async (req, res) => this.broker.call("ssk.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/ssk/find_token', async (req, res) => this.broker.call("ssk.find_token",{...req.body})) //!  Search-Token	
			fastify.post('/api/ssk/add', async (req, res) => this.broker.call("ssk.add",{...req.body})) //! CREATE		
			fastify.post('/api/ssk/update', async (req, res) => this.broker.call("ssk.update",{...req.body})) //! UPDATE
			fastify.post('/api/ssk/delete/:id', async (req, res) => this.broker.call("ssk.delete",{id: req.params.id,...req.body})) //! DELETE
			
	    //!---------------- ssk son ----------------------------------------------------------------------------------------------

		
		//!------------- note  --------------------------------------------------------------------------------------------------

			fastify.get('/api/note/info',async (req,res)=> this.broker.call("note.info")) //! İnfo
			fastify.post('/api/note/post', async (req, res) => this.broker.call("note.post",{...req.body})) //! POST
			fastify.get('/api/note/html',async (req,res)=> this.broker.call("note.html")) //! Html
			fastify.get('/api/note/all', async (req, res) => this.broker.call("note.all")) //! All
			fastify.get('/api/note/:id', async (req, res) => this.broker.call("note.find",{id: req.params.id})) //! Search	

			fastify.post('/api/note/find_post', async (req, res) => this.broker.call("note.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/note/find_token', async (req, res) => this.broker.call("note.find_token",{...req.body})) //!  Search-Token	
			fastify.post('/api/note/find_user', async (req, res) => this.broker.call("note.find_user",{...req.body})) //!  Search-UserToken	
			fastify.post('/api/note/add', async (req, res) => this.broker.call("note.add",{...req.body})) //! CREATE		
			fastify.post('/api/note/update', async (req, res) => this.broker.call("note.update",{...req.body})) //! UPDATE
			fastify.post('/api/note/updated_delete/:id', async (req, res) => this.broker.call("note.updated_delete",{id:req.params.id,...req.body})) //! UPDATE DELETE
			fastify.post('/api/note/delete/:id', async (req, res) => this.broker.call("note.delete",{id: req.params.id,...req.body})) //! DELETE
		
	    //!---------------- note son ----------------------------------------------------------------------------------------------



		//************************************* Server  **************************************************** */
		// ! Server dinliyor
		const start = async () => {
			try {
				  await fastify.listen(process.env.PORT || 3001, '0.0.0.0')
				  console.log('\u001b[' + 32 + 'm' + 'Port Listening [ '+process.env.PORT+' ]' + '\u001b[0m');	
				  
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
