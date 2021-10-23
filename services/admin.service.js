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
			ctx.params.title = "admin.service"
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

			ctx.params.title = "Admin Tüm Veriler"
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
				ctx.params.data_user = user
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
				ctx.params.data_user = "Admin Bulunmadı"
				ctx.params.data_user_logs = ""
			

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ admin/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.user_id);



			// Admin Varsa
			if (user) {


				//api
				ctx.params.title = "Admin Arama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.data_user = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Admin Yoksa
			else {
				//api
				//api
				ctx.params.title = "Admin Araama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 0
				ctx.params.data_user = "Admin Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ admin/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_token(ctx) {

			// ! Arama
			const user = db.find(u => u.userToken == ctx.params.userToken);



			// Admin Varsa
			if (user) {


				//api
				ctx.params.title = "Admin Arama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.data_user = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Admin Yoksa
			else {
				//api
				//api
				ctx.params.title = "Admin Araama"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 0
				ctx.params.data_user = "Admin Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ admin/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

	
			try {

				    //! Is there error
				    let error_check=0;    

					// ! Find
					const user_email = db.find(u => u.email == ctx.params.email);
					const user_username = db.find(u => u.username == ctx.params.username);
					const user_tel = db.find(u => u.tel == ctx.params.tel);

					//! Api
					ctx.params.title = "Admin Ekleme"
					ctx.params.tablo = "admin.json"
					ctx.params.status = 1
					ctx.params.mesaj = "Admin Eklendi"

					//! email check
					if(user_email) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Bu Email Kayıtlıdır."			
					}

					//! email check
					if(ctx.params.email==""||ctx.params.email==null) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Email Boş Geçiremez."						
					}

					//! username check
					if(user_username) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Bu Kullanıcı Adı [ username ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.username==""||ctx.params.username==null) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Kullanıcı Adı [ username ] Boş Geçiremez."						
					}

					
					//! tel check
					if(user_tel) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Bu Telefon Numarası [ tel ] Kayıtlıdır."			
					}

					//! username check
					if(ctx.params.tel==""||ctx.params.username==null) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Bu Telefon Numarası [ tel ] Kayıtlıdır."					
					}
                    
					
					if(error_check==0) {

						    
					
							//! Eklenecek veriler
							const willSaveData = {
								id: new Date().getTime(),
								token: ctx.params.token,
								role:"Admin",
								name: ctx.params.name,
								surname: ctx.params.surname,
								userImageUrl: null,
								username: ctx.params.username,
								email: ctx.params.email,
								tel: ctx.params.tel,
								password: ctx.params.password,										
								created_at: new Date(),
								updated_at: new Date()
							}

                            //!Token
							const secret = 'secret';
							const data = willSaveData;
							const jwt = sign(data, secret);							
							willSaveData["userToken"]=jwt;  //! Get Token

							//! Verileri Kaydet
							db.push(willSaveData)						


							// STEP 3: Json içine Verileri Yazıyor -> db
							fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

								// Checking for errors
								if (err) {
									console.log(err)
								}

								console.log("Json writing"); // Success                               

							});

							//! Status							
							ctx.params.title = "Admin Ekleme"
							ctx.params.tablo = "admin.json"	
							ctx.params.status = 1

 
                          //! Logs Ekleme
						  const user_email = db.filter(u => u.email == ctx.params.email);
						
							let logs_add = await ctx.call('logs.add', {
								token: ctx.params.token,
								userId: user_email[0].id,
								name: "admin_add_successful",
								description: "Başarılı Kayıt Yapıldı"
							})

							ctx.params.logs = logs_add

					}									    
				

					//! Delete [ ctx.params ]
					delete ctx.params.name
					delete ctx.params.surname
					delete ctx.params.email
					delete ctx.params.username

					delete ctx.params.tel
					delete ctx.params.password


					//! ------------------

					//console
					console.log('\u001b[' + 32 + 'm' + 'User Ekleme' + '\u001b[0m')

				


				} catch (error) {

					//! Api
					ctx.params.title = "Kullanıcı Ekleme"
					ctx.params.tablo = "user.json"
					ctx.params.status = 0
					ctx.params.mesaj = "Kullanıcı Eklenemedi"
		

				}




			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {


				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				//! Add
				user["updated_at"] = new Date() 

				//? User Info
				console.log(user)

				//api
				ctx.params.title = "Admin Guncelleme"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
                
			
				
				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

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
				 const user_email = db.filter(u => u.id == ctx.params.id);
						
				 let logs_add = await ctx.call('logs.add', {
					 token: ctx.params.token,
					 userId: user_email[0].id,
					 name: "admin_update_successful",
					 description: "Başarılı Güncelleme Yapıldı"
				 })

				 ctx.params.logs = logs_add




			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Admin Guncelleme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data = "Admin Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Admin Bulunamadı' + '\u001b[0m');

			}

			return ctx.params

		},
		async delete(ctx) {



			var index = db.findIndex(a => a.id === ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/admin.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Admin Silme"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Admin Silindi"				
	            
				//! Logs Ekleme		
		
				let logs_add = await ctx.call('logs.add', {
					token:"token",
					userId: ctx.params.id,
					name: "admin_delete_successful",
					description: "Silme işlemi Başarılı"
				})

				ctx.params.logs = logs_add



			} else {

				//api
				ctx.params.title = "Admin Silme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Admin Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Admin Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);




			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')





			return ctx.params


		},
		async loginOnline(ctx) {

			// ! Arama
			const user_email = db.filter(u => u.email == ctx.params.email);

			const user = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);

			// Giriş Başarılı ise
			if (user.length > 0) {

				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userId: user[0].id,
					name: "admin_login_successful",
					description: "Başarılı Giriş Yapıldı"
				})


				//api
				ctx.params.title = "Admin Login"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.userId = user[0].id
				ctx.params.data_user = user
				ctx.params.data_logs = logs_add



				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Admin Yoksa
			else {

				
					//api
					ctx.params.title = "Json Login"
					ctx.params.tablo = "admin.json"
					ctx.params.status = 0
					ctx.params.userId = 0
					ctx.params.data_user = "Admin Bulunmadı"
					ctx.params.data_logs = "Admin Bulunmadı"
				
					// Giriş Başarılı ise
			if (user_email.length > 0) {

					let logs_add = await ctx.call('logs.add', {
						token: ctx.params.token,
						userId: user_email[0].id,
						name: "admin_login_error",
						description: "Hatalı Giriş Yapıldı"
					})

					ctx.params.logs = logs_add


		   	}

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}

			
			delete ctx.params.email
			delete ctx.params.password


			return ctx.params

		},
		async loginOut(ctx){

			// ! Arama
			//const user = db.filter(u => u.email == ctx.params.email && u.password == ctx.params.password);

			const user = db.filter(u => u.id == ctx.params.user_id);		

			// Kullanıcı Varsa
			if (user.length > 0) {
                
				
				
				let logs_add = await ctx.call('logs.add', {
					token: "token yeni",
					userId:ctx.params.user_id,
					name: "loginout_successful",
					description: "Başarılı Çıkış Yapıldı"
				})
				


				//api
				ctx.params.title = "Admin LoginOut"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.userId = user[0].id
				ctx.params.data_user = user
				ctx.params.data_logs = logs_add

				delete ctx.params.user_id
				delete ctx.params.email
				delete ctx.params.password


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {

				
				let logs_add = await ctx.call('logs.add', {
					token: "token yeni",
					userId: ctx.params.user_id,
					name: "loginout_error",
					description: "Hatalı Çıkış Yapıldı"
				})
				

				//api
				ctx.params.title = "Admin LoginOut"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 0
				ctx.params.userId = 0
				ctx.params.data_user = "Admin Bulunmadı"
				ctx.params.data_logs = logs_add

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}

			return ctx.params
		},
		async home(ctx){

			const user = db.filter(u => u.id == ctx.params.adminId);		

			// Kullanıcı Varsa
			if (user.length > 0) {    
				
				
			
				let data_logs = await ctx.call('logs.find_user', {
					userId: user[0].id
				})


				let data_settings = await ctx.call('settings.all')
				
					

				//api
				ctx.params.title = "Admin Tüm Veriler"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.userId = user[0].id
				ctx.params.data_user = user
				ctx.params.data_logs = data_logs	
				ctx.params.data_settings = data_settings	
				
				delete ctx.params.adminId


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {

			
				//api
				ctx.params.title = "Admin LoginOut"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 0
				ctx.params.userId = 0
				ctx.params.data_user = "Admin Bulunmadı"
				ctx.params.data_logs = "Admin Bulunmadı"
				ctx.params.data_settings = "Admin Bulunmadı"
				

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Admin Bulunamadı' + '\u001b[0m');

			}

			return ctx.params
		},
		async homeAll(ctx){

							
				let data_settings = await ctx.call('settings.all')			
					

				//api
				ctx.params.title = "Admin Tüm Veriler"
				ctx.params.tablo = "admin.json"
				ctx.params.status = 1
				ctx.params.data_settings = data_settings					
				

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ admin/:userId ]' + '\u001b[0m');

		

			return ctx.params
		}
	}
}
