'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/orders.json'); //! Json


module.exports = {
	name: "orders",

	actions: {
		async info(ctx) {
			ctx.params.title = "orders.service"
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

			ctx.params.title = "Siparişler -> Tüm Veriler"
            ctx.params.tablo = "orders.json"
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
                
                let data_products = await ctx.call('products.all');

				//api
				ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
				ctx.params.data_orders = user
				ctx.params.data_product = data_products

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Sipariş  Araama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
				ctx.params.data_orders = "Sipariş  Bulunmadı"			
				ctx.params.data_product = "Sipariş  Bulunmadı"			
				
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Sipariş   Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_userToken(ctx) {

			// ! Arama
			const user = db.filter(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user.length>0) {

				//api
                ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.DB = user

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ orders/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = []

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ orders/:userId ]  Sipariş Bulunamadı' + '\u001b[0m');

			}
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		},
		async Edit_FindUserToken(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);
			const data_product = await ctx.call('products.find_userToken', { "userToken":ctx.params.userToken });
			
			// Kullanıcı Varsa
			if (data_product) {

				//api
                ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.data_orders = user
				ctx.params.data_product = data_product

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ orders/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				ctx.params.title = "Sipariş Arama"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.data_orders = []
				ctx.params.data_product = []

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ orders/:userId ]  Sipariş Bulunamadı' + '\u001b[0m');

			}
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Sipariş Ekleme"
			ctx.params.tablo = "orders.json"
            ctx.params.status = 1	
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					userToken: ctx.params.userToken,
					userName: ctx.params.userName,
					productTokens: ctx.params.productTokens,
					ProductsName: ctx.params.ProductsName,
					customerToken: ctx.params.customerToken,
					customerNameSurname: ctx.params.customerNameSurname,
					customerTelNo: ctx.params.customerTelNo,
					customerEmail: ctx.params.customerEmail,
					orderStatus: ctx.params.orderStatus,					
					cargoName: ctx.params.cargoName,
					cargoCode: ctx.params.cargoCode,
					siteName: ctx.params.siteName,
					price: ctx.params.price,
					adress: ctx.params.adress							
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				
	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,				
					token: ctx.params.token,
					role: ctx.params.role,
                    userToken: ctx.params.userToken,
					userName: ctx.params.userName,
					productTokens: ctx.params.productTokens,
					ProductsName: ctx.params.ProductsName,
					customerToken: ctx.params.customerToken,
					customerNameSurname: ctx.params.customerNameSurname,
					customerTelNo: ctx.params.customerTelNo,
					customerEmail: ctx.params.customerEmail,
                    orderStatus: ctx.params.orderStatus,					
					cargoName: ctx.params.cargoName,
					cargoCode: ctx.params.cargoCode,
					siteName: ctx.params.siteName,
					price: ctx.params.price,
					adress: ctx.params.adress,                    				
					ordersToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

                
				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/orders.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> orders"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "orders_add_successful",
					description: "Sipariş Ekleme Başarılı"
				})

				ctx.params.data_logs = logs_add
				//! ----------- Log Son ----------------------------- 
				

			} catch (error) {

				//! Status
				ctx.params.status = 0
				ctx.params.data_logs = "error"

			}   

            //! Delete
            delete ctx.params.token 
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

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.ordersToken == ctx.params.ordersToken);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "orders_update_successful",
                    description: "Sipariş Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/orders.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Sipariş Guncelleme"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
                ctx.params.data_productCategory = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Sipariş Guncelleme"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
                ctx.params.data_productCategory =  "Sipariş Bulunmadı"
				ctx.params.data_logs = "Sipariş Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Sipariş Bulunamadı' + '\u001b[0m');

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

		},
		async delete(ctx) {
         
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/orders.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Sipariş Silme"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Sipariş Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "orders_delete_successful",
                    description: "Sipariş Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "Sipariş Silme"
				ctx.params.tablo = "orders.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Sipariş Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Sipariş  Bulunamadı' + '\u001b[0m');
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
