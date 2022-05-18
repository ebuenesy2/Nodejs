'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/admin.json'); //! Json


module.exports = {
	name: "admin",

	actions: {
		async info(ctx) {
		
			//! Return Api
			ctx.params.title = "admin.service -> Info"
			ctx.params.table = "admin.json"
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
				ctx.params.title = "admin.service -> Tüm Veriler"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [All] Tüm Veriler Okundu [ /api/admin/all ]' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "admin.service -> Tüm Veriler"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [All] Tüm Veriler Okunamadı [ /api/admin/all ] ' + '\u001b[0m');
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
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Find] Kullanıcı Veri Arama [ /api/admin/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Find] Kullanıcı Veri Bulunamadı [ /api/admin/find ] ' + '\u001b[0m');		
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
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Find] Kullanıcı Veri Arama [ /api/admin/find_post ]' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Find] Kullanıcı Veri Bulunamadı [ /api/admin/find_post ]' + '\u001b[0m');		
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
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Find] Kullanıcı Veri Arama [ /api/admin/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "admin.service -> Veri Arama"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Find] Kullanıcı Veri Bulunamadı [ /api/admin/find_token ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.token

			return ctx.params
		},
		async add(ctx) {
	
			try {

				    //! Sabit
				    let error_check=0;    
				    let status=0;    
				    let message="";    

					// ! Find
					const admin_email = db.find(u => u.email == ctx.params.email);
					const admin_username = db.find(u => u.username == ctx.params.username);
					const admin_tel = db.find(u => u.tel == ctx.params.tel);

					//! email check
					if(admin_email) {
						error_check=1
						status = 0
						message = "Bu Email Kayıtlıdır."			
					}

					//! email check
					if(ctx.params.email==""||ctx.params.email==null) {
						error_check=1
						status = 0
						message = "Email Boş Geçiremez."						
					}

					//! username check
					if(admin_username) {
						error_check=1
						status = 0
						message = "Bu Kullanıcı Adı [ username ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.username==""||ctx.params.username==null) {
						error_check=1
						status = 0
						message = "Kullanıcı Adı [ username ] Boş Geçiremez."						
					}

					
					//! tel check
					if(admin_tel) {
						error_check=1
						status = 0
						message = "Bu Telefon Numarası [ tel ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.tel==""||ctx.params.tel==null) {
						error_check=1
						status = 0
						message = "Bu Telefon Numarası [ tel ] Kayıtlıdır."					
					}
                    
					
					if(error_check==0) {

							//! Ortak
							let TokenId=new Date().getTime();
							let DateNow=new Date();

							let TokenInfo={				
								id: TokenId,
								role:"admin",	
								name: ctx.params.name,
								surname: ctx.params.surname
							}

							
							const secret = 'secret';
							const data = TokenInfo;
							const jwt = sign(data, secret);		
							//! End Token				
				
						
							//! Eklenecek veriler
							const willSaveData = {
								id: TokenId,							
								role:"admin",
								name: ctx.params.name,
								surname: ctx.params.surname,
								userImageUrl: null,
								userImageUploadUrl: null,
								coverImageUrl: null,
								coverImageUploadUrl: null,
								username: ctx.params.username,
								email: ctx.params.email,
								tel: ctx.params.tel,
								password: ctx.params.password,								
								token:jwt,
								onlineStatus:0,												
								onlineLastLogin_At:null,												
								onlineLastLoginout_At:null,												
								created_at: DateNow,
								created_byToken:ctx.params.created_byToken,
								updated_at: null,
								updated_byToken:null,
								isActive:true,
								isDeleted:false,
								Deleted_at:null,
								Deleted_byToken:null
							}				

							//Verileri Kaydet
							db.push(willSaveData)

							//Json içine Verileri Yazıyor -> db
							fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

								// Hata varsa
								if (err) {
									console.log('\u001b[' + 31 + 'm' + '[Admin] [Json] [Add] Json Veri Kayıt Edilemedi [ admin.json ] ' + '\u001b[0m');	
									console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
								}							

								//Console Yazma
								console.log('\u001b[' + 32 + 'm' + '[Admin] [Json] [Add] Json Veri Kayıt Edildi [ admin.json ] ' + '\u001b[0m');								
								
							});

							//! ----------- Log ----------------------------- 	
							let logs_add = await ctx.call('logs.add', {
								table: "admin",
								title: "admin_add_successful",
								description: "Admin Ekleme Başarılı",
								logStatus: "successful",
								fromToken: jwt,
								created_byToken: ctx.params.created_byToken ? ctx.params.created_byToken : jwt
							})

							if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
							if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

							//! ----------- Log Son -----------------------------

							//! Return Api   
							status = 1	
							message="Veri Eklendi"	
					}

					//! Return Api   
					ctx.params.title = "admin.service -> Veri Ekleme"
					ctx.params.table = "admin.json"
					ctx.params.status = status
					ctx.params.message = message	

					//Console Yazma
					if(status==1) { console.log('\u001b[' + 32 + 'm' + '[Admin] [Add] Admin Veri Eklendi [ /api/admin/add ]' + '\u001b[0m'); }
					if (status == 0) {
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Add] Admin Veri Eklenemedi [ /api/admin/add ]' + '\u001b[0m');
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Add] Error: '+message + '\u001b[0m');
					}
										
													    
				} catch (error) {

                    //! Return Api   
					ctx.params.title = "admin.service -> Veri Ekleme"
					ctx.params.table = "admin.json"			
					ctx.params.status = 0
					ctx.params.message = "Veri Eklenemedi"			

					//Console Yazma
					console.log('\u001b[' + 31 + 'm' + '[Admin] [Add] Admin Veri Eklenemedi [ /api/admin/add ]' + '\u001b[0m');

				}


				//! Return Delete				
				delete ctx.params.name
				delete ctx.params.surname
				delete ctx.params.email
				delete ctx.params.username

				delete ctx.params.tel
				delete ctx.params.password
			    delete ctx.params.created_byToken

				return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);

		    	// Kullanıcı Varsa
			if (dbFind) {

				//! Tanım
				let file_upload=[]; 			
				
				//! Resim Yükleme Onay - Profil
				if(ctx.params.profil_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Profile] Profil Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.profil_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Profile] Profil Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.upload', {
						file: ctx.params.profil_ImageUrl_File,
						role: ctx.params.role,
						token: ctx.params.token,                  
						usedPage: "admin"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							token: ctx.params.token,
							fileUrl: dbFind.userImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
					
						//! Güncelleme
						dbFind["userImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["userImageUrl"] = file_upload.DB["fileUrl"];	
					}
				}

				//! Resim Yükleme Onay - Cover
				if(ctx.params.cover_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Cover] Cover Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.cover_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Cover] Cover Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.upload', {
						file: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						token: ctx.params.token,                  
						usedPage: "admin"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							token: ctx.params.token,
							fileUrl: dbFind.coverImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						
						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["coverImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["coverImageUrl"] = file_upload.DB["fileUrl"];		
					}	
				}

				//! Delete
				delete ctx.params.profil_ImageUrl_File
				delete ctx.params.profil_ImageUrl_File_Check
				delete ctx.params.cover_ImageUrl_File
				delete ctx.params.cover_ImageUrl_File_Check

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="profil_ImageUrl_File" || key!="cover_ImageUrl_File"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["isUpdated"] = true
				dbFind["updated_at"] = new Date()
			
				// End  Referans Veriler Güncelleme Yapıyor
				
		        // Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Json] [Update] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Json] [Update] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');	
				});	
				// End Json içine Verileri Yazıyor -> db

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "admin",
					title: "admin_update_successful",
					description: "Admin Güncelleme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }				
				//! ----------- Log Son -----------------------------

				//! Return Api   
				ctx.params.title = "admin.service -> Veri Guncelleme"
				ctx.params.table = "admin.json"			
				ctx.params.status = 1
				ctx.params.message = "Veri Güncellendi"	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] Admin Kayıt Güncellendi [ /api/admin/update ] ' + '\u001b[0m');			         

			}

			//! Kullanıcı Yoksa
			else {

				//! Return Api   
				ctx.params.title = "admin.service -> Veri Guncelleme"
				ctx.params.table = "admin.json"			
				ctx.params.status = 0
				ctx.params.message = "Veri Guncellenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] Admin Kayıt Guncellenemedi [ /api/admin/update ] ' + '\u001b[0m');

			}

			//! Return Delete			
            delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.profil_ImageUrl_File
            delete ctx.params.profil_ImageUrl_File_Check
			delete ctx.params.cover_ImageUrl_File
            delete ctx.params.cover_ImageUrl_File_Check
			delete ctx.params.updated_byToken
							
			delete ctx.params.name
			delete ctx.params.surname
			delete ctx.params.email
			delete ctx.params.username
			delete ctx.params.tel
			delete ctx.params.password

			return ctx.params

		},
		async updateUrl(ctx){
		
			// ! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);		

			//! Veri Varsa 
			if (dbFind) {

	            //! Tanım
				let file_upload=[]; 			
				
				//! Resim Yükleme Onay - Profil
				if(ctx.params.profil_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Profile] Profil Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.profil_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Profile] Profil Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.uploadUrl', {
						fileUrl: ctx.params.profil_ImageUrl_File,
						role: ctx.params.role,
						token: ctx.params.token,                  
						usedPage: "admin"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Profile] Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Profile] Dosya Yüklendi' + '\u001b[0m'); }

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							token: ctx.params.token,
							fileUrl: dbFind.userImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------
					
						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["userImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["userImageUrl"] = file_upload.DB["fileUrl"];	
					}
				

				//! Resim Yükleme Onay - Cover
				if(ctx.params.cover_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Cover] Cover Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.cover_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Cover] Cover Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.uploadUrl', {
						fileUrl: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						token: ctx.params.token,                  
						usedPage: "admin"
					})
					//! ----------- End File UPLOAD ----------------------------- 	

				
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							userToken: ctx.params.userToken,
							fileUrl: dbFind.coverImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["coverImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["coverImageUrl"] = file_upload.DB["fileUrl"];											
					}	
				}

				//! Delete
				delete ctx.params.profil_ImageUrl_File
				delete ctx.params.profil_ImageUrl_File_Check
				delete ctx.params.cover_ImageUrl_File
				delete ctx.params.cover_ImageUrl_File_Check

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="profil_ImageUrl_File" || key!="cover_ImageUrl_File"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["isUpdated"] = true
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor
				

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Json] [Update] Json Veri Kayıt Edilemedi [ admin.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Json] [Update] Json Veri Kayıt Edildi [ admin.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
				

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "admin",
					title: "admin_update_successful",
					description: "Admin Güncelleme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }				
				//! ----------- Log Son -----------------------------

				//! Return Api   
				ctx.params.title = "admin.service -> Veri Guncelleme"
				ctx.params.table = "admin.json"			
				ctx.params.status = 1
				ctx.params.message = "Veri Güncellendi"	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Update] Admin Veri Güncellendi [ /api/admin/updateUrl ] ' + '\u001b[0m');		

			}

			//! Veri Yoksa 
			else {

				//! Return Api   
				ctx.params.title = "admin.service -> Veri Guncelleme"
				ctx.params.table = "admin.json"			
				ctx.params.status = 0
				ctx.params.message = "Veri Guncellenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Update] Admin  Veri Guncellenemedi [ /api/admin/updateUrl ] ' + '\u001b[0m');

			}

			
			//! Return Delete			
            delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.profil_ImageUrl_File
            delete ctx.params.profil_ImageUrl_File_Check
			delete ctx.params.cover_ImageUrl_File
            delete ctx.params.cover_ImageUrl_File_Check
			delete ctx.params.updated_byToken
							
			delete ctx.params.name
			delete ctx.params.surname
			delete ctx.params.email
			delete ctx.params.username
			delete ctx.params.tel
			delete ctx.params.onlineStatus
			delete ctx.params.onlineLastLogin_At
			delete ctx.params.onlineLastLoginout_At
			

			return ctx.params		
		},	
		async delete(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
                
				//! ----------- Json Delete ----------------------------- 	
				db.splice(index, 1);

			
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Json] [Delete] Json Veri Kayıt Edilemedi [ admin.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Json] [Delete] Json Veri Kayıt Edildi [ admin.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
				//! ----------- Json Delete  Son ----------------------------- 	
				
				
				//! -----------  File Delete ----------------------------- 	
				let file_delete_user = await ctx.call('file.fileDeleteUrl', {
					token: ctx.params.token,
					fileUrl: dbFind.userImageUploadUrl               
				})                
				//! ----------- End File Delete -----------------------------

				if (file_delete_user.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Delete] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete_user.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Delete] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

				//! -----------  File Delete ----------------------------- 	
				let file_delete_cover = await ctx.call('file.fileDeleteUrl', {
					token: ctx.params.token,
					fileUrl: dbFind.coverImageUploadUrl               
				})                
				//! ----------- End File Delete -----------------------------

												
				if (file_delete_cover.status==1)  { console.log('\u001b[' + 32 + 'm' + '[Admin] [Delete] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete_cover.status==0)  { console.log('\u001b[' + 31 + 'm' + '[Admin] [Delete] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "admin",
					title: "admin_delete_successful",
					description: "Admin Silme Başarılı",
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
				//! Return Api
				ctx.params.title = "admin.service -> Veri Silme"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Delete] Veri Silindi [ /api/admin/delete ]' + '\u001b[0m');	
	        	
			} else {
				
				//! Return Api
				ctx.params.title = "admin.service -> Veri Silme"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Delete] Veri Silinemedi [ /api/admin/delete ]' + '\u001b[0m');	
			}

			//! Return Delete			
            delete ctx.params.id
			delete ctx.params.Deleted_byToken

			return ctx.params	
		},
		async delete_update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);	

			//! Veri Varsa 
			if (dbFind) {
              
				//! Güncelleme
				dbFind["isDeleted"] = true
				dbFind["isActive"] = false
				dbFind["Deleted_at"] = new Date()
				dbFind["Deleted_byToken"] = ctx.params.Deleted_byToken
	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Admin] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ admin.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ admin.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "admin",
					title: "admin_delete_update_successful",
					description: "Admin Geçisi Silme Başarılı",
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Delete_Updated] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Delete_Updated] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
              
                //! Return Api	
				ctx.params.title = "admin.service -> Veri Geçisi Silme"
				ctx.params.table = "admin.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Delete_Updated] Veri Güncelleme [ /api/admin/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "admin.service -> Veri Geçisi Silme"
			   ctx.params.table = "admin.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Admin] [Delete_Updated] Veri Güncellenemedi [ /api/admin/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.id
			delete ctx.params.Deleted_byToken 
			
			return ctx.params

		},
		async loginOnline(ctx) {

			// ! Arama
			const dbFind_email = db.filter(u => u.email == ctx.params.email);
			const dbFind = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);


			// Giriş Başarılı ise
			if (dbFind.length > 0) {
				
				//! -----------  User UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('admin.updateUrl', {
					token:dbFind[0].token,
					updated_byToken:dbFind[0].token,
					role: dbFind[0].role,					               
					onlineStatus: true,                  
					onlineLastLogin_At: new Date()					        
				})		
				//! ----------- End User UPDATE -----------------------------

			    //! Kullanıcı Güncelleme Yapıldı
				if(user_updateUrl.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Kullanıcı Güncelleme Yapılamadı' + '\u001b[0m'); }
				if(user_updateUrl.status=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Veri Güncelleme Yapıldı' + '\u001b[0m');


					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "admin",
						title: 'admin_login_successful',
						description: "Admin Login Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}       				

				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Login"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Giriş  Oldu"
				ctx.params.userInfo=dbFind[0]

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Admin Login Başarılı [ /api/admin/loginOnline ]' + '\u001b[0m');	
			}

			//! Kullanıcı Yoksa
			else {
				
				if (dbFind_email.length <= 0)  {	console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Email Yok' + '\u001b[0m'); }
				if (dbFind_email.length > 0) { 	
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Email Var' + '\u001b[0m');


					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "admin",
						title: 'admin_login_error',
						description: "Admin Login Başarısız",
						logStatus: "error",
						fromToken: dbFind_email[0]["token"],
						created_byToken: dbFind_email[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------


				 }
								
			
				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Login"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Giriş Oldu"
				ctx.params.userInfo=null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Kullanıcı Login Başarısız [ /api/admin/loginOnline ] ' + '\u001b[0m');		

			}					
           
			
			//! Delete
			delete ctx.params.email
			delete ctx.params.password

			return ctx.params
		},
		async loginOnlineUsername(ctx) {

			// ! Arama
			const dbFind_username = db.filter(u => u.username == ctx.params.username);
			const dbFind = db.filter(u => u.username == ctx.params.username && u.password == ctx.params.password);		
              
			// Giriş Başarılı ise
			if (dbFind.length > 0) {

				//! -----------  User UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('admin.updateUrl', {
					token: dbFind[0]["token"],
					updated_byToken: dbFind[0]["token"],
					role: dbFind[0]["role"],
					onlineStatus: true,
					onlineLastLogin_At: new Date()
				})
				//! ----------- End User UPDATE -----------------------------

				

			    //! Kullanıcı Güncelleme Yapıldı
				if(user_updateUrl.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Admin Güncelleme Yapılmadı' + '\u001b[0m'); }
				if(user_updateUrl.status=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Admin Güncelleme Yapıldı' + '\u001b[0m');

					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "admin",
						title: 'admin_login_successful',
						description: "Admin Login Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------


				}       				

				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Login"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Giriş  Oldu"
				ctx.params.userInfo=dbFind[0]

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Kullanıcı Login Başarılı [ /api/admin/loginOnline ]' + '\u001b[0m');	
			}

			//! Kullanıcı Yoksa
			else {
				
				if (user_email.length <= 0)  {	console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Email Yok' + '\u001b[0m'); }
				if (user_email.length > 0) { 	
					
					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Login] Email Var' + '\u001b[0m');

				 }
								
			
				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Login"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Giriş Oldu"
				ctx.params.userInfo=null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Login] Admin Login Başarısız [ /api/admin/loginOnline ]' + '\u001b[0m');		

			}					
           
			
			//! Delete
			delete ctx.params.username
			delete ctx.params.password

			return ctx.params
		},
		async loginOut(ctx){

			// ! Arama
			//const user = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);		
			const dbFind = db.filter(u => u.token == ctx.params.token);		
		
			//! Kullanıcı Varsa
			if (dbFind) {  
		
				//! -----------  Admin UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('admin.updateUrl', {
					token:dbFind[0].token,
					updated_byToken:dbFind[0].token,
					role: dbFind[0].role,					               
					onlineStatus: false,                  
					onlineLastLoginout_At: new Date()					        
				})		
				//! ----------- End Admin UPDATE ----------------------------
				

		   		//! Kullanıcı Güncelleme Yapıldı
				if(user_updateUrl.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[Admin] [Loginout] Kullanıcı Güncelleme Yapılmadı' + '\u001b[0m'); }
				if(user_updateUrl.status=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[Admin] [Loginout] Kullanıcı Güncelleme Yapıldı' + '\u001b[0m');


					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "admin",
						title: 'admin_loginout_successful',
						description: "Admin Çıkış Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}       		

				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Loginout"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Çıkış  Yapıldı"
				ctx.params.userInfo=dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Admin] [Loginout] Kullanıcı Loginout Başarılı [ /api/admin/loginOut ]' + '\u001b[0m');	
			}		
			
			//! Kullanıcı Yoksa
			else {

				//! Return Api
				ctx.params.title = "admin.service -> Kullanıcı Loginout"
				ctx.params.table = "admin.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Giriş Oldu"
				ctx.params.userInfo=null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Admin] [Loginout] Kullanıcı Loginout Başarısız [ /api/admin/Loginout ]' + '\u001b[0m');		
			}	
					
			//! Delete
			delete ctx.params.token

			return ctx.params
		},
		async view (ctx) {
			
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);	

			//! Veri Varsa 
			if (dbFind) {     

							
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "admin",
					title: "admin_view_successful",
					description: "Admin Görüntüleme Başarılı",
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.readed_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Admin] [Logs] [View] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Admin] [Logs] [View] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

                
				
				//! Return Api	
				ctx.params.title = "admin.service -> Veri Görüntüleme"
				ctx.params.table = "admin.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
				ctx.params.message = "Veri Görüntülendi"
			

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Admin] [View] Veri Görüntülendi [ /api/admin/view/:id ]' + '\u001b[0m');

			}

			//! Veri Yoksa
			else {

				//! Return Api	
				ctx.params.title = "admin.service -> Veri Görüntüleme"
				ctx.params.table = "admin.json"        
				ctx.params.status = 0		
				ctx.params.DB = "Veri  Bulunmadı"	
				ctx.params.message="Veri Görüntülenemedi"

				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Admin] [View] Veri Görüntülenemedi [ /api/admin/view/:id ] ' + '\u001b[0m');

			}
						
			//! Return
			delete ctx.params.id
			delete ctx.params.readed_byToken 

			return ctx.params
		}
	}
}
