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
			ctx.params.title = "Kullanıcı Bilgileri"
			ctx.params.tablo = "user.service"
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

			ctx.params.title = "Kullanıcı Tüm Veriler"
			ctx.params.tablo = "user.json"
			ctx.params.status = 1
			ctx.params.size=db.length
			ctx.params.DB = db

			return ctx.params
		},
		async find(ctx) {


			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);				

			// Kullanıcı Varsa
			if (user) {			

				//api
				ctx.params.title = "Kullanıcı Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.data_user = user			

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api			
				ctx.params.title = "Json Araama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data_user = "Kullanıcı Bulunmadı"					   

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_post(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.user_id);


			// Kullanıcı Varsa
			if (user) {


				//api
				ctx.params.title = "Kullanıcı Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.data_user = user

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Json Araama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data_user = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_token(ctx) {

			// ! Arama
			const user = db.find(u => u.userToken == ctx.params.userToken);			

			// Kullanıcı Varsa
			if (user) {

				//api
				ctx.params.title = "Kullanıcı Arama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.data_user = user

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Json Araama"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data_user = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

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
					ctx.params.title = "Kullanıcı Ekleme"
					ctx.params.tablo = "user.json"
					ctx.params.status = 1
					ctx.params.mesaj = "Kullanıcı Eklendi"

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
					if(ctx.params.tel==""||ctx.params.tel==null) {
						error_check=1
						ctx.params.status = 0
						ctx.params.mesaj = "Bu Telefon Numarası [ tel ] Kayıtlıdır."					
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
								token: ctx.params.token,
								role:"User",
								name: ctx.params.name,
								surname: ctx.params.surname,
								userImageUrl: null,
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


							// STEP 3: Json içine Verileri Yazıyor -> db
							fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

								// Checking for errors
								if (err) {
									console.log(err)
								}

								console.log("Json writing"); // Success
							});

							//! Status							
							ctx.params.title = "Kullanıcı Ekleme"
							ctx.params.tablo = "user.json"	
							ctx.params.status = 1	
							
							//! ----------- Log ----------------------------- 
							const user_email = db.filter(u => u.id == ctx.params.id);
								
							let logs_add = await ctx.call('logs.add', {
								token: ctx.params.token,
								userToken: jwt,
								name: "user_add_successful",
								description: "Başarılı Kullanıcı Kayıt Yapıldı"
							})

							ctx.params.data_logs = logs_add
							//! ----------- Log Son -----------------------------                        

					}									    
				  

					//console
					console.log('\u001b[' + 32 + 'm' + 'User Ekleme' + '\u001b[0m')			


				} catch (error) {

					//! Api
					ctx.params.title = "Kullanıcı Ekleme"
					ctx.params.tablo = "user.json"
					ctx.params.status = 0
					ctx.params.mesaj = "Kullanıcı Eklenemedi"		

				}


					//! Delete [ ctx.params ]
					delete ctx.params.token
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
			const user = db.find(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user) {


				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()

				//api
				ctx.params.title = "Kullanıcı Guncelleme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1



				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});		

				//! ----  Logs Ekleme --------------					
				 let logs_add = await ctx.call('logs.add', {
					 token: ctx.params.token,
					 userToken: ctx.params.userToken,					 
					 name: "user_update_successful",
					 description: "Başarılı Kullanıcı Güncelleme Yapıldı"
				 })

				 ctx.params.logs = logs_add
				//! ----  Logs Son --------------

				 	//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')
			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Kullanıcı Guncelleme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}

			return ctx.params

		},
		async delete(ctx) {
            
			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/user.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Kullanıcı Silme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Kullanıcı Silindi"				
	            
				//! ----------- Log -----------------------------         
	
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "user_delete_successful",
					description: "Silme Kullanıcı işlemi Başarılı"
				})

				delete ctx.params.userToken 
				ctx.params.logs_add = logs_add	

				//! ----------- Log Son-------------------------



			} else {

				//api
				ctx.params.title = "Kullanıcı Silme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');
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
					userToken: user[0].userToken,
					name: "user_login_successful",
					description: "Başarılı Kullanıcı Giriş Yapıldı"
				})

				//api
				ctx.params.title = "Kullanıcı Login"
				ctx.params.tablo = "user.json"
				ctx.params.status = 1
				ctx.params.userId = user[0].id
				ctx.params.data_user = user
				ctx.params.mesaj = "Kullanıcı Bulundu"
				ctx.params.logs = logs_add

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {
				    //api
					ctx.params.title = "Kullanıcı Login"
					ctx.params.tablo = "user.json"
					ctx.params.status = 0				
					ctx.params.data_user = user_email
					ctx.params.mesaj = "Kullanıcı Bulunmadı"
				
					// Giriş Başarılı ise
					if (user_email.length > 0) {

						let logs_add = await ctx.call('logs.add', {
							token: ctx.params.token,
							userToken: user_email[0].userToken,
							name: "user_login_error",
							description: "Hatalı Kullanıcı Giriş Yapıldı"
						})

						ctx.params.logs = logs_add
					}

					//console
					console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			    }
				
				//! Delete
				delete ctx.params.token
				delete ctx.params.email
				delete ctx.params.password

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
