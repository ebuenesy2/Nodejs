'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const db = require('../public/DB/settings.json'); //! Json




module.exports = {
	name: "settings",

	actions: {
		async info(ctx) {
			ctx.params.title = "settings.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL = process.env.APi_URL

			return ctx.params
		},
		async post(ctx) {

			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		},
		async all(ctx) {

			//JSON        

			ctx.params.title = "settings Tüm Veriler"
			ctx.params.time = dayjs().toDate()
			ctx.params.size=db.length
			ctx.params.DB = db

			return ctx.params
		},
		async find(ctx) {


			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			/*
			let follow = await ctx.call('follow.follow', {
				user_id: ctx.params.id
			})
			*/


			// Kullanıcı Varsa
			if (user) {

				let user_logs = await ctx.call('logs.find_user', {
					email: user.email
				})


				//api
				ctx.params.title = "Admin Arama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.data_settings = user
				//ctx.params.data_user_logs = user_logs

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Admin Araama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 0
				ctx.params.data_settings = "Admin Bulunmadı"
				//ctx.params.data_user_logs = ""
				
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ admin/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},		
		async update(ctx) {
			

			//pass by reference
			Object.keys(ctx.params).forEach(key => {
				db[0][key] = ctx.params[key]
			})
			
			db[0]["updated_at"] = new Date()			
		

             
			//! ********   File Update #1 **********************		
			//! File UPLOAD #1
			let file_upload = await ctx.call('file.upload', {
				token: ctx.params.token,
				file: ctx.params.home1_ImageUrl_File,
				role: "admin",
				userToken: ctx.params.userToken,                  
				usedPage: "Settings"
			})
				
			ctx.params.file_upload = file_upload
			//console.log('\u001b[' + 32 + 'm' + 'File Upload ' + '\u001b[0m')    
			//console.log(file_upload)         
			//! End File Upload

			//console.log('\u001b[' + 32 + 'm' + 'file_upload Image Url : '+ file_upload.uploadDir + '\u001b[0m')
			//console.log('\u001b[' + 32 + 'm' + 'file_upload fileUrl : '+ file_upload.fileUrl + '\u001b[0m')
			//console.log('\u001b[' + 31 + 'm' + 'file_upload status : '+ file_upload.status + '\u001b[0m')
			//console.log('\u001b[' + 31 + 'm' + 'settings home1_FileUrl : '+ db[0]['home1_FileUrl'] + '\u001b[0m')		
			//console.log('\u001b[' + 32 + 'm' + 'settings home1_ImageUrl : '+ db[0]['home1_UploadUrl'] + '\u001b[0m')		

            
			//! File Update
			if(file_upload.status==1) { 
				//console.log('\u001b[' + 32 + 'm' + 'settings Image Url  : '+ db[0].home1_UploadUrl + '\u001b[0m')				
			}  
			//if(ctx.params.file_upload.status==0) { console.log("Dosya Yok"); } 


			//! File Url Update		
			if(file_upload.status==1) { 

				//console.log('\u001b[' + 32 + 'm' + 'settings Image Url -> Update : '+ db[0].home1_ImageUrl + '\u001b[0m')

				//! File Delete #1
				let file_delete = await ctx.call('file.fileDelete', {
					token: "token",
					userToken: ctx.params.userToken,                  
					fileUrl:  db[0].home1_UploadUrl
				})

				ctx.params.file_delete = file_delete  
				//console.log('\u001b[' + 32 + 'm' + 'File Delete ' + '\u001b[0m')      
			    //console.log(file_delete)         
				//! End File Delete

				//! Update FİLE 
				db[0]["home1_FileUrl"] = file_upload.fileUrl;  
				db[0]["home1_UploadUrl"] = file_upload.uploadDir;               
			}			
			
			//!! Delete
			delete ctx.params.home1_ImageUrl_File
			delete ctx.params.file_upload
			delete ctx.params.file_delete	
			
			delete db[0]["home1_ImageUrl_File"]

		    //! End File Url Update	
			//! ********  End Of File Update #1 **********************		


			//! ********   File Update #2 **********************
			//! File UPLOAD #2
			file_upload = await ctx.call('file.upload', {
				token: ctx.params.token,
				file: ctx.params.home2_ImageUrl_File,
				role: "admin",
				userToken: ctx.params.userToken,                  
				usedPage: "Settings"
			})
				
			ctx.params.file_upload = file_upload
			//console.log('\u001b[' + 32 + 'm' + 'File Upload ' + '\u001b[0m')    
			//console.log(file_upload)         
			//! End File Upload

			/*
			console.log('\u001b[' + 32 + 'm' + 'file_upload #2 Image Url : '+ file_upload.uploadDir + '\u001b[0m')
			console.log('\u001b[' + 32 + 'm' + 'file_upload #2 fileUrl : '+ file_upload.fileUrl + '\u001b[0m')
			console.log('\u001b[' + 31 + 'm' + 'file_upload #2 status : '+ file_upload.status + '\u001b[0m')
			console.log('\u001b[' + 31 + 'm' + 'settings home2_FileUrl : '+ db[0]['home2_FileUrl'] + '\u001b[0m')		
			console.log('\u001b[' + 32 + 'm' + 'settings home2_UploadUrl : '+ db[0]['home2_UploadUrl'] + '\u001b[0m')
			*/
				
            
			//! File Update
			if(file_upload.status==1) { 
				//console.log('\u001b[' + 32 + 'm' + 'settings Image Url #2 : '+ db[0].home2_UploadUrl + '\u001b[0m')				
			}  
			//if(ctx.params.file_upload.status==0) { console.log("Dosya Yok"); } 


			//! File Url Update		
			if(file_upload.status==1) { 

				//console.log('\u001b[' + 32 + 'm' + 'settings Image Url : '+ db[0].home1_UploadUrl + '\u001b[0m')

				//! File Delete #2
				let file_delete2 = await ctx.call('file.fileDelete', {
					token: "token",
					userToken: ctx.params.userToken,                  
					fileUrl:  db[0].home2_UploadUrl
				})

				ctx.params.file_delete = file_delete2  
				//console.log('\u001b[' + 32 + 'm' + 'File Delete ' + '\u001b[0m')      
			    //console.log(file_delete)         
				//! End File Delete #2

				//! Update FİLE 
				db[0]["home2_FileUrl"] = file_upload.fileUrl;  
				db[0]["home2_UploadUrl"] = file_upload.uploadDir;                 
			}			
			
			//!! Delete
			delete ctx.params.home2_ImageUrl_File
			delete ctx.params.file_upload
			delete ctx.params.file_delete	
			
			delete db[0]["home2_ImageUrl_File"]

		    //! End File Url Update	
			//! ********  End Of File Update #2 **********************			
	                     

			//! Json Update
			fs.writeFile('./public/DB/settings.json', JSON.stringify(db), err => {

				// Checking for errors
				if (err) {
					console.log(err)
				}

				console.log("Json writing"); // Success
			});


			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')


			//! Logs Ekleme		
			let logs_add = await ctx.call('logs.add', {
					token: "token",
					userToken: ctx.params.userToken,					
					name: "settings_update_successful",
					description: "Ayarlar Güncelleme Yapıldı"
			})	
			
			//!! Return -> Api
			ctx.params.title = "settings Guncelleme"
			ctx.params.tablo = "settings.json"
			ctx.params.status = 1
			ctx.params.data_settings = db[0]
			ctx.params.data_logs = logs_add

			delete ctx.params.userToken
			delete ctx.params.home1_ImageUrl_File
			delete ctx.params.home1_description
			delete ctx.params.home1_context
			delete ctx.params.home2_ImageUrl_File
			delete ctx.params.home2_description
			delete ctx.params.home2_context

			return ctx.params

		}
	
	}
}
