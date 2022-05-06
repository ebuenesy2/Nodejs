'use strict';
const http = require('http'); //! Html
const dayjs = require('dayjs'); //! Zaman
const dotenv = require('dotenv'); // ! env
const fs = require("fs"); //! Dosya
const path = require("path"); //! Dosya
const mkdir = require("mkdirp").sync; //! Dosya
const mime = require("mime-types"); //! Dosya
const sharp = require('sharp');  //! Dosya Yükleme
const { stat } = require('fs/promises'); //! Dosya
const { Console } = require('console'); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/file.json'); //! Json

//! -------  Yeni Klasor -------------------
const uploadDir = path.join(__dirname, "/../public/upload"); //! Upload Klasor
mkdir(uploadDir); //! Upload Klasor

//user
const userUploadDir = path.join(__dirname, "/../public/upload/user"); //! User ->  Upload Klasor
const userUploadDirImage = path.join(__dirname, "/../public/upload/user/img");  //! User ->  Resim
const userUploadDirVideo = path.join(__dirname, "/../public/upload/user/video");  //! User ->  Video
const userUploadDirDoc = path.join(__dirname, "/../public/upload/user/doc");  //! User ->  Belge
mkdir(userUploadDir); //! User ->  Upload Klasor
mkdir(userUploadDirImage);  //! User ->  Resim
mkdir(userUploadDirVideo);  //! User ->  Video
mkdir(userUploadDirDoc);  //! User ->  Belge

//admin
const adminUploadDir = path.join(__dirname, "/../public/upload/admin"); //! Admin ->  Upload Klasor
const adminUploadDirImage = path.join(__dirname, "/../public/upload/admin/img");  //! Admin ->  Resim
const adminUploadDirVideo = path.join(__dirname, "/../public/upload/admin/video");  //! Admin ->  Video
const adminUploadDirDoc = path.join(__dirname, "/../public/upload/admin/doc");  //! Admin ->  Belge
mkdir(adminUploadDir); //! Admin ->  Upload Klasor
mkdir(adminUploadDirImage);  //! Admin ->  Resim
mkdir(adminUploadDirVideo);  //! Admin ->  Video
mkdir(adminUploadDirDoc);  //! Admin ->  Belge


//message
const messageUploadDir = path.join(__dirname, "/../public/upload/message"); //! message ->  Upload Klasor
const messageUploadDirImage = path.join(__dirname, "/../public/upload/message/img");  //! message ->  Resim
const messageUploadDirVideo = path.join(__dirname, "/../public/upload/message/video");  //! message ->  Video
const messageUploadDirDoc = path.join(__dirname, "/../public/upload/message/doc");  //! message ->  Belge
mkdir(messageUploadDir); //! message ->  Upload Klasor
mkdir(messageUploadDirImage);  //! message ->  Resim
mkdir(messageUploadDirVideo);  //! message ->  Video
mkdir(messageUploadDirDoc);  //! message ->  Belge

//faq
const faqUploadDir = path.join(__dirname, "/../public/upload/faq"); //! faq ->  Upload Klasor
const faqUploadDirImage = path.join(__dirname, "/../public/upload/faq/img");  //! faq ->  Resim
const faqUploadDirVideo = path.join(__dirname, "/../public/upload/faq/video");  //! faq ->  Video
const faqUploadDirDoc = path.join(__dirname, "/../public/upload/faq/doc");  //! faq ->  Belge
mkdir(faqUploadDir); //! faq ->  Upload Klasor
mkdir(faqUploadDirImage);  //! faq ->  Resim
mkdir(faqUploadDirVideo);  //! faq ->  Video
mkdir(faqUploadDirDoc);  //! faq ->  Belge

//note
const noteUploadDir = path.join(__dirname, "/../public/upload/note"); //! note ->  Upload Klasor
const noteUploadDirImage = path.join(__dirname, "/../public/upload/note/img");  //! note ->  Resim
const noteUploadDirVideo = path.join(__dirname, "/../public/upload/note/video");  //! note ->  Video
const noteUploadDirDoc = path.join(__dirname, "/../public/upload/note/doc");  //! note ->  Belge
mkdir(noteUploadDir); //! note ->  Upload Klasor
mkdir(noteUploadDirImage);  //! note ->  Resim
mkdir(noteUploadDirVideo);  //! note ->  Video
mkdir(noteUploadDirDoc);  //! note ->  Belge


//! -------  Yeni Klasor Son -------------------


module.exports = {
	name: "file",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "file.service -> Info"
			ctx.params.table = "file.json"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL=process.env.APi_URL
		
            return ctx.params
		},
		async post(ctx) {

			//! Return Api
			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		},
		async html(ctx) {
		
            ctx.meta.$responseType = "text/html";
            return Buffer.from(`
                    <html>
                    <body>
                        <h1>Hello API ebu enes!</h1>
                        <img src="/api/file.image" />
                    </body>
                    </html>
            `);
			
		},
		async all(ctx) {

			try {

				//! Return Api   
				ctx.params.title = "file.service -> Tüm Veriler"
				ctx.params.table = "file.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [All] Tüm Veriler Okundu [ /api/file/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "file.service -> Tüm Veriler"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [All] Tüm Veriler Okunamadı [ /api/file/all ] ' + '\u001b[0m');
				console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
			
			}

			//! Return
			return ctx.params
		},
		async find(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Arama [ /api/file/:id ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/:id ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_post(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Post Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Post Arama [ /api/file/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Post Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/find_post ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			//! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);	

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Token Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Token Arama [ /api/file/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/find_token ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.token

			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken);

			// ! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Kullanıcı Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
                ctx.params.size=dbFind.length
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Kullanıcı Arama [ /api/file/find_user ] ' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Kullanıcı Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/find_user ] ' + '\u001b[0m');				

			}

			//! Return
			delete ctx.params.created_byToken

			return ctx.params
		},
		async find_usedpage(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.usedPage == ctx.params.usedPage);

			// ! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Kullanıcı Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
                ctx.params.size=dbFind.length
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Kullanıcı Arama [ /api/file/find_usedpage ] ' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Kullanıcı Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/find_usedpage ] ' + '\u001b[0m');				

			}

			//! Return
			delete ctx.params.usedPage

			return ctx.params
		},
		async find_user_usedpage(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken && u.usedPage == ctx.params.usedPage);

			// ! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 1
                ctx.params.size=dbFind.length
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Find] Veri Arama [ /api/file/find_user_usedpage ] ' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Find] Veri Bulunamadı [ /api/file/find_user_usedpage ] ' + '\u001b[0m');				

			}

			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.usedPage

			return ctx.params
		},
		async add(ctx) {
		
			try {

				//! Token
				let TokenId=new Date().getTime();
				let CreateDate=new Date();			

				let TokenInfo={				
					id: TokenId,
					role: ctx.params.role,				
					usedPage:ctx.params.usedPage,
					FileId: ctx.params.FileId
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				

				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,
					role: ctx.params.role,
					usedPage:ctx.params.usedPage,
					FileId: ctx.params.FileId,
					uploadDir: ctx.params.uploadDir,
					fileName: ctx.params.fileName,
					fileType: ctx.params.fileType,
					fileTypeSplit: ctx.params.fileTypeSplit,
					fileOnlyName: ctx.params.fileOnlyName,
					fileExt: ctx.params.fileExt,
					token:jwt,				
					created_at: CreateDate,
					created_byToken:ctx.params.created_byToken,
					isUpdated:false,
					updated_at: null,
					updated_byToken : null,
					isActive: true,
				    isDeleted:false,
					Deleted_at: null,
					Deleted_byToken:null
				}

				//Verileri Kaydet
				db.push(willSaveData)

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	

				});				

				//! ----------- Log ----------------------------- 	
				 let logs_add = await ctx.call('logs.add', {
				 	table: "file",
				 	title: "file_add_successful",
					description: "Dosya Ekleme Başarılı",
					logStatus:"successful",
					fromToken: jwt,
					created_byToken: ctx.params.created_byToken
				 })				

				if(logs_add.status=="1") { 	console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if(logs_add.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


				//! Return Api   
				ctx.params.title = "file.service -> Veri Ekleme"
				ctx.params.table = "file.json"			
				ctx.params.status = 1
				ctx.params.message="Veri Eklendi"		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Add] Veri Eklendi [ /api/file/add ] ' + '\u001b[0m');


			} catch (error) {


				//! Return Api   
				ctx.params.title = "file.service -> Veri Ekleme"
				ctx.params.table = "file.json"			
				ctx.params.status = 0
				ctx.params.message="Veri Eklenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Add] Veri Eklenemedi [ /api/file/add ] ' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.created_byToken
			delete ctx.params.usedPage
			delete ctx.params.FileId
			delete ctx.params.uploadDir

			delete ctx.params.fileName
			delete ctx.params.fileType
			delete ctx.params.fileTypeSplit
			delete ctx.params.fileOnlyName
			delete ctx.params.fileExt


			return ctx.params

		},
		async update(ctx) 	{

			// ! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);		

			//! Veri Varsa 
			if (dbFind) {

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {
					dbFind[key] = ctx.params[key]
				})		
				dbFind["isUpdated"] = true
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor		

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

				     
					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Update] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[File]  [Json] [Update] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	

				});
				// End Json içine Verileri Yazıyor -> db			


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "file",
					title: "file_update_successful",
					description: "Dosya Güncelleme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


			    //! Return Api
				ctx.params.title = "file.service -> Veri Güncelleme"
				ctx.params.table = "file.json"			
				ctx.params.status = 1
				ctx.params.message="Veri Güncellendi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Update] Veri Güncellendi [ /api/file/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {


				//! Return Api
				ctx.params.title = "file.service -> Veri Güncelleme"
				ctx.params.table = "file.json"			
				ctx.params.status = 0
				ctx.params.message="Veri Güncellenemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Update] Veri Güncellenemedi [ /api/file/update ]' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.token
			delete ctx.params.updated_byToken

			delete ctx.params.fileName

			return ctx.params

		},
		async delete(ctx) {			
		
			//! Arama
			var index = db.findIndex(a => a.id == ctx.params.id);
			const dbFind = db.find(u => u.id == ctx.params.id);

			if (index > -1) {				

				//! -----------  File Delete ----------------------------- 	
				let file_delete = await ctx.call('file.fileDeleteUrl', {
					created_byToken: ctx.params.userToken,
					fileUrl: dbFind.uploadDir                 
				})                
				//! ----------- End File Delete -----------------------------
				
				if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[File] [Delete] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[File] [Delete] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {


					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Delete] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Delete] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	
				});
				// End Json içine Verileri Yazıyor -> db				

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "file",
					title: "file_delete_successful",
					description: "Dosya Silme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api
				ctx.params.title = "file.service -> Veri Silme"
				ctx.params.table = "file.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"				

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Delete] Veri Silindi [ /api/file/delete ]' + '\u001b[0m');

			} else {


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "file",
					title: "file_delete_error",
					description: "Dosya Silme Başarısız",
					logStatus: "error",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api
				ctx.params.title = "file.service -> Veri Silme"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Delete] Veri Silinemedi [ /api/file/delete ]' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.id
			delete ctx.params.Deleted_byToken

			return ctx.params

		}, 	
		async delete_update(ctx) 	{

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);		
             
            //! Veri Varsa 
			if (dbFind) {

				//! Güncelleme
				dbFind["isDeleted"] = true
				dbFind["isActive"] = false
				dbFind["Deleted_at"] = new Date()
				dbFind["Deleted_byToken"] = ctx.params.Deleted_byToken	

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {


					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Deleted_Update] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Deleted_Update] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	
				});
				// End Json içine Verileri Yazıyor -> db		


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "file",
					title: "file_delete_update_successful",
					description: "Dosya Geçisi Silme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.Deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Deleted_Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Deleted_Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


			    //! Return Api
				ctx.params.title = "file.service -> Veri Geçisi Silme"
				ctx.params.table = "file.json"			
				ctx.params.status = 1
				ctx.params.message="Veri Güncellendi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Update] Veri Güncellendi [ /api/file/delete_update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {

				//! Return Api
				ctx.params.title = "file.service -> Veri Geçisi Silme"
				ctx.params.table = "file.json"			
				ctx.params.status = 0
				ctx.params.message="Veri Güncellenemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Update] Veri Güncellenemedi [ /api/file/delete_update ]' + '\u001b[0m');

			}			
		
			//! Return
			delete ctx.params.id
			delete ctx.params.token
			delete ctx.params.Deleted_byToken
			delete ctx.params.isDeleted
			delete ctx.params.isActive		

			return ctx.params

		},
        async getFile(ctx) {

			try {
            
				//! File 
				let file=ctx.params.file[0]

				let fileName=ctx.params.file[0].filename //manzara-sozleri-2021-manzara-ile-ilgili-sozler-14079504_8148_amp.jpg
				let fileType=ctx.params.file[0].mimetype //image/jpeg
				let fileTypeSplit = file.mimetype.split('/')[0]; //image

				
				//! Dosya tanımlama işlemi yapıyor
				let extName = path.extname(fileName); //dosya uzantısı - [ .jpg ]
				let baseName = path.basename(fileName, extName); //dosya adı - [ ]


				//! ------ Dosya Ölçüleri ------------
					let fizeWidth = 0;
					let fizeHeight = 0;
					let fileSize=0;

					if(fileTypeSplit=="image"){
						
					await sharp(file.data)
							.metadata()
							.then(({ width, height, size, format }) => {

								fizeWidth=width;
								fizeHeight=height;
								fileSize=size;
								
							});
					}

				//! ------ Dosya Ölçüleri  Son ------------
	
		
				//! Return Api
				ctx.params.title = "file.service -> Dosya Bilgileri"
				ctx.params.table = "file.json"
				if(fileName!="") { ctx.params.status = 1 }
				if(fileName=="") { ctx.params.status = 0 }
				
				ctx.params.fileName=fileName
				ctx.params.fileType=fileType
				ctx.params.fileTypeSplit=fileTypeSplit

				ctx.params.fileOnlyName=baseName
				ctx.params.fileExt=extName

				ctx.params.fizeWidth=fizeWidth
				ctx.params.fizeHeight=fizeHeight
				ctx.params.fileSize=fileSize

				//Console Yazma
				if(fileName!="") { console.log('\u001b[' + 32 + 'm' + '[File] [GetFile] Dosya Bilgileri Alındı [ /api/file/getFile ]' + '\u001b[0m'); }
				if(fileName=="") { console.log('\u001b[' + 31 + 'm' + '[File] [GetFile] Dosya Bilgileri Alınamadı [ /api/file/getFile ]' + '\u001b[0m'); }


			} catch (error) {

				//! Return Api
				ctx.params.title = "file.service -> Dosya Bilgileri"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				
				ctx.params.fileName="Dosya Bulunamadı"
				ctx.params.fileType="Dosya Bulunamadı"
				ctx.params.fileTypeSplit="Dosya Bulunamadı"

				ctx.params.fileOnlyName="Dosya Bulunamadı"
				ctx.params.fileExt="Dosya Bulunamadı"

				ctx.params.fizeWidth=0
				ctx.params.fizeHeight=0
				ctx.params.fileSize=0
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [GetFile] Dosya Bilgileri Bulunamadı [ /api/file/getFile ]' + '\u001b[0m');

			}

			//! Return Delete
			delete ctx.params.file		

			return ctx.params
		},
        async upload(ctx) {
		
			try {
				let APi_URL=process.env.APi_URL; //! Api
				let status=0; //! status

				//! Dosya Bilgileri Alıyor
				let file=ctx.params.file[0]
				let fileName=ctx.params.file[0].filename //manzara-sozleri-2021-manzara-ile-ilgili-sozler-14079504_8148_amp.jpg
				let fileType=ctx.params.file[0].mimetype //image/jpeg
				let fileTypeSplit = file.mimetype.split('/')[0]; //image
				let extName = path.extname(fileName); //dosya uzantısı - [ .jpg ]
				let baseName = path.basename(fileName, extName); //dosya adı - [ ]             
				let FileId=new Date().getTime()+extName;  //! Yeni Dosya Id

				//! Kayıt Yeri ve Yeni Dosya Adı		
				let filePath="";
				let fileUrl="";
				let fileData="";
				let usedPage=ctx.params.usedPage;			
				
				if(fileTypeSplit=="image"){ filePath=uploadDir+"\\"+usedPage+"\\img\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//img//"+FileId; }
				else if(fileTypeSplit=="video"){ filePath=uploadDir+"\\"+usedPage+"\\video\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//video//"+FileId; }
				else { filePath=uploadDir+"\\"+usedPage+"\\doc\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//doc//"+FileId; }
		    
				//! Dosya Boyutları
				let fizeWidth = 0;
				let fizeHeight = 0;
				let fileSize=0;		
					      	
			
				//! Dosya Varsa
				if(fileName!="") { 				
				
					//! Yükleme
					if(fileTypeSplit=="image"){				

						await sharp(file.data)
							.metadata()
							.then(({ width, height, size, format }) => {
							
								fizeWidth=width;
								fizeHeight=height;
								fileSize=size;

								sharp(file.data)					
								.toBuffer().then(data => {
									fs.writeFile(filePath, data, (err) => {
										if (err) throw Error("[File] [Media]  Dosya yüklenirken hata oluştu.")
										else return true
									});
								})
								
							});
						
					} //! img

					else if(fileTypeSplit=="video"){				

						await new Promise((res, rej) => {
							fs.writeFile(filePath, file.data, (err) => {
								if (err) rej(err)
								else res(true);
							});
						});

						
					} //! video

					else {
					
						await new Promise((res, rej) => {
							fs.writeFile(filePath, file.data, (err) => {

								if (err) rej(err)
								else res(true);
							});
						});
			
					} //! doc

					//! Json				
					try {

						//! Token
						let TokenId=new Date().getTime();
						let CreateDate=new Date();			

						let TokenInfo={				
							id: TokenId,							
							role: ctx.params.role,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							created_byToken: ctx.params.created_byToken
						}
						
						const secret = 'secret';
						const data = TokenInfo;
						const jwt = sign(data, secret);		
						//! End Token				

						//! Eklenecek veriler
						const willSaveData = {
							id: TokenId,						
							role: ctx.params.role,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							token:jwt,							
							created_at: CreateDate,
							created_byToken:ctx.params.created_byToken,
							isUpdated:false,
							updated_at: null,
							updated_byToken : null,
							isActive: true,
							isDeleted:false,
							isDeleted_at: null,
							isDeleted_byToken:null
						}

						//Verileri Kaydet
						db.push(willSaveData)

						//Data Verileri Alıyor
						fileData=willSaveData;


						// Json içine Verileri Yazıyor -> db
						fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {
						
							// Hata varsa
							if (err) {
								console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Upload] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
								console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
							}							

							//Console Yazma
							console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Upload] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	

						});

						status = 1; //! Status

						//! ----------- Log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {
							table: "file",
							title: "file_upload_successful",
							description: "Dosya Yükleme Başarılı",
							logStatus: "successful",
							fromToken: jwt,
							created_byToken: ctx.params.created_byToken
						})

						if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Upload] Bildirim Eklendi' + '\u001b[0m'); }
						if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Upload] Bildirim Eklenemedi' + '\u001b[0m'); }
				     	//! ----------- Log Son -----------------------------

						
					} catch (error) {  
						
						fileData=""; //! Dosya Bilgileri
						status = 0; //! Status
						logs_add=""; //! Log
						
					}
					//! Json Son

				}

				else {

					fileData=""; //! Dosya Bilgileri
					status = 0; //! Status
					logs_add=""; //! Log
				}			

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.table = "file.json"        
				ctx.params.status = status				
				ctx.params.DB=fileData
				ctx.params.message="Dosya Yüklendi"
				
				//Console Yazma
				if(status==1) { console.log('\u001b[' + 32 + 'm' + '[File] [Upload] Dosya Yüklendi [ /api/file/upload ]' + '\u001b[0m'); }
				if(status==0) { console.log('\u001b[' + 31 + 'm' + '[File] [Upload] Dosya Yüklenemedi [ /api/file/upload ]' + '\u001b[0m'); }
				
			} catch (error) {	
					
				//! Return Api
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.table = "file.json" 
				ctx.params.status = 0
				ctx.params.DB="Dosya Yüklenemedi"
				ctx.params.message="Dosya Yüklenemedi"								

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Upload] Dosya Yüklenemedi [ /api/file/upload ]' + '\u001b[0m');
				console.log(error);

			}

			//! Return Delete		
			delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.created_byToken
			delete ctx.params.usedPage
			delete ctx.params.file
			
			return ctx.params
			
		},
		async updateFile(ctx) { 
		
			//! -----------  File UPLOAD ----------------------------- 	
			let file_upload = await ctx.call('file.upload', {
				file: ctx.params.file,
				role: ctx.params.role,
				created_byToken: ctx.params.created_byToken,                  
				usedPage: ctx.params.usedPage
			})
			//! ----------- End File UPLOAD -----------------------------		
            
			if(file_upload.status==1) {

				//! -----------  File Delete ----------------------------- 	
				let file_delete = await ctx.call('file.fileDeleteUrl', {
					created_byToken: ctx.params.created_byToken,
					fileUrl: ctx.params.old_fileUrl                 
				})                
    			//! ----------- End File Delete ----------------------------- 

				if (file_delete.status == 1) { console.log('\u001b[' + 32 + 'm' + '[File] [UpdateFile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete.status == 0) { console.log('\u001b[' + 31 + 'm' + '[File] [UpdateFile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				
		    }

			//! ----------- Return ----------------------------- 
			if (file_upload.status == 1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.table = "file.json"        
				ctx.params.status = 1
				ctx.params.DB=file_upload.DB
				ctx.params.message="Dosya Güncellendi"
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [UpdateFile] Dosya Güncellendi [ /api/file/updateFile ]' + '\u001b[0m');
            }
			else if(file_upload.status==0) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.table = "file.json"        
				ctx.params.status = 0	
				ctx.params.DB="Dosya Güncellenmedi"
				ctx.params.message="Dosya Güncellenmedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [UpdateFile] Dosya Güncellenmedi [ /api/file/updateFile ]' + '\u001b[0m');
            }
			//! ----------- Return Son ------------------------- 
			
		     
			//! Return Delete	
			delete ctx.params.old_fileUrl			
			delete ctx.params.file			
			delete ctx.params.role
			delete ctx.params.userToken
			delete ctx.params.usedPage
			delete ctx.params.created_byToken
			
			return ctx.params				
		},		
		async fileDeleteUrl(ctx) { //! File Delete

			//! Tanım
			let status = 0;		
			let message = ""; //! Mesaj
			let fileUrlParams = ctx.params.fileUrl; //! File Url

			//! Arama
			const dbFind = db.find(u => u.uploadDir == fileUrlParams);

			try {

				let filecheck = fs.existsSync(fileUrlParams) //! Dosya Varsa [ true / false]

				if (filecheck == true) {

					// dosya silme
					fs.unlink(fileUrlParams, (err) => {

						// hata varsa
						if (err) {
							console.error(err)
							return
						}
					})

					if (dbFind.token != "") {

						//! ----------- log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {
							table: "file",
							title: "file_delete_successful",
							description: "Dosya Silme Başarılı",
							logStatus: "successful",
							fromToken: dbFind.token,
							created_byToken: ctx.params.created_byToken
						})

						if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
						if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }
						//! ----------- Log Son -----------------------------

					}

					//! return
					status = 1;
					message = "Dosya Silindi";

					//console yazma
					console.log('\u001b[' + 32 + 'm' + '[File] [Delete] Dosya Silindi [ /api/file/filedeleteurl ]' + '\u001b[0m');

				}
				else {
					status = 0;
					message = "Dosya Bulunamadı";

					//console yazma
					console.log('\u001b[' + 31 + 'm' + '[File] [Delete] Dosya Bulunamadı [ /api/file/filedeleteurl ]' + '\u001b[0m');
				}

			} catch (error) {

				status = 0;
				message = "Dosya Silinemedi";				

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Delete] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m')
				console.log(error);
			}

			//! Return Api
			ctx.params.title = "Dosya Silme"
			ctx.params.table = "file.json"
			ctx.params.status = status
			ctx.params.message = message

			//! Return Delete
			delete ctx.params.created_byToken
			delete ctx.params.fileUrl

			return ctx.params
		},		
		async getFileUrl(ctx) {           
			
			try
			{	
				//! File
				let fileUrl=ctx.params.fileUrl; //! Dosya Adresi - [ C:\\ENES\\Githup\\Nodejs\\public\\upload\\user\\img\\1636206003059.jpg ]
				let dirUrl=path.dirname(fileUrl); //! Klasor Adresi -[ C:\ENES\Githup\Nodejs\public\upload\user\img ]

				let fileName=path.basename(fileUrl); //! Dosya Adı - [ 1636206003059.jpg ]			
				let extName=path.extname(fileUrl); //! Dosya Uzamtısı - [.jpg]
				let baseName = path.basename(fileName, extName); //! Dosya Adı - [ 1636206003059 ]		   

				let fileType=mime.lookup(fileUrl); //! image/jpeg
				let fileTypeSplit = fileType.split('/')[0]; //! image

		
				//! ------ Dosya Ölçüleri ------------
					let fizeWidth = 0;
					let fizeHeight = 0;				

					if(fileTypeSplit=="image"){
						
						await sharp(fileUrl)
						.metadata()
						.then(({ width, height, size, format }) => {
							fizeWidth=width;
							fizeHeight=height;					
						});
					}

				//! ------ Dosya Ölçüleri  Son ------------

				//! ------ Dosya Boyut ------------
	
					//! Ölçü
					const stats = fs.statSync(fileUrl);
					let fileSize=stats.size;
		
					//console.log('File Ölçüleri');
					//console.log('FileSize:',fileSize);				
	
				//! ------ Dosya Boyut  Son ------------

				
				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.table = "file.json"
				if(fileName!="") { ctx.params.status = 1 }
				if(fileName=="") { ctx.params.status = 0 }			
				
				ctx.params.fileName=fileName
				ctx.params.fileType=fileType
				ctx.params.fileTypeSplit=fileTypeSplit

				ctx.params.fileOnlyName=baseName
				ctx.params.fileExt=extName	
								
				ctx.params.fizeWidth=fizeWidth
				ctx.params.fizeHeight=fizeHeight
				ctx.params.fileSize=fileSize

				//Console Yazma
				if(fileName!="") { console.log('\u001b[' + 32 + 'm' + '[File] [GetFile] Dosya Bilgileri Alıyor [ /api/file/getFileUrl ]' + '\u001b[0m'); }
				if(fileName=="") { console.log('\u001b[' + 31 + 'm' + '[File] [GetFile] Dosya Bulunamadı [ /api/file/getFileUrl ]' + '\u001b[0m'); }
			
			} catch (error) {

				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.table = "file.json"
				ctx.params.status = 0
				
				ctx.params.fileName="Dosya Bulunamadı"
				ctx.params.fileType="Dosya Bulunamadı"
				ctx.params.fileTypeSplit="Dosya Bulunamadı"

				ctx.params.fileOnlyName="Dosya Bulunamadı"
				ctx.params.fileExt="Dosya Bulunamadı"

				ctx.params.fizeWidth=0
				ctx.params.fizeHeight=0
				ctx.params.fileSize=0
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [GetFile] Dosya Bulunamadı [ /api/file/getFileUrl ]' + '\u001b[0m');
				console.log(error);
			}
			
			//! Return
			delete ctx.params.fileUrl;

			return ctx.params

		},
		async uploadUrl(ctx) {	
				
			let APi_URL=process.env.APi_URL; //! Api
			let status=0; //! status	
			let fileData=""; //! File
			let logs_add=""; //! Log

			try
			{	
				//! File
				let fileUrl=ctx.params.fileUrl; //! Dosya Adresi - [ C:\\ENES\\Githup\\Nodejs\\public\\upload\\user\\img\\1636206003059.jpg ]
				let dirUrl=path.dirname(fileUrl); //! Klasor Adresi -[ C:\ENES\Githup\Nodejs\public\upload\user\img ]
				let fileName=path.basename(fileUrl); //! Dosya Adı - [ 1636206003059.jpg ]			
				let extName=path.extname(fileUrl); //! Dosya Uzamtısı - [.jpg]
				let baseName = path.basename(fileName, extName); //! Dosya Adı - [ 1636206003059 ]  
				
				let fileType=mime.lookup(fileUrl); //! image/jpeg
				let fileTypeSplit = fileType.split('/')[0]; //! image
				let FileId=new Date().getTime()+extName;  //! Yeni Dosya Id				

				//! Kayıt Yeri ve Yeni Dosya Adı		
				let filePath="";
				let fileUrl_Api="";				
				let usedPage=ctx.params.usedPage;			
				
				if(fileTypeSplit=="image"){ filePath=uploadDir+"\\"+usedPage+"\\img\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//img//"+FileId; }
				else if(fileTypeSplit=="video"){ filePath=uploadDir+"\\"+usedPage+"\\video\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//video//"+FileId; }
				else { filePath=uploadDir+"\\"+usedPage+"\\doc\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//doc//"+FileId; }					
						

				//! Dosya Varsa
				if(fileUrl!="") { 	
					
					//! ------ Dosya Ölçüleri ------------
						let fizeWidth = 0;
						let fizeHeight = 0;								
	
						if(fileTypeSplit=="image"){
							
							await sharp(fileUrl)
							.metadata()
							.then(({ width, height, size, format }) => {
	
								fizeWidth=width;
								fizeHeight=height;

								sharp(fileUrl)					
								.toBuffer().then(data => {
									fs.writeFile(filePath, data, (err) => {
										if (err) throw Error("Media yüklenirken hata oluştu.")
										else return true
									});
								})
								
							});
						}
                        	
					//! ------ Dosya Ölçüleri  Son ------------
	
					//! ------ Dosya Boyut ------------
		
						//! Ölçü
						const stats = fs.statSync(fileUrl);
						let fileSize=stats.size;
			
					//! ------ Dosya Boyut  Son ------------		
					
				
					//! Json				
					try {

                      //! Token
						let TokenId=new Date().getTime();
						let CreateDate=new Date();			

						let TokenInfo = {
							id: TokenId,
							role: ctx.params.role,
							usedPage: ctx.params.usedPage,
							FileId: FileId,
							created_byToken: ctx.params.created_byToken
						}
						
						const secret = 'secret';
						const data = TokenInfo;
						const jwt = sign(data, secret);		
						//! End Token					
						
						//! Eklenecek veriler
						const willSaveData = {
							id: TokenId,						
							role: ctx.params.role,							
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl_Api,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							token:jwt,							
							created_at: CreateDate,
							created_byToken:ctx.params.created_byToken,
							isUpdated:false,
							updated_at: null,
							updated_byToken : null,
							isActive: true,
							isDeleted:false,
							Deleted_at: null,
							Deleted_byToken:null
						}

						//Verileri Kaydet
						db.push(willSaveData)

						//Data Verileri Alıyor
						fileData=willSaveData;


						// Json içine Verileri Yazıyor -> db
						fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {
						
							// Hata varsa
							if (err) {
								console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Upload] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');	
								console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
							}							

							//Console Yazma
							console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Upload] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');	

						});

						status = 1; //! Status


						//! ----------- Log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {
							table: "file",
							title: "file_upload_successful",
							description: "Dosya Yükleme Başarılı",
							logStatus: "successful",
							fromToken: jwt,
							created_byToken: ctx.params.created_byToken
						})

						if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Upload] Bildirim Eklendi' + '\u001b[0m'); }
						if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Upload] Bildirim Eklenemedi' + '\u001b[0m'); }
				     	//! ----------- Log Son -----------------------------
													
					} catch (error) {

						status = 0; //! Status
						fileData=""; //! Dosya Bilgileri
						logs_add=""; //! Log	
					}
					//! Json Son
										
				} else {

					status = 0; //! Status
					fileData=""; //! Dosya Bilgileri
					logs_add=""; //! Log				
				}			
						
			
			} catch (error) {

				status=0; //! Status
				fileData=""; //! Dosya Bilgileri
				logs_add=""; //! Log	
				console.log(error); //! Error

			}

			//Console Yazma
			if(status==1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.table = "file.json"        
				ctx.params.status = status				
				ctx.params.DB=fileData
				ctx.params.message="Dosya Yüklendi"	

				//Console Yazma
				if(status==1) { console.log('\u001b[' + 32 + 'm' + '[File] [Upload] Dosya Yüklendi [ /api/file/uploadUrl ]' + '\u001b[0m'); }
				if(status==0) { console.log('\u001b[' + 31 + 'm' + '[File] [Upload] Dosya Yüklenemedi [ /api/file/uploadUrl ]' + '\u001b[0m'); }
			}
			if(status==0) { 

				//! Return Api
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.table = "file.json" 
				ctx.params.status = 0
				ctx.params.DB="Dosya Yüklenemedi"
				ctx.params.message="Dosya Yüklenemedi"								

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Upload] Dosya Yüklenemedi [ /api/file/uploadUrl ]' + '\u001b[0m');			
			 }

			
			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.fileUrl
			delete ctx.params.role
			delete ctx.params.usedPage
			
		    return ctx.params

		},
		async updateFileUrl(ctx) {
		
			//! -----------  File UPLOAD ----------------------------- 	
			let file_upload = await ctx.call('file.uploadUrl', {
				fileUrl: ctx.params.fileUrl,
				role: ctx.params.role,
				usedPage: ctx.params.usedPage,
				created_byToken: ctx.params.created_byToken
			})		
			//! ----------- End File UPLOAD ----------------------------- 	
            
			if(file_upload.status==1) {

				//! -----------  File Delete ----------------------------- 	
				let file_delete = await ctx.call('file.fileDeleteUrl', {
					created_byToken: ctx.params.userToken,
					fileUrl: ctx.params.old_fileUrl                 
				})                
				//! ----------- End File Delete -----------------------------
				
				if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[File] [Upload] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[File] [Upload] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
			
		    }

			//! ----------- Return ----------------------------- 
			if(file_upload.status==1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.table = "file.json"        
				ctx.params.status = 1
				ctx.params.DB=file_upload.DB	
				ctx.params.message="Dosya Güncellendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[File] [Update] Dosya Güncellendi [ /api/file/updateFileUrl ]' + '\u001b[0m');
            }
			else if(file_upload.status==0) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.table = "file.json"        
				ctx.params.status = 0
				ctx.params.DB="Dosya Güncellenmedi"		
				ctx.params.message="Dosya Güncellenmedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[File] [Update] Dosya Güncellenmedi [ /api/file/updateFileUrl ]' + '\u001b[0m');
            }
			//! ----------- Return Son ------------------------- 
			
		     
			//! Return Delete	
			delete ctx.params.old_fileUrl			
			delete ctx.params.fileUrl		
			delete ctx.params.file			
			delete ctx.params.role
			delete ctx.params.userToken
			delete ctx.params.usedPage	
			delete ctx.params.created_byToken		
			
			return ctx.params				
		}	
	}
}
