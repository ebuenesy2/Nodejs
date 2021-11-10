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
			ctx.params.title = "user.service"
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
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'User Tüm Veriler Okundu [ /api/user/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "user.service -> Tüm Veriler"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'User Tüm Veriler Okunamadı [ /api/user/all ] ' + '\u001b[0m');
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
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Veri Arama [ /api/user/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Veri Bulunamadı [ /api/user/find ] ' + '\u001b[0m');		
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
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Veri Arama [ /api/user/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Veri Bulunamadı [ /api/user/find_post ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			//! Arama
			const dbFind = db.find(u => u.userToken == ctx.params.userToken);	

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Veri Arama [ /api/user/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "user.service -> Veri Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Veri Bulunamadı [ /api/user/find_token ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.userToken

			return ctx.params
		},
		async add(ctx) {
	
			try {

				    //! Sabit
				    let error_check=0;    
				    let status=0;    
				    let mesaj="";    

					// ! Find
					const user_email = db.find(u => u.email == ctx.params.email);
					const user_username = db.find(u => u.username == ctx.params.username);
					const user_tel = db.find(u => u.tel == ctx.params.tel);

					//! email check
					if(user_email) {
						error_check=1
						status = 0
						mesaj = "Bu Email Kayıtlıdır."			
					}

					//! email check
					if(ctx.params.email==""||ctx.params.email==null) {
						error_check=1
						status = 0
						mesaj = "Email Boş Geçiremez."						
					}

					//! username check
					if(user_username) {
						error_check=1
						status = 0
						mesaj = "Bu Kullanıcı Adı [ username ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.username==""||ctx.params.username==null) {
						error_check=1
						status = 0
						mesaj = "Kullanıcı Adı [ username ] Boş Geçiremez."						
					}

					
					//! tel check
					if(user_tel) {
						error_check=1
						status = 0
						mesaj = "Bu Telefon Numarası [ tel ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.tel==""||ctx.params.tel==null) {
						error_check=1
						status = 0
						mesaj = "Bu Telefon Numarası [ tel ] Kayıtlıdır."					
					}
                    
					
					if(error_check==0) {

							//! Token
							let TokenId=new Date().getTime();

							let TokenInfo={				
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
								created_at: new Date(),
								updated_at: new Date()	
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
								userToken:jwt,					
								created_at: new Date(),
								updated_at: new Date()
							}				

							//Verileri Kaydet
							db.push(willSaveData)

							//Json içine Verileri Yazıyor -> db
							fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

								// Hata varsa
								if (err) {
									console.log(err)
								}							

								//Console Yazma
								console.log("Json Veri Kayıt Edildi -> User "); // Success									
								
							});
							
							//! ----------- Log ----------------------------- 	
							let logs_add = await ctx.call('logs.add', {					
								userToken: jwt,
								from: "user",
								fromToken: jwt,
								name: "user_add_successful",
								description: "Başarılı Kullanıcı Kayıt Yapıldı"
							})			
							//! ----------- Log Son ----------------------------- 

							//! Return Api   
							status = 1	
							mesaj="Kullanıcı Eklendi"	
					}

					//! Return Api   
					ctx.params.title = "user.service -> Veri Ekleme"
					ctx.params.tablo = "user.json"
					ctx.params.status = status
					ctx.params.mesaj = mesaj	

					//Console Yazma
					if(status==1) { console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Veri Eklendi [ /api/user/add ] ' + '\u001b[0m'); }
					if(status==0) { console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Veri Eklenemedi [ /api/user/add ] ' + '\u001b[0m'); }
										
													    
				} catch (error) {

                    //! Return Api   
					ctx.params.title = "user.service -> Veri Ekleme"
					ctx.params.tablo = "user.json"			
					ctx.params.status = 0
					ctx.params.mesaj = "Kullanıcı Eklenemedi"			

					//Console Yazma
					console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Veri Eklenemedi [ /api/user/add ] ' + '\u001b[0m');

				}


				//! Return Delete				
				delete ctx.params.name
				delete ctx.params.surname
				delete ctx.params.email
				delete ctx.params.username

				delete ctx.params.tel
				delete ctx.params.password

				return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (dbFind) {

				//! Tanım
				let file_upload=[]; 			
				
				//! Resim Yükleme Onay - Profil
				if(ctx.params.profil_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + 'Profil Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.profil_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + 'Profil Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.upload', {
						file: ctx.params.profil_ImageUrl_File,
						role: ctx.params.role,
						userToken: ctx.params.userToken,                  
						usedPage: "user"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							userToken: ctx.params.userToken,
							fileUrl: dbFind.userImageUploadUrl               
						})                
						//! ----------- End File Delete ----------------------------- 

						//! Güncelleme
						dbFind["userImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["userImageUrl"] = file_upload.DB["fileUrl"];	
					}
				}

				console.log(); //! Boşluk Ekleniliyor

				//! Resim Yükleme Onay - Cover
				if(ctx.params.cover_ImageUrl_File_Check=="0") { 	console.log('\u001b[' + 31 + 'm' + 'Cover Resim Yükleme Onaylanmadı' + '\u001b[0m'); }
				if(ctx.params.cover_ImageUrl_File_Check=="1") { 	
				
					console.log('\u001b[' + 32 + 'm' + 'Cover Resim Yükleme Onaylandı' + '\u001b[0m');

					//! -----------  File UPLOAD ----------------------------- 	
					file_upload = await ctx.call('file.upload', {
						file: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						userToken: ctx.params.userToken,                  
						usedPage: "user"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
									
					if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m'); }
					if(file_upload.status==1) { 

						//! -----------  File Delete ----------------------------- 	
						let file_delete = await ctx.call('file.fileDeleteUrl', {
							userToken: ctx.params.userToken,
							fileUrl: dbFind.coverImageUploadUrl               
						})                
						//! ----------- End File Delete ----------------------------- 

						//! Güncelleme
						dbFind["coverImageUploadUrl"] = file_upload.DB["uploadDir"];                 
						dbFind["coverImageUrl"] = file_upload.DB["fileUrl"];		
					}	
				}

				console.log(); //! Boşluk Ekleniliyor

				//! Delete
				delete ctx.params.profil_ImageUrl_File
				delete ctx.params.profil_ImageUrl_File_Check
				delete ctx.params.cover_ImageUrl_File
				delete ctx.params.cover_ImageUrl_File_Check

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="profil_ImageUrl_File" || key!="cover_ImageUrl_File"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor
				
		        // Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> User"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db
				
	
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "user",
					fromToken: ctx.params.userToken,
					name: "user_update_successful",
					description: "Başarılı Kullanıcı Güncelleme Yapıldı"
				})			
				//! ----------- Log Son -----------------------------  

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.tablo = "user.json"			
				ctx.params.status = 1
				ctx.params.mesaj = "Kullanıcı Kayıt Güncellendi"	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Kayıt Güncellendi [ /api/user/update ] ' + '\u001b[0m');			         

			}

			//! Kullanıcı Yoksa
			else {

				//! Return Api   
				ctx.params.title = "user.service -> Veri Guncelleme"
				ctx.params.tablo = "user.json"			
				ctx.params.status = 0
				ctx.params.mesaj = "Kullanıcı Guncellenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Kayıt Guncellenemedi [ /api/user/update ] ' + '\u001b[0m');

			}

			//! Return Delete			
            delete ctx.params.userToken
			delete ctx.params.role
			delete ctx.params.profil_ImageUrl_File
            delete ctx.params.profil_ImageUrl_File_Check
			delete ctx.params.cover_ImageUrl_File
            delete ctx.params.cover_ImageUrl_File_Check
							
			delete ctx.params.name
			delete ctx.params.surname
			delete ctx.params.email
			delete ctx.params.username
			delete ctx.params.tel
			delete ctx.params.password

			return ctx.params

		},
		async delete(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Silindi -> User"); // Success
				});

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "user",
					fromToken: dbFind.userToken,
					name: "user_delete_successful",
					description: "Silme Kullanıcı işlemi Başarılı"
				})
				//! ----------- Log Son ----------------------------- 

				//! Return Api
				ctx.params.title = "user.service -> Veri Silme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.mesaj = "user Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Kullanıcı Silme [ /api/user/delete ] Silindi' + '\u001b[0m');	
	        	
			} else {
				
				//! Return Api
				ctx.params.title = "user.service -> Veri Silme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.mesaj = "user Silinemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Kullanıcı Silme [ /api/user/delete ] Silinemedi' + '\u001b[0m');	
			}

			//! Return Delete			
            delete ctx.params.id
			delete ctx.params.userToken

			return ctx.params	
		},
		async loginOnline(ctx) {

			// ! Arama
			const user_email = db.filter(u => u.email == ctx.params.email);
			const dbFind = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);




			return ctx.params
		},
		async loginOut(ctx){

			// ! Arama
			//const user = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);
			const user = db.find(u => u.userToken == ctx.params.userToken);		

			// Kullanıcı Varsa
			if (user) {               
								
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken:ctx.params.userToken,
					name: "user_loginout_successful",
					description: "Başarılı Kullanıcı Çıkış Yapıldı"
				})		

				//api
				ctx.params.title = "Kullanıcı LoginOut"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.userId = user.id
				ctx.params.data = user
				ctx.params.logs = logs_add					


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {

				
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken:ctx.params.userToken,
					name: "user_loginout_error",
					description: "Hatalı Kullanıcı Çıkış Yapıldı"
				})
				

				//api
				ctx.params.title = "Json LoginOut"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.userId = 0
				ctx.params.data = "Kullanıcı Bulunmadı"
				ctx.params.logs = logs_add

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}

			//delete
			delete ctx.params.userToken 

			return ctx.params
		}	
	}
}
