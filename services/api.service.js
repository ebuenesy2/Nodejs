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



/*************   Socket  Tanım *********** */
const fastifySession = require('fastify-session'); // ! Fastify Session
const fastifyCookie = require('fastify-cookie'); // ! Fastify Cookie
fastify.register(fastifyCookie); // ! Fastify Cookie
fastify.register(fastifySession, {secret: 'a secret with minimum length of 32 characters'}); ; // ! Fastify Session
/*************   Socket  Tanım Son *********** */


/*************   Socket  *********** */
fastify.register(require('fastify-websocket'), { options: { maxPayload: 1048576 } })  // ! Fastify Web Socket
let OnlineCount=0; //! Online Sayısı
/*************   Socket Son  *********** */



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



module.exports = {
	name: 'api',

	settings: {
		port: process.env.PORT || 3001
	},

	created() {

		try {


	    // ! ------ Socket -------------------------------
		fastify.route({
			method: 'GET',
			url: '/socket/:userId',
			handler: (req, res) => {      
		
				const zaman=dayjs().toDate(); //! Zaman
				console.log('\u001b[' + 32 + 'm' + '[Socket] [Get] Socket Durum [ /socket/:userId ] :' + '\u001b[0m',req.params);
		
				//! Return
				res.send({ 
					dataType:"Socket",
					dataTypeDescription:"Socket Bilgileri",
					message:"Kullanıcı Bağlandı",
					count:OnlineCount,
					userId:req.session.sessionId,
					time:zaman          
				}) 
				
			},
			wsHandler: (connection, req) => {
				
					OnlineCount++; //! Sayac Artıyor
		
					const sessionId = req.session.sessionId; //! Session ID
					//console.log("Session sessionId: "+sessionId); //! Session ID      
					console.log('\u001b[' + 32 + 'm' + "Bir Kullanıcı Bağlandı SessionId: "+sessionId + '\u001b[0m') 	
				

					//! Herkese Dönüş Yapıyor
					fastify.websocketServer.clients.forEach(function each(client) {
						
						if (client.readyState === 1) {  
		
							//! Return Send
							client.send(JSON.stringify({
								
								fromUserID:Number(req.params.userId),
								fromUserToken:sessionId,
								fromApiUserToken: Number(req.params.userId),
								toAll:"all",
								toUserID:"all",
								dataType:"Connect",
								dataTypeTitle:"Connected",
								dataTypeDescription:"Bir Kullanıcı Bağlandı",
								dataId: 0,
								data:"Bir Kullanıcı Bağlandı",
								pageTable:null,
								pageToken:null,
								count:OnlineCount,
								date:dayjs().toDate()
		
							}));
							//! Return Send Son
		
						}
					})
					//! Herkese Dönüş Yapıyor Son
					
				//! -- Çıkış Yapıldı ise
				connection.socket.on("close", () => {
					
					OnlineCount--; //! Sayac Azalıyor
					//console.log("Kullanıcı Çıkış Yaptı sessionId: "+sessionId);   //! Kullanıcı Çıkış Yapma   
					console.log('\u001b[' + 31 + 'm' + "Bir Kullanıcı Çıkış Yaptı SessionId: "+sessionId + '\u001b[0m')       
					
					//! -----------  Time Update ----------------------------- 	
					let time_update = this.broker.call('time.loginOut', {
						socketId: Number(req.params.userId),
						socketToken: sessionId
					})		
					//! ----------- End Time Update ----------------------------

		
					//! Return All Clients
					fastify.websocketServer.clients.forEach(function each(client) {
						if (client.readyState === 1) {            
						
							//! Return Send
							client.send(JSON.stringify({
		
								fromUserID:Number(req.params.userId),
								fromUserToken:sessionId,
								fromApiUserToken: Number(req.params.userId),
								toAll:"all",
								toUserID:"all",
								dataType:"Connect",
								dataTypeTitle:"disConnect",
								dataTypeDescription:"Bir Kullanıcı Çıkış Yaptı",
								dataId: 0,
								data:"Bir Kullanıcı Çıkış Yaptı",
								pageTable:null,
								pageToken:null,
								count:OnlineCount,
								date:dayjs().toDate()
		
							}));
							//! Return Send Son
		
						}
					})
					//! Return All Clients
		
				}) 
				//! -- Çıkış Yapıldı ise Son
		
				
				//! -- Mesaj Alma
				connection.socket.on('message', message => {
		
					const obj = JSON.parse(message); 
					//console.log("Kimden:",sessionId," - Gelen Mesaj Json:",obj);
					//console.log("Gelen FromId:",obj.fromId);
					
					if(obj.dataType=="Time") { console.log("time socket");
											
						//! -----------  Time Add ----------------------------- 	
						let time_add = this.broker.call('time.add', {
							socketId: Number(obj.fromId),
							socketToken: sessionId,     
							pageTable: obj.pageTable,           
							pageToken: obj.pageToken,
							workingMod:	obj.workingMod
						})		
						//! ----------- End Time Add ----------------------------						

					}
					
					
					//! Return All Clients
					fastify.websocketServer.clients.forEach(function each(client) { 
						if (client.readyState === 1) {  
		
							//console.log("gelen Veri:",req.params);
						
							//! Return Send
							client.send(JSON.stringify({
								
								fromUserID: Number(req.params.userId),
								fromUserToken:sessionId,
								fromApiUserToken:obj.fromApiUserToken,
								toAll: obj.toAll,
								toUserID:obj.toAll? "all" : Number(obj.toUserId),
								dataType: obj.dataType,
								dataTypeTitle: obj.dataTypeTitle,
								dataTypeDescription: obj.dataTypeDescription,
								dataId: obj.dataId,
								data: obj.data,
								pageTable: obj.pageTable,
								pageToken:obj.pageToken,
								count:OnlineCount,
								date:dayjs().toDate()
		
							}));
							//! Return Send Son
		
						}
					})
					//! End Return All Clients
								
		
				}) 
				//! -- Mesaj Alma Son   
		
				
			}
		
		})
		// ! ------ Socket Son -------------------------------
			

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
			fastify.post('/api/logs/find_post', async (req, res) => this.broker.call("logs.find_post",{...req.body})) //! Search Post	
			fastify.post('/api/logs/find_token', async (req, res) => this.broker.call("logs.find_token",{...req.body})) //! Search Token	
			fastify.post('/api/logs/find_user', async (req, res) => this.broker.call("logs.find_user",{...req.body})) //! Search User	
			fastify.post('/api/logs/find_user_table', async (req, res) => this.broker.call("logs.find_user_table",{...req.body})) //! Search User - Tablo	
			fastify.post('/api/logs/find_table', async (req, res) => this.broker.call("logs.find_table",{...req.body})) //! Search  Tablo	
			fastify.post('/api/logs/find_fromToken', async (req, res) => this.broker.call("logs.find_fromToken",{...req.body})) //! Search  FromToken	
			fastify.post('/api/logs/find_user_fromToken', async (req, res) => this.broker.call("logs.find_user_fromToken",{...req.body})) //! Search  FromToken	
			fastify.post('/api/logs/find_title_fromToken', async (req, res) => this.broker.call("logs.find_title_fromToken",{...req.body})) //! Search  FromToken	
			fastify.post('/api/logs/find_user_title_fromToken', async (req, res) => this.broker.call("logs.find_user_title_fromToken",{...req.body})) //! Search  FromToken	
		
			fastify.post('/api/logs/find_date_diff', async (req, res) => this.broker.call("logs.find_date_diff",{...req.body})) //! Search  Date_Diff	

			fastify.post('/api/logs/add', async (req, res) => this.broker.call("logs.add",{...req.body})) //! CREATE
			fastify.post('/api/logs/update', async (req, res) => this.broker.call("logs.update",{...req.body})) //! UPDATE
			fastify.post('/api/logs/delete/:id', async (req, res) => this.broker.call("logs.delete", { id: req.params.id, ...req.body })) //! DELETE
			fastify.post('/api/logs/delete_update/:id', async (req, res) => this.broker.call("logs.delete_update",{id: req.params.id,...req.body})) //! DELETED Update

		//!---------------- Logs son --------------------------------------------------------------------------------------------

						   		   			
		//!------------- Time  --------------------------------------------------------------------------------------------------

			fastify.get('/api/time/info',async (req,res)=> this.broker.call("time.info")) //! İnfo
			fastify.post('/api/time/post', async (req, res) => this.broker.call("time.post",{...req.body})) //! POST
			fastify.get('/api/time/html',async (req,res)=> this.broker.call("time.html")) //! Html
			fastify.get('/api/time/all', async (req, res) => this.broker.call("time.all")) //! All
			fastify.get('/api/time/:id', async (req, res) => this.broker.call("time.find",{id: req.params.id})) //! Search	

			fastify.post('/api/time/find_post', async (req, res) => this.broker.call("time.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/time/find_token', async (req, res) => this.broker.call("time.find_token", { ...req.body })) //!  Search-Token
			fastify.post('/api/time/find_user', async (req, res) => this.broker.call("time.find_user", { ...req.body })) //! Search User	
			fastify.post('/api/time/find_user_page', async (req, res) => this.broker.call("time.find_user_page", { ...req.body })) //! Search User - PageUrl

			fastify.post('/api/time/add', async (req, res) => this.broker.call("time.add",{...req.body})) //! CREATE		
			fastify.post('/api/time/update', async (req, res) => this.broker.call("time.update",{...req.body})) //! UPDATE
			fastify.post('/api/time/delete/:id', async (req, res) => this.broker.call("time.delete", { id: req.params.id, ...req.body })) //! DELETE
			fastify.post('/api/time/delete_update/:id', async (req, res) => this.broker.call("time.delete_update",{id: req.params.id,...req.body})) //! DELETED Update

			fastify.post('/api/time/loginOut', async (req, res) => this.broker.call("time.loginOut",{...req.body})) //! LoginOut		
			fastify.post('/api/time/time_difference', async (req, res) => this.broker.call("time.time_difference",{...req.body})) //! LoginOut		
			fastify.post('/api/time/convert_time', async (req, res) => this.broker.call("time.convert_time",{...req.body})) //! LoginOut		
			
		//!---------------- Time son ----------------------------------------------------------------------------------------------
				
		//!-------------  File --------------------------------------------------------------------------------------------------

			fastify.get('/api/file/info',async (req,res)=> this.broker.call("file.info")) //! İnfo
			fastify.post('/api/file/post', async (req, res) => this.broker.call("file.post",{...req.body})) //! POST
			fastify.get('/api/file/html',async (req,res)=> this.broker.call("file.html")) //! Html
			fastify.get('/api/file/all', async (req, res) => this.broker.call("file.all")) //! All

			fastify.get('/api/file/:id', async (req, res) => this.broker.call("file.find",{id: req.params.id})) //! Search
			fastify.post('/api/file/find_post', async	 (req, res) => this.broker.call("file.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/file/find_token', async (req, res) => this.broker.call("file.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/file/find_user', async (req, res) => this.broker.call("file.find_user", { ...req.body })) //! Search User	
			fastify.post('/api/file/find_usedpage', async (req, res) => this.broker.call("file.find_usedpage", { ...req.body })) //! Search User	
			fastify.post('/api/file/find_user_usedpage', async (req, res) => this.broker.call("file.find_user_usedpage", { ...req.body })) //! Search User - Tablo	
			
			fastify.post('/api/file/add', async (req, res) => this.broker.call("file.add",{...req.body})) //! CREATE
			fastify.post('/api/file/update', async (req, res) => this.broker.call("file.update",{...req.body})) //! UPDATE		
			fastify.post('/api/file/delete/:id', async (req, res) => this.broker.call("file.delete", { id: req.params.id,...req.body })) //! DELETE
			fastify.post('/api/file/delete_update/:id', async (req, res) => this.broker.call("file.delete_update",{id: req.params.id,...req.body})) //! DELETED Update
					
			fastify.post('/api/file/getFile',async (req,res)=> this.broker.call("file.getFile",{...req.body})) //! File Info
			fastify.post('/api/file/upload',async (req,res)=> this.broker.call("file.upload",{...req.body})) //! Upload
			fastify.post('/api/file/updateFile',async (req,res)=> this.broker.call("file.updateFile",{...req.body})) //! Upload
			fastify.post('/api/file/fileDeleteUrl',async (req,res)=> this.broker.call("file.fileDeleteUrl",{...req.body})) //! URLFile DELETE
			fastify.post('/api/file/getFileUrl',async (req,res)=> this.broker.call("file.getFileUrl",{...req.body})) //! URLFile Info 
			fastify.post('/api/file/uploadUrl',async (req,res)=> this.broker.call("file.uploadUrl",{...req.body})) //! URLFile Upload 
			fastify.post('/api/file/updateFileUrl',async (req,res)=> this.broker.call("file.updateFileUrl",{...req.body})) //! URLFile Upload 
		
		//!-------------  File --------------------------------------------------------------------------------------------------


		//!-------------  User --------------------------------------------------------------------------------------------------

    		fastify.get('/api/user/info',async (req,res)=> this.broker.call("user.info")) //! İnfo
			fastify.post('/api/user/post', async (req, res) => this.broker.call("user.post",{...req.body})) //! POST
			fastify.get('/api/user/html',async (req,res)=> this.broker.call("user.html")) //! Html
			fastify.get('/api/user/all', async (req, res) => this.broker.call("user.all")) //! All		

			fastify.get('/api/user/:id', async (req, res) => this.broker.call("user.find",{id: req.params.id})) //! Search
			fastify.post('/api/user/find_post', async	 (req, res) => this.broker.call("user.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/user/find_token', async (req, res) => this.broker.call("user.find_token",{...req.body})) //!  Search-Token
			fastify.post('/api/user/find_country', async (req, res) => this.broker.call("user.find_country",{...req.body})) //!  Search-Country
			fastify.post('/api/user/find_gender', async (req, res) => this.broker.call("user.find_gender",{...req.body})) //!  Search-Gender
			fastify.post('/api/user/find_dateofBirth', async (req, res) => this.broker.call("user.find_dateofBirth",{...req.body})) //!  Search-DateofBirth

			fastify.post('/api/user/add', async (req, res) => this.broker.call("user.add",{...req.body})) //! CREATE
			fastify.post('/api/user/update', async (req, res) => this.broker.call("user.update",{...req.body})) //! UPDATE
			fastify.post('/api/user/updateUrl', async (req, res) => this.broker.call("user.updateUrl",{...req.body})) //! UPDATE - URL
			fastify.post('/api/user/delete/:id', async (req, res) => this.broker.call("user.delete", { id: req.params.id, ...req.body })) //! DELETE
			fastify.post('/api/user/delete_update/:id', async (req, res) => this.broker.call("user.delete_update",{id: req.params.id,...req.body})) //! DELETED Update
			
			fastify.post('/api/user/loginOnline', async (req, res) => this.broker.call("user.loginOnline",{...req.body})) //! Login
			fastify.post('/api/user/loginOnlineUsername', async (req, res) => this.broker.call("user.loginOnlineUsername",{...req.body})) //! Login User
			fastify.post('/api/user/loginOut', async (req, res) => this.broker.call("user.loginOut",{...req.body})) //! Loginout
			fastify.post('/api/user/view/:id', async (req, res) => this.broker.call("user.view",{id: req.params.id,...req.body})) //!Search - View

		//!---------------- User son ----------------------------------------------------------------------------------------------


		//!------------- Message  --------------------------------------------------------------------------------------------------

			fastify.get('/api/message/info',async (req,res)=> this.broker.call("message.info")) //! İnfo
			fastify.post('/api/message/post', async (req, res) => this.broker.call("message.post",{...req.body})) //! POST
			fastify.get('/api/message/html',async (req,res)=> this.broker.call("message.html")) //! Html
			fastify.get('/api/message/all', async (req, res) => this.broker.call("message.all")) //! All

			fastify.get('/api/message/find/:id', async (req, res) => this.broker.call("message.find",{id: req.params.id})) //!Search	
			fastify.post('/api/message/find_post', async (req, res) => this.broker.call("message.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/message/find_token', async (req, res) => this.broker.call("message.find_token",{...req.body})) //!  Search-Token	
			fastify.post('/api/message/find_chat', async (req, res) => this.broker.call("message.find_chat",{...req.body})) //!  Search-Chat	

			fastify.post('/api/message/add', async (req, res) => this.broker.call("message.add",{...req.body})) //! CREATE		
			fastify.post('/api/message/update', async (req, res) => this.broker.call("message.update",{...req.body})) //! UPDATE
			fastify.post('/api/message/delete/:id', async (req, res) => this.broker.call("message.delete",{id: req.params.id,...req.body})) //! DELETE
			fastify.post('/api/message/delete_update/:id', async (req, res) => this.broker.call("message.delete_update",{id: req.params.id,...req.body})) //! DELETED Update
		    
			fastify.post('/api/message/view/:id', async (req, res) => this.broker.call("message.view",{id: req.params.id,...req.body})) //!Search - View
			fastify.post('/api/message/inbox', async (req, res) => this.broker.call("message.inbox",{...req.body})) //! Inbox
		
		//!---------------- Message son ----------------------------------------------------------------------------------------------


		//!------------- Note  --------------------------------------------------------------------------------------------------

			fastify.get('/api/note/info',async (req,res)=> this.broker.call("note.info")) //! İnfo
			fastify.post('/api/note/post', async (req, res) => this.broker.call("note.post",{...req.body})) //! POST
			fastify.get('/api/note/html',async (req,res)=> this.broker.call("note.html")) //! Html
			fastify.get('/api/note/all', async (req, res) => this.broker.call("note.all")) //! All
			fastify.get('/api/note/:id', async (req, res) => this.broker.call("note.find",{id: req.params.id})) //! Search	
			fastify.post('/api/note/find_post', async (req, res) => this.broker.call("note.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/note/find_token', async (req, res) => this.broker.call("note.find_token",{...req.body})) //!  Search-Token	
			fastify.post('/api/note/find_user', async (req, res) => this.broker.call("note.find_user", { ...req.body })) //!  Search-UserToken	
			
			fastify.post('/api/note/add', async (req, res) => this.broker.call("note.add",{...req.body})) //! CREATE		
			fastify.post('/api/note/update', async (req, res) => this.broker.call("note.update",{...req.body})) //! UPDATE
			fastify.post('/api/note/updated_delete/:id', async (req, res) => this.broker.call("note.updated_delete",{id:req.params.id,...req.body})) //! UPDATE DELETE
			fastify.post('/api/note/delete/:id', async (req, res) => this.broker.call("note.delete", { id: req.params.id, ...req.body })) //! DELETE
			fastify.post('/api/note/delete_update/:id', async (req, res) => this.broker.call("note.delete_update",{id: req.params.id,...req.body})) //! DELETED Update
				
	    //!---------------- Note son ----------------------------------------------------------------------------------------------


		
		//!------------- Faq  --------------------------------------------------------------------------------------------------

			fastify.get('/api/faq/info',async (req,res)=> this.broker.call("faq.info")) //! İnfo
			fastify.post('/api/faq/post', async (req, res) => this.broker.call("faq.post",{...req.body})) //! POST
			fastify.get('/api/faq/html',async (req,res)=> this.broker.call("faq.html")) //! Html
			fastify.get('/api/faq/all', async (req, res) => this.broker.call("faq.all")) //! All
			fastify.get('/api/faq/:id', async (req, res) => this.broker.call("faq.find",{id: req.params.id})) //! Search	
			fastify.post('/api/faq/find_post', async (req, res) => this.broker.call("faq.find_post",{...req.body})) //!  Search-Post
			fastify.post('/api/faq/find_token', async (req, res) => this.broker.call("faq.find_token",{...req.body})) //!  Search-Token	
			fastify.post('/api/faq/find_user', async (req, res) => this.broker.call("faq.find_user", { ...req.body })) //!  Search-UserToken	
			
			fastify.post('/api/faq/add', async (req, res) => this.broker.call("faq.add",{...req.body})) //! CREATE		
			fastify.post('/api/faq/update', async (req, res) => this.broker.call("faq.update",{...req.body})) //! UPDATE
			fastify.post('/api/faq/updated_delete/:id', async (req, res) => this.broker.call("faq.updated_delete",{id:req.params.id,...req.body})) //! UPDATE DELETE
			fastify.post('/api/faq/delete/:id', async (req, res) => this.broker.call("faq.delete", { id: req.params.id, ...req.body })) //! DELETE
			fastify.post('/api/faq/delete_update/:id', async (req, res) => this.broker.call("faq.delete_update",{id: req.params.id,...req.body})) //! DELETED Update
			fastify.post('/api/faq/view/:id', async (req, res) => this.broker.call("faq.view",{id: req.params.id,...req.body})) //!Search - View
		
		//!---------------- Faq son ----------------------------------------------------------------------------------------------



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
