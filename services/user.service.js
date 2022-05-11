'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/user.json'); //! Json


module.exports = {
	name: "user",

	actions: {
		async info(ctx) {
		
			//! Return Api
			ctx.params.title = "user.service -> Info"
			ctx.params.table = "user.json"
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
				ctx.params.title = "user.service -> Tüm Veriler"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [All] Tüm Veriler Okundu [ /api/user/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "user.service -> Tüm Veriler"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [All] Tüm Veriler Okunamadı [ /api/user/all ] ' + '\u001b[0m');
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
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Find] Kullanıcı Veri Arama [ /api/user/:id ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Find] Kullanıcı Veri Bulunamadı [ /api/user/:id ] ' + '\u001b[0m');		
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
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Find] Kullanıcı Veri Arama [ /api/user/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Find] Kullanıcı Veri Bulunamadı [ /api/user/find_post ] ' + '\u001b[0m');		
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
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Find] Kullanıcı Veri Arama [ /api/user/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Find] Kullanıcı Veri Bulunamadı [ /api/user/find_token ] ' + '\u001b[0m');		
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
					const user_email = db.find(u => u.email == ctx.params.email);
					const user_username = db.find(u => u.username == ctx.params.username);
					const user_tel = db.find(u => u.tel == ctx.params.tel);

					//! email check
					if(user_email) {
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
					if(user_username) {
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
					if(user_tel) {
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
								role:"User",	
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
								role:"User",
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
							fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

								// Hata varsa
								if (err) {
									console.log('\u001b[' + 31 + 'm' + '[User] [Json] [Add] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
									console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
								}							

								//Console Yazma
								console.log('\u001b[' + 32 + 'm' + '[User] [Json] [Add] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');								
								
							});							

							//! ----------- Log ----------------------------- 	
							let logs_add = await ctx.call('logs.add', {
								table: "user",
								title: "user_add_successful",
								description: "Kullanıcı Ekleme Başarılı",
								logStatus: "successful",
								fromToken: jwt,
								created_byToken: ctx.params.created_byToken ? ctx.params.created_byToken : jwt
							})

							if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
							if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

							//! ----------- Log Son -----------------------------

							//! Return Api   
							status = 1	
							message="Veri Eklendi"	
					}

					//! Return Api   
					ctx.params.title = "user.service -> Veri Ekleme"
					ctx.params.table = "user.json"
					ctx.params.status = status
					ctx.params.message = message	

					//Console Yazma
					if(status==1) { console.log('\u001b[' + 32 + 'm' + '[User] [Add] Kullanıcı Veri Eklendi [ /api/user/add ]' + '\u001b[0m'); }
					if (status == 0) {
						console.log('\u001b[' + 31 + 'm' + '[User] [Add] Kullanıcı Veri Eklenemedi [ /api/user/add ]' + '\u001b[0m');
						console.log('\u001b[' + 31 + 'm' + '[User] [Add] Error: '+message + '\u001b[0m');
					}
										
													    
				} catch (error) {

                    //! Return Api   
					ctx.params.title = "user.service -> Veri Ekleme"
					ctx.params.table = "user.json"			
					ctx.params.status = 0
					ctx.params.message = "Veri Eklenemedi"			

					//Console Yazma
					console.log('\u001b[' + 31 + 'm' + '[User] [Add] Kullanıcı Veri Eklenemedi [ /api/user/add ] ' + '\u001b[0m');
					console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');

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
				
				//! Resim Yükleme Onay - Profil
				if(ctx.params.profil_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Profil Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.profil_ImageUrl_File_Check=="1") {    console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Profile] Profil Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload_profile = await ctx.call('file.upload', {
						file: ctx.params.profil_ImageUrl_File,
						role: ctx.params.role,
						usedPage: "user",
						created_byToken: ctx.params.updated_byToken
					})
					//! ----------- End File UPLOAD -----------------------------
									
					if (file_upload_profile.status == 0) { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Profil Dosya Yüklenemedi' + '\u001b[0m'); }
					if (file_upload_profile.status == 1) {

						//! -----------  File Delete ----------------------------- 	
						let file_delete_user = await ctx.call('file.fileDeleteUrl', {
							created_byToken: ctx.params.updated_byToken,
							fileUrl: dbFind.userImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						if (file_delete_user.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete_user.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
					
						//! Güncelleme
						dbFind["userImageUploadUrl"] = file_upload_profile.DB["uploadDir"];
						dbFind["userImageUrl"] = file_upload_profile.DB["fileUrl"];
					}
				}

				//! Resim Yükleme Onay - Cover
				if(ctx.params.cover_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Cover] Cover Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if (ctx.params.cover_ImageUrl_File_Check == "1") {
				
					console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Cover] Cover Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload_cover = await ctx.call('file.upload', {
						file: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						created_byToken: ctx.params.updated_byToken,
						usedPage: "user"
					})
					//! ----------- End File UPLOAD -----------------------------
									
					if (file_upload_cover.status == 0) { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Cover] Cover Dosya Yüklenemedi' + '\u001b[0m'); }
					if (file_upload_cover.status == 1) {						

						//! -----------  File Delete ----------------------------- 	
						let file_delete_cover = await ctx.call('file.fileDeleteUrl', {
							created_byToken: ctx.params.updated_byToken,
							fileUrl: dbFind.coverImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						if (file_delete_cover.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete_cover.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["coverImageUploadUrl"] = file_upload_cover.DB["uploadDir"];
						dbFind["coverImageUrl"] = file_upload_cover.DB["fileUrl"];
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
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[User] [Json] [Update] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[User] [Json] [Update] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "user",
					title: "user_update_successful",
					description: "Kullanıcı Güncelleme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.table = "user.json"			
				ctx.params.status = 1
				ctx.params.message = "Veri Kayıt Güncellendi"	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Update] Kullanıcı Kayıt Güncellendi [ /api/user/update ] ' + '\u001b[0m');			         

			}

			//! Kullanıcı Yoksa
			else {

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.table = "user.json"			
				ctx.params.status = 0
				ctx.params.message = "Veri Guncellenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Update] Kullanıcı Kayıt Guncellenemedi [ /api/user/update ] ' + '\u001b[0m');

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
				
				//! Resim Yükleme Onay - Profil
				if(ctx.params.profil_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Profil Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.profil_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Profile] Profil Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload_profile = await ctx.call('file.uploadUrl', {
						fileUrl: ctx.params.profil_ImageUrl_File,
						role: ctx.params.role,
						usedPage: "user",
						created_byToken: ctx.params.updated_byToken
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if (file_upload_profile.status==0) { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Dosya Yüklenemedi' + '\u001b[0m'); }
					if (file_upload_profile.status==1) {

						console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Profile] Dosya Yüklendi' + '\u001b[0m'); }

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							created_byToken: ctx.params.updated_byToken,
							fileUrl: dbFind.userImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------
					
						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["userImageUploadUrl"] = file_upload_profile.DB["uploadDir"];
						dbFind["userImageUrl"] = file_upload_profile.DB["fileUrl"];
					}
				

				//! Resim Yükleme Onay - Cover
				if(ctx.params.cover_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Cover] Cover Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.cover_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Cover] Cover Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload_cover = await ctx.call('file.uploadUrl', {
						fileUrl: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						token: ctx.params.token,                  
						usedPage: "user",
						created_byToken: ctx.params.updated_byToken
					})
					//! ----------- End File UPLOAD ----------------------------- 	

				
									
					if (file_upload_cover.status==0) { console.log('\u001b[' + 31 + 'm' + '[User] [Update] Dosya Yüklenemedi' + '\u001b[0m'); }
					if (file_upload_cover.status==1) {

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							created_byToken: ctx.params.updated_byToken,
							fileUrl: dbFind.coverImageUploadUrl               
						})                
						//! ----------- End File Delete -----------------------------

						if (file_delete.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Update] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
						if (file_delete.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Update] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

						//! Güncelleme
						dbFind["coverImageUploadUrl"] = file_upload_cover.DB["uploadDir"];
						dbFind["coverImageUrl"] = file_upload_cover.DB["fileUrl"];
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
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[User] [Json] [Update] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[User] [Json] [Update] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db				

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "user",
					title: "user_update_successful",
					description: "Kullanıcı Güncelleme Başarılı",
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.table = "user.json"			
				ctx.params.status = 1
				ctx.params.message = "Veri Kayıt Güncellendi"	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Update] Kullanıcı Kayıt Güncellendi [ /api/user/updateUrl ] ' + '\u001b[0m');		

			}

			//! Veri Yoksa 
			else {

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.table = "user.json"			
				ctx.params.status = 0
				ctx.params.message = "Veri Guncellenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Update] Kullanıcı Kayıt Guncellenemedi [ /api/user/updateUrl ] ' + '\u001b[0m');

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
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[User] [Json] [Delete] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[User] [Json] [Delete] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
				//! ----------- Json Delete  Son ----------------------------- 	
				
				
				//! -----------  File Delete ----------------------------- 	
				let file_delete_user = await ctx.call('file.fileDeleteUrl', {
					token: ctx.params.token,
					fileUrl: dbFind.userImageUploadUrl               
				})                
				//! ----------- End File Delete -----------------------------
				
				if (file_delete_user.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Delete] [Profile] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete_user.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Delete] [Profile] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }

				//! -----------  File Delete ----------------------------- 	
				let file_delete_cover = await ctx.call('file.fileDeleteUrl', {
					token: ctx.params.token,
					fileUrl: dbFind.coverImageUploadUrl               
				})                
				//! ----------- End File Delete -----------------------------
								
				if (file_delete_cover.status==1)  { console.log('\u001b[' + 32 + 'm' + '[User] [Delete] [Cover] Dosya Silindi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }
				if (file_delete_cover.status==0)  { console.log('\u001b[' + 31 + 'm' + '[User] [Delete] [Cover] Dosya Silinemedi [ /api/file/fileDeleteUrl ]' + '\u001b[0m');  }


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "user",
					title: "user_delete_successful",
					description: "Kullanıcı Silme Başarılı",
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api
				ctx.params.title = "user.service -> Veri Silme"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Delete] Kullanıcı Silindi [ /api/user/delete ]' + '\u001b[0m');	
	        	
			} else {
				
				//! Return Api
				ctx.params.title = "user.service -> Veri Silme"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Delete] Kullanıcı Silinemedi [ /api/user/delete ]' + '\u001b[0m');	
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
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[User] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ user.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[User] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ user.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "user",
					title: "user_delete_update_successful",
					description: "Kullanıcı Geçisi Silme Başarılı",
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Delete_Updated] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Delete_Updated] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
              
                //! Return Api	
				ctx.params.title = "user.service -> Veri Geçisi Silme"
				ctx.params.table = "user.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[User] [Delete_Updated] Veri Güncelleme [ /api/user/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "user.service -> Veri Geçisi Silme"
			   ctx.params.table = "user.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[User] [Delete_Updated] Veri Güncellenemedi [ /api/user/update ] ' + '\u001b[0m');

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
				let user_updateUrl = await ctx.call('user.updateUrl', {
					token: dbFind[0]["token"],
					updated_byToken: dbFind[0]["token"],
					role: dbFind[0]["role"],
					onlineStatus: true,
					onlineLastLogin_At: new Date()
				})
				//! ----------- End User UPDATE -----------------------------

				//! Kullanıcı Güncelleme Yapıldı
				if (user_updateUrl.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Login] Kullanıcı Güncelleme Yapılamadı' + '\u001b[0m'); }
				if (user_updateUrl.status == "1") {
					console.log('\u001b[' + 32 + 'm' + '[User] [Login] Kullanıcı Güncelleme Yapıldı' + '\u001b[0m');

					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "user",
						title: 'user_login_successful',
						description: "Kullanıcı Login Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}

				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Login"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Giriş  Oldu"
				ctx.params.userInfo = dbFind[0]

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Login] Kullanıcı Login Başarılı [ /api/user/loginOnline ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {

				if (dbFind_email.length <= 0) { console.log('\u001b[' + 31 + 'm' + '[User] [Login] Email Yok' + '\u001b[0m'); }
				if (dbFind_email.length > 0) {
					console.log('\u001b[' + 32 + 'm' + '[User] [Login] Email Var' + '\u001b[0m');					

						//! ----------- Log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {
							table: "user",
							title: 'user_login_error',
							description: "Kullanıcı Login Başarısız",
							logStatus: "error",
							fromToken: dbFind_email[0]["token"],
							created_byToken: dbFind_email[0]["token"]
						})

						if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
						if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					   //! ----------- Log Son -----------------------------

				}


				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Login"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Giriş Oldu"
				ctx.params.userInfo = null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Login] Kullanıcı Login Başarısız [ /api/user/loginOnline ] ' + '\u001b[0m');

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
				let user_updateUrl = await ctx.call('user.updateUrl', {
					token: dbFind[0]["token"],
					updated_byToken: dbFind[0]["token"],
					role: dbFind[0]["role"],
					onlineStatus: true,
					onlineLastLogin_At: new Date()
				})
				//! ----------- End User UPDATE -----------------------------

				//! Kullanıcı Güncelleme Yapıldı
				if (user_updateUrl.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Login] Kullanıcı Güncelleme Yapılamadı' + '\u001b[0m'); }
				if (user_updateUrl.status == "1") {
					console.log('\u001b[' + 32 + 'm' + '[User] [Login] Kullanıcı Güncelleme Yapıldı' + '\u001b[0m');

					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "user",
						title: 'user_login_successful',
						description: "Kullanıcı Login Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}

				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Login"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Giriş  Oldu"
				ctx.params.userInfo = dbFind[0]

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Login] Kullanıcı Login Başarılı [ /api/user/loginOnlineUsername ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {

				if (dbFind_username.length <= 0) { console.log('\u001b[' + 31 + 'm' + '[User] [Login] UserName Yok' + '\u001b[0m'); }
				if (dbFind_username.length > 0) {
					console.log('\u001b[' + 32 + 'm' + '[User] [Login] Email Var' + '\u001b[0m');

					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "user",
						title: 'user_login_error',
						description: "Kullanıcı Login Başarısız",
						logStatus: "error",
						fromToken: dbFind_username[0]["token"],
						created_byToken: dbFind_username[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}


				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Login"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Giriş Oldu"
				ctx.params.userInfo = null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Login] Kullanıcı Login Başarısız [ /api/user/loginOnlineUsername ] ' + '\u001b[0m');

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
		
				//! -----------  User UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('user.updateUrl', {
					token:dbFind[0].token,
					updated_byToken:dbFind[0].token,
					role: dbFind[0].role,					               
					onlineStatus: false,                  
					onlineLastLoginout_At: new Date()					        
				})		
				//! ----------- End User UPDATE ----------------------------
				

		   		//! Kullanıcı Güncelleme Yapıldı
				if(user_updateUrl.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[User] [Loginout] Kullanıcı Güncelleme Yapılmadı' + '\u001b[0m'); }
				if(user_updateUrl.status=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + '[User] [Loginout] Kullanıcı Güncelleme Yapıldı' + '\u001b[0m');

					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "user",
						title: 'user_loginout_successful',
						description: "Kullanıcı Çıkış Başarılı",
						logStatus: "successful",
						fromToken: dbFind[0]["token"],
						created_byToken: dbFind[0]["token"]
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[User] [Logs] [Login] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[User] [Logs] [Login] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------

				}       		

				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Loginout"
				ctx.params.table = "user.json"
				ctx.params.status = 1
				ctx.params.message = "Başarılı Çıkış  Yapıldı"
				ctx.params.userInfo=dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[User] [Loginout] Kullanıcı Loginout Başarılı [ /api/user/loginOut ]' + '\u001b[0m');	
			}		
			
			//! Kullanıcı Yoksa
			else {

				//! Return Api
				ctx.params.title = "user.service -> Kullanıcı Loginout"
				ctx.params.table = "user.json"
				ctx.params.status = 0
				ctx.params.message = "Hatalı Çıkış Oldu"
				ctx.params.userInfo=null

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[User] [Loginout] Kullanıcı Loginout Başarısız [ /api/user/Loginout ]' + '\u001b[0m');		
			}	
					
			//! Delete
			delete ctx.params.token

			return ctx.params
		}	
	}
}
