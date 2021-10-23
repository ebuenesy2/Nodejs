'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/pricing.json'); //! Json


module.exports = {
	name: "pricing",

	actions: {
		async info(ctx) {
			ctx.params.title = "pricing.service"
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

			ctx.params.title = "Fiyat Listesi -> Tüm Veriler"
            ctx.params.tablo = "pricing.json"
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

				let user_logs = await ctx.call('logs.find_user', {
					email: user.email
				})


				//api
				ctx.params.title = "SSK Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.data_pricing = user
				//ctx.params.data_user_logs = user_logs

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Json Araama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.data_pricing = "SSK Bulunmadı"		
			
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Fiyat Listesi -> Ekleme"
			ctx.params.tablo = "pricing.json"
            ctx.params.status = 1
            

			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					token: ctx.params.token,
					packageName: ctx.params.packageName,
					packagePricing: ctx.params.packagePricing,
					packageFeatures: ctx.params.packageFeatures			
				}

				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,				
					token: ctx.params.token,
					packageName: ctx.params.packageName,
					packagePricing: ctx.params.packagePricing,				
					packageFeatures: ctx.params.packageFeatures,
					pricingToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pricing.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});

				//! Status
				ctx.params.status = 1



				//! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'pricing Ekleme' + '\u001b[0m')


			} catch (error) {

				//! Status
				ctx.params.status = 0

			}

            
            //! Logs Ekleme
            const user_email = db.filter(u => u.id == ctx.params.id);
                
            let logs_add = await ctx.call('logs.add', {
                token: ctx.params.token,
                userToken: ctx.params.userToken,
                name: "pricing_add_successful",
                description: "Fiyat Listesi Ekleme Başarılı "
            })

            ctx.params.logs = logs_add
            


            delete ctx.params.token
            delete ctx.params.userToken
            delete ctx.params.packageName
            delete ctx.params.packagePricing
            delete ctx.params.packageFeatures

			return ctx.params

		},
		async update(ctx) {

		

			// ! Arama
			const user = db.find(u => u.pricingToken == ctx.params.pricingToken);

			// Kullanıcı Varsa
			if (user) {


                //! --------------------------------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')


                //! Logs Ekleme               
                    
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "pricing_update_successful",
                    description: "Fiyat Listesi Güncelleme Başarılı "
                })

                //ctx.params.logs = logs_add            

                delete ctx.params.userToken 

                //! --------------------------------------------

              

				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pricing.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Fiyat Listesi Guncelleme"
				ctx.params.tablo = "pricing.json"
				ctx.params.status = 1
                ctx.params.data_pricing = user,
				ctx.params.data_logs = logs_add 	


			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Fiyat Listesi Guncelleme"
				ctx.params.tablo = "pricing.json"
				ctx.params.status = 0
                ctx.params.data_pricing = [""]
				ctx.params.data_logs = [""]

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Fiyat Listesi Bulunamadı' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.id 
			delete ctx.params.userToken 
			delete ctx.params.pricingToken 
			delete ctx.params.token 
			delete ctx.params.packagePricing 

			return ctx.params

		},
		async delete(ctx) {

			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pricing.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Fiyat Listesi  Silme"
				ctx.params.tablo = "pricing.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Fiyat Listesi  Silindi"				
	            
			     //! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')


                //! Logs Ekleme            
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "faq_delete_successful",
                    description: "Fiyat Listesi Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! --------------------------------------------



			} else {

				//api
				ctx.params.title = "Fiyat Listesi  Silme"
				ctx.params.tablo = "pricing.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Fiyat Listesi  Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Fiyat Listesi  Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);




			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')


			return ctx.params


		}	
	}
}
