'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/page.json'); //! Json


module.exports = {
	name: "page",

	actions: {
		async info(ctx) {
			ctx.params.title = "page.service"
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
            ctx.params.title = "Sayfalar -> Tüm Veriler"
            ctx.params.tablo = "page.json"
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
				ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
				ctx.params.data_page = user		
				
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');  //! console
			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Sipariş  Araama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
				ctx.params.data_page = "Sipariş  Bulunmadı"	
								
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Sipariş   Bulunamadı' + '\u001b[0m'); //! console

			}


			return ctx.params
		},	
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.id == 1);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "page_update_successful",
                    description: "Sayfalar Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/page.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Sayfalar Guncelleme"
				ctx.params.tablo = "page.json"
				ctx.params.status = 1
                ctx.params.data_page = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Sayfalar Guncelleme"
				ctx.params.tablo = "page.json"
				ctx.params.status = 0
                ctx.params.data_productCategory =  "Sayfalar Bulunmadı"
				ctx.params.data_logs = "Sayfalar Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Sayfalar Bulunamadı' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.token 
            delete ctx.params.ordersToken 
            delete ctx.params.userToken 
            delete ctx.params.userName 
            delete ctx.params.role 
            delete ctx.params.productTokens 
            delete ctx.params.customerToken 
            delete ctx.params.customerNameSurname 
            delete ctx.params.customerTelNo 
            delete ctx.params.customerEmail 
            delete ctx.params.orderDate 
            delete ctx.params.cargoName 
            delete ctx.params.cargoCode 
            delete ctx.params.siteName 
            delete ctx.params.price 
            delete ctx.params.adress 

 

			return ctx.params

		}
	}
}
