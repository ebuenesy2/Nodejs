'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/blogs.json'); //! Json




module.exports = {
	name: "blogs",

	actions: {
		async info(ctx) {
			ctx.params.title = "blogs.service"
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

			ctx.params.title = "blogs Tüm Veriler"
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
				ctx.params.title = "Blogs Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.data_blog = user
				//ctx.params.data_user_logs = user_logs

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Blogs Araama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.data_blog = "Blogs Bulunmadı"
				//ctx.params.data_user_logs = ""
				
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ admin/:userId ]  Blogs Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
        async add(ctx) {		
			try {

                //! Return
                ctx.params.title = "Blogs Json Ekleme"
                ctx.params.tablo = "blogs.json"           
                ctx.params.status = 1
        

                //! File UPLOAD
                let file_upload = await ctx.call('file.upload', {
                    token: ctx.params.token,
                    file: ctx.params.blogImageUrl,
                    role: "admin",
                    userToken: ctx.params.userToken,                  
                    usedPage: "Blog"
                })

                ctx.params.file_upload = file_upload    
                //console.log(file_upload)         
                delete ctx.params.blogImageUrl //! delete 
                //! End File Upload

               //! Tanım
               let blogUploadUrl="";
               let blogFileUrl="";
			   let blogImageControlHave="0";

               if(ctx.params.file_upload.status==1) {  blogUploadUrl=ctx.params.file_upload.uploadDir; blogFileUrl=ctx.params.file_upload.fileUrl; blogImageControlHave="1"; }
               if(ctx.params.file_upload.status==0) {  blogUploadUrl=null; blogFileUrl=null; blogImageControlHave="0"; }
               //! End File Url Update

			   //! Token
			   let BlogId=new Date().getTime();

			   let blogInfo={
					token: ctx.params.token,
					id: BlogId,	
					userToken: ctx.params.userToken,
					blogImageControl:blogImageControlHave,
					blogFileUrl: blogFileUrl,
					blogUploadUrl: blogUploadUrl,
					blogDescription: ctx.params.blogDescription,
					blogContext: ctx.params.blogContext,
					blogCategories: ctx.params.blogCategories			
			   }
			    
			   const secret = 'secret';
			   const data = blogInfo;
			   const jwt = sign(data, secret);		
			   //! End Token	
			   
				//! Eklenecek veriler
				const willSaveData = {
                    token: ctx.params.token,
					id: BlogId,				
					userToken: ctx.params.userToken,
					blogImageControl:blogImageControlHave,
					blogFileUrl: blogFileUrl,
					blogUploadUrl: blogUploadUrl,
					blogDescription: ctx.params.blogDescription,
					blogContext: ctx.params.blogContext,
					blogCategories: ctx.params.blogCategories,
					blogToken:jwt,			
					created_at: new Date(),
                    updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});

                //! Logs Add                    
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "blogs_add_successful",
                    description: "Blog Ekleme Yapıldı"
                })

                ctx.params.data_logs = logs_add
                //! End Logs Add

				//console
				console.log('\u001b[' + 32 + 'm' + 'Blog Yazıldı' + '\u001b[0m')     			
    

			} catch (error) {

				//! Status
				ctx.params.status = 0

			}
          
           
			//! Return - Delete
			delete ctx.params.token
			delete ctx.params.userToken
			delete ctx.params.blogDescription
			delete ctx.params.blogContext
			delete ctx.params.blogCategories

			delete ctx.params.blogImageUrl //! delete 
           
			return ctx.params

		},	
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.blogToken == ctx.params.blogToken);

			// Kullanıcı Varsa
			if (user) { 
				
				//! Tanım
				let file_upload=[];

				//! Resim Var Mı
				let blogImageControlHave=ctx.params.blogImageControlHave; 
				if(blogImageControlHave==0) { 

					console.log('\u001b[' + 31 + 'm' + 'Blog Resim Onaylanmadı' + '\u001b[0m');
					
					//! File Delete
					let file_delete = await ctx.call('file.fileDelete', {
						token: ctx.params.token,
						userToken: ctx.params.userToken,                  
						fileUrl: user.blogUploadUrl
					})

				}
				if(blogImageControlHave==1) { 
					
					console.log('\u001b[' + 32 + 'm' + 'Blog Resim Onay' + '\u001b[0m'); 

					//! File UPLOAD
					file_upload = await ctx.call('file.upload', {
						token: ctx.params.token,
						file: ctx.params.blogImageUrl_File,
						role: "admin",
						userToken: ctx.params.userToken,                  
						usedPage: "Blog"
					})
					
					ctx.params.file_upload = file_upload
					//console.log('\u001b[' + 32 + 'm' + 'File Upload ' + '\u001b[0m')    
					//console.log(file_upload)         
					//! End File Upload

					//console.log('\u001b[' + 31 + 'm' + 'user blogUploadUrl : '+ user.blogUploadUrl + '\u001b[0m')
					//console.log('\u001b[' + 32 + 'm' + 'file_upload Image Url : '+ file_upload.uploadDir + '\u001b[0m')
					//console.log('\u001b[' + 32 + 'm' + 'file_upload status : '+ file_upload.status + '\u001b[0m')			
								
					//! File Url Update
					let blogUploadUrl="";
					if(file_upload.status==1) { 

						console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m')
						//console.log('\u001b[' + 32 + 'm' + 'Blog Image Url : '+ user.blogUploadUrl + '\u001b[0m')

						//! File Delete
						let file_delete = await ctx.call('file.fileDelete', {
							token: ctx.params.token,
							userToken: ctx.params.userToken,                  
							fileUrl: user.blogUploadUrl
						})

						//ctx.params.file_delete = file_delete  
						//console.log('\u001b[' + 32 + 'm' + 'File Delete ' + '\u001b[0m')      
						//console.log(file_delete)         
						//! End File Delete

						//! Update FİLE 
						user["blogUploadUrl"] = file_upload.uploadDir;                 
						user["blogFileUrl"] = file_upload.fileUrl;                 
					}			

					//if(ctx.params.file_upload.status==1) { console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m') }  
					//if(ctx.params.file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleneme Hatalı' + '\u001b[0m')  }  
					//! End File Url Update				 


					//!! Delete
					delete ctx.params.file_upload
					delete ctx.params.file_delete
					delete ctx.params.blogImageUrl_File									

					//!! Update - only Text -   pass by reference
					Object.keys(ctx.params).forEach(key => {
					
						if(key!="blogUploadUrl" || key!="title" || key!="tablo" || key!="status" ) { user[key] = ctx.params[key] }  //! Only Text 
					
					})
					//!! End Update - only Text -   pass by reference				
					
					//! Update FİLE 
					if(file_upload.status==1) {  user["blogUploadUrl"] = file_upload.uploadDir; user["blogFileUrl"] = file_upload.fileUrl; }           		
					if(file_upload.status==0) {  user["blogUploadUrl"] = user.blogUploadUrl;  user["blogFileUrl"] = user.blogFileUrl;}         		
			
		    	}

				//! -------------- Update -----------	
				user["blogImageControl"] = blogImageControlHave
				user["updated_at"] = new Date()  

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleneme Hatalı' + '\u001b[0m')
						console.log(err)
					}

					console.log("Blogs Güncelleme Yapıldı"); // Success
				});
				//! -------------- End Update -----------

				

				//! -------------- Logs Ekleme	  -----------					
				 let logs_add = await ctx.call('logs.add', {
					 token: ctx.params.token,
					 userToken: ctx.params.userToken,				
					 name: "blogs_update_successful",
					 description: "Blog Güncelleme Yapıldı"
				 })
				 //! -------------- Logs Ekleme	 Son  -----------		

				 //console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')		
				                 
                 //! Return Api				
				ctx.params.title = "Blogs Guncelleme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1				
				ctx.params.data_blogs = user
				ctx.params.file_upload = file_upload
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {

				//api			
				ctx.params.title = "Blogs Guncelleme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0			
			    ctx.params.file_upload = "Blogs Bulunmadı"
				ctx.params.data_blogs =  "Blogs Bulunmadı"
				ctx.params.data_logs = "Blogs Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Blogs Bulunamadı' + '\u001b[0m');		
			}
               
			
			//! Retun Delete
			delete ctx.params.token
            delete ctx.params.userToken
            delete ctx.params.userId
            delete ctx.params.blogImageUrl
            delete ctx.params.blogDescription
            delete ctx.params.blogContext
            delete ctx.params.blogCategories	

			delete  ctx.params.file_upload
            delete ctx.params.blogToken
            delete ctx.params.blogImageUrl_File
            delete ctx.params.blogImageControlHave
					

			return ctx.params

		},
        async delete(ctx) {
		
			const user = db.find(u => u.blogToken == ctx.params.blogToken); 	// ! find
			var index = db.findIndex(a => a.blogToken === ctx.params.blogToken); 	// ! findIndex
			if (index > -1) {
				db.splice(index, 1);


                 //! Delete Json
				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});
                //! End Delete Json

                
                
                //! File Delete
                //console.log('\u001b[' + 32 + 'm' + 'Blog Image Url : '+ user.blogImageUrl + '\u001b[0m')
                if(user.blogImageUrl==null) {  console.log('\u001b[' + 31 + 'm' + 'Blog Image Url : Yok'+ '\u001b[0m') }
                else { 
                    
                    console.log('\u001b[' + 32 + 'm' + 'Blog Image Url : Var'+ '\u001b[0m')
                    console.log('\u001b[' + 32 + 'm' + 'Blog Image Url : '+ user.blogImageUrl + '\u001b[0m')

                    
                    //! File Delete
                    let file_delete = await ctx.call('file.fileDelete', {
                        token: ctx.params.token,
                        userToken: ctx.params.userToken,                  
                        fileUrl: user.blogImageUrl
                    })

                    //ctx.params.file_delete = file_delete  
                    console.log('\u001b[' + 32 + 'm' + 'File Delete ' + '\u001b[0m')      
                    console.log(file_delete)         
                    //! End File Delete                    
                }       	

				//! -------------- Logs Ekleme	  -----------					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userId: ctx.params.userId,
					name: "blog_delete_successful",
					description: "Blog Silme Başarılı"
				})
				//! -------------- Logs Ekleme	 Son  -----------		
                
				//! Return Api
				ctx.params.title = "Blogs Silme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Blogs Silindi"
				ctx.params.data_blogs=user
				ctx.params.data_logs= logs_add

			} else {

				//api
				ctx.params.title = "Blogs Silme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Blogs Bulunmadı"
				ctx.params.data_blogs = "Blogs Bulunmadı"
				ctx.params.data_logs=  "Blogs Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:id ]  Blogs Bulunamadı' + '\u001b[0m');
			}


			//! ------------------
			//console
			console.log('\u001b[' + 32 + 'm' + 'Blog Silme' + '\u001b[0m')

			return ctx.params

		}	
	}
}
