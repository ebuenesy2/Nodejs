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
			
			//! Return Api
			ctx.params.title = "blogs.service"
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
				ctx.params.title = "blogs.service -> Tüm Veriler"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Blogs Tüm Veriler Okundu [ /api/blogs/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "blogs.service -> Tüm Veriler"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Blogs Tüm Veriler Okunamadı [ /api/blogs/all ] ' + '\u001b[0m');
				console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
			
			}

			//! Return
			return ctx.params
		},
		async find(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Blogs Veri Arama [ /api/blogs/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.DB = "Blogs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Blogs Veri Bulunamadı [ /api/blogs/find ] ' + '\u001b[0m');	
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_post(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Blogs Veri Arama [ /api/blogs/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.DB = "Blogs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Blogs Veri Bulunamadı [ /api/blogs/find_post ] ' + '\u001b[0m');	
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},	
		async find_token(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.blogToken == ctx.params.blogToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Blogs Veri Arama [ /api/blogs/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Arama"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.DB = "Blogs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Blogs Veri Bulunamadı [ /api/blogs/find_token ] ' + '\u001b[0m');	
			}

			//! Return
			delete ctx.params.blogToken

			return ctx.params
		},	 
		async add(ctx) {           

			try {

				//! Sabit
				let blogFileUrl=null;
				let blogUploadUrl=null;
	
				//! Resim Yükleme Onay - BlogImage
				if(ctx.params.blogImageControl=="0") { 	console.log('\u001b[' + 31 + 'm' + 'Blog Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.blogImageControl=="1") {
					console.log('\u001b[' + 32 + 'm' + 'Blog Resim Yükleme Onaylandı' + '\u001b[0m');  
	
					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload = await ctx.call('file.upload', {
						file: ctx.params.blogFile,
						role: ctx.params.role,
						userToken: ctx.params.userToken,                  
						usedPage: "blog"
					})     
					//! ----------- End File UPLOAD ----------------------------- 
					
					// Dosya Yükleme Kontrol
					if(file_upload.status==0) { 
						console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m');
						blogFileUrl=null;
						blogUploadUrl=null;
						}
					if(file_upload.status==1) { 
						console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m'); 
						blogFileUrl=file_upload.DB["fileUrl"];
						blogUploadUrl=file_upload.DB["uploadDir"];
					}
					// END Dosya Yükleme Kontrol		
				}
	
				//Console Yazma
				//console.log('\u001b[' + 32 + 'm' + 'BlogFileUrl : '+ blogFileUrl + '\u001b[0m')
				//Console.log('\u001b[' + 32 + 'm' + 'BlogUploadUrl : '+ blogUploadUrl + '\u001b[0m')

				//! Token
				let BlogId=new Date().getTime();

				let blogInfo={				
					id: BlogId,	
					userToken: ctx.params.userToken,
					blogImageControl:ctx.params.blogImageControl,
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
					id: BlogId,				
					userToken: ctx.params.userToken,
					blogImageControl:ctx.params.blogImageControl,
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

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}							

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> BLOG "); // Success
				});	
				//End Json içine Verileri Yazıyor -> db

				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "blogs",
					fromToken: jwt,
					name: "blogs_add_successful",
					description: "Blog Ekleme Başarılı"
				})			
				//! ----------- Log Son -----------------------------  


				//! Return Api	
				ctx.params.title = "blogs.service -> Veri Ekleme"
				ctx.params.tablo = "blogs.json"        
				ctx.params.status = 1			
				ctx.params.mesaj="Veri Eklendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Blog Veri Eklendi [ /api/blogs/addUrl ] ' + '\u001b[0m');
		


			} catch (error) {

				
				//! Return Api	
				ctx.params.title = "blogs.service -> Veri Ekleme"
				ctx.params.tablo = "blogs.json"        
				ctx.params.status = 0			
				ctx.params.mesaj="Veri Eklenemedi"

				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'Blog Veri Eklenemedi [ /api/blogs/addUrl ] ' + '\u001b[0m');

			}  
			

			//! Return	          
            delete ctx.params.role 
            delete ctx.params.userToken 
            delete ctx.params.blogImageControl            
            delete ctx.params.blogFile            
            delete ctx.params.blogDescription 
            delete ctx.params.blogContext 
            delete ctx.params.blogCategories 

			return ctx.params

		},
		async addUrl(ctx) {

			try {

						
				//! Sabit
				let blogFileUrl=null;
				let blogUploadUrl=null;

				//! Resim Yükleme Onay - BlogImage
				if(ctx.params.blogImageControl=="0") { 	console.log('\u001b[' + 31 + 'm' + 'Blog Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.blogImageControl=="1") {
						console.log('\u001b[' + 32 + 'm' + 'Blog Resim Yükleme Onaylandı' + '\u001b[0m');  

						//! -----------  File UPLOAD ----------------------------- 	
						let file_upload = await ctx.call('file.uploadUrl', {
							fileUrl: ctx.params.blogFileUrl,
							role: ctx.params.role,
							userToken: ctx.params.userToken,                  
							usedPage: "blog"
						})	
						//! ----------- End File UPLOAD ----------------------------- 
						
						// Dosya Yükleme Kontrol
						if(file_upload.status==0) { 
							console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m');
							blogFileUrl=null;
							blogUploadUrl=null;
						}
						if(file_upload.status==1) { 
							console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m'); 
							blogFileUrl=file_upload.DB["fileUrl"];
							blogUploadUrl=file_upload.DB["uploadDir"];
						}
						// END Dosya Yükleme Kontrol		
					}

				//Console Yazma
				//console.log('\u001b[' + 32 + 'm' + 'BlogFileUrl : '+ blogFileUrl + '\u001b[0m')
				//console.log('\u001b[' + 32 + 'm' + 'BlogUploadUrl : '+ blogUploadUrl + '\u001b[0m')


				//! Token
				let BlogId=new Date().getTime();

				let blogInfo={				
					id: BlogId,	
					userToken: ctx.params.userToken,
					blogImageControl:ctx.params.blogImageControl,
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
					id: BlogId,				
					userToken: ctx.params.userToken,
					blogImageControl:ctx.params.blogImageControl,
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

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}							

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> BLOG "); // Success
				});	
				//End Json içine Verileri Yazıyor -> db

				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "blogs",
					fromToken: jwt,
					name: "blogs_add_successful",
					description: "Blog Ekleme Başarılı"
				})			
				//! ----------- Log Son -----------------------------  


				//! Return Api	
				ctx.params.title = "blogs.service -> Veri Ekleme"
				ctx.params.tablo = "blogs.json"        
				ctx.params.status = 1			
				ctx.params.mesaj="Veri Eklendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Blog Veri Eklendi [ /api/blogs/addUrl ] ' + '\u001b[0m');
		


			} catch (error) {
				
				//! Return Api	
				ctx.params.title = "blogs.service -> Veri Ekleme"
				ctx.params.tablo = "blogs.json"        
				ctx.params.status = 0			
				ctx.params.mesaj="Veri Eklenemedi"

				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'Blog Veri Eklenemedi [ /api/blogs/addUrl ] ' + '\u001b[0m');

			}  


			//! Return	          
            delete ctx.params.userToken 
            delete ctx.params.role 
            delete ctx.params.blogImageControl 
            delete ctx.params.blogFileUrl 
            delete ctx.params.blogDescription 
            delete ctx.params.blogContext 
            delete ctx.params.blogCategories 

			return ctx.params

		},
		async update(ctx) {
			
			// ! Arama
			const dbFind = db.find(u => u.blogToken == ctx.params.blogToken); 

			//! Veri Varsa 
			if (dbFind) {

					
				//! Sabit
				let blogFileUrl=null;
				let blogUploadUrl=null;

				//! Resim Yükleme Onay - BlogImage
				if(ctx.params.blogImageControl=="0") { 	console.log('\u001b[' + 31 + 'm' + 'Blog Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.blogImageControl=="1") {
						console.log('\u001b[' + 32 + 'm' + 'Blog Resim Yükleme Onaylandı' + '\u001b[0m');  

						
						//! -----------  File UPLOAD ----------------------------- 	
						let file_upload = await ctx.call('file.updateFile', {
							old_fileUrl:dbFind.blogUploadUrl,
							file: ctx.params.blogFile,
							role: ctx.params.role,
							userToken: ctx.params.userToken,                  
							usedPage: "blog"
						})
						//! ----------- End File UPLOAD ----------------------------- 

						// Dosya Yükleme Kontrol
						if(file_upload.status==0) { 
							console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m');
							blogFileUrl=null;
							blogUploadUrl=null;
						}
						if(file_upload.status==1) { 
							console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m'); 
							blogFileUrl=file_upload.DB["fileUrl"];
							blogUploadUrl=file_upload.DB["uploadDir"];

							dbFind["blogFileUrl"] = blogFileUrl
							dbFind["blogUploadUrl"] = blogUploadUrl
						}
				}

				//Console Yazma
				//console.log('\u001b[' + 32 + 'm' + 'BlogFileUrl : '+ blogFileUrl + '\u001b[0m')
				//console.log('\u001b[' + 32 + 'm' + 'BlogUploadUrl : '+ blogUploadUrl + '\u001b[0m')


				//! Delete
				delete ctx.params.role
				delete ctx.params.blogFile 
							
				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="blogFile" || key!="role"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor
				
				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/blogs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Blog"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db
						
						

				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Güncelleme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Blog Güncellendi"	
				
				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Blog Veri Güncellendi [ /api/blogs/update ] ' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {

				//! Return Api   
				ctx.params.title = "blogs.service -> Veri Güncelleme"
				ctx.params.tablo = "blogs.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Blog Güncellenemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Blog Veri Güncellenemedi [ /api/blogs/update ] ' + '\u001b[0m');

			}	
			

           	//! Return	          
			delete ctx.params.blogToken 
			delete ctx.params.role 
			delete ctx.params.userToken 
			delete ctx.params.blogImageControl            
			delete ctx.params.blogFile            
			delete ctx.params.blogDescription 
			delete ctx.params.blogContext 
			delete ctx.params.blogCategories       

			return ctx.params	  

		},
		async updateUrl(ctx) {
			
			// ! Arama
			const dbFind = db.find(u => u.blogToken == ctx.params.blogToken); 

			console.log(dbFind);
		

           	//! Return	          
			delete ctx.params.blogToken 
			delete ctx.params.role 
			delete ctx.params.userToken 
			delete ctx.params.blogImageControl            
			delete ctx.params.blogFileUrl            
			delete ctx.params.blogDescription 
			delete ctx.params.blogContext 
			delete ctx.params.blogCategories       

			return ctx.params	  

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

			   // Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
				
					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Mesaj"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db	
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "mesaj",
					fromToken: dbFind.MessageToken,
					name: "message_delete_successful",
                    description: "Mesaj Silme Başarılı"
				})	
				delete ctx.params.userToken 		
				//! ----------- Log Son -----------------------------  
				
                //! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Silindi [ /api/message/update ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Mesaj Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Silinemedi [ /api/message/update ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.userToken

			return ctx.params	

		}
	}
}
