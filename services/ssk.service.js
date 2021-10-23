'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/ssk.json'); //! Json




module.exports = {
	name: "ssk",

	actions: {
		async info(ctx) {
			ctx.params.title = "ssk.service"
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

			ctx.params.title = "SSK Tüm Veriler"
            ctx.params.tablo = "ssk.json"
            ctx.params.status = 1
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


				//api
				ctx.params.title = "SSK Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.data_user = user
				//ctx.params.data_user_logs = user_logs

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
			    
				//api
				ctx.params.title = "Json Araama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.data_user = "SSK Bulunmadı"
				ctx.params.data_user_logs = ""
				ctx.params.data_follow = ""
				ctx.params.data_follower = ""
				ctx.params.data_posts_profile = ""
				ctx.params.data_posts_home = ""

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "SSK Ekleme"
			ctx.params.tablo = "ssk.json"
            ctx.params.status = 1	
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					token: ctx.params.token,
					soru: ctx.params.soru,
					cevap: ctx.params.cevap			
				}

				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,				
					token: ctx.params.token,
					soru: ctx.params.soru,
					cevap: ctx.params.cevap,
					sskToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/ssk.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> SSK"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "faq_add_successful",
					description: "SSK Ekleme Başarılı"
				})

				ctx.params.logs = logs_add
				//! ----------- Log Son ----------------------------- 


			} catch (error) {

				//! Status
				ctx.params.status = 0
				ctx.params.logs = "error"

			}   



            delete ctx.params.token 
            delete ctx.params.userToken 
            delete ctx.params.soru 
            delete ctx.params.cevap 

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.sskToken == ctx.params.sskToken);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "faq_update_successful",
                    description: "SSK Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/ssk.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "SSK Guncelleme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
                ctx.params.data_ssk = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "SSK Guncelleme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
                ctx.params.data_ssk =  "SSK Bulunmadı"
				ctx.params.data_logs = "SSK Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  SSK Bulunamadı' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.token 
			delete ctx.params.sskToken 
			delete ctx.params.soru 
			delete ctx.params.cevap 

			return ctx.params

		},
		async delete(ctx) {

			var index = db.findIndex(a => a.id == ctx.params.id);
            
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/ssk.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "SSK Silme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.mesaj = "SSK Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "faq_delete_successful",
                    description: "SSK Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "SSK Silme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.mesaj = "SSK Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  SSK Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);

			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')

             delete ctx.params.id
             delete ctx.params.token
             delete ctx.params.userToken


			return ctx.params


		}	
	}
}
